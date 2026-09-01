import type { Cafe, GameCategory } from '@/lib/cafes';

export interface LiveSeat {
  id: string;
  label: string;
  available: boolean;
  status: string;
  occupiedUntil?: string | null;
}

export interface LiveDeviceAvailability {
  type: string;
  category?: string;
  total: number;
  available: number;
  inUse: number;
  seats: LiveSeat[];
}

export interface LiveCafeSnapshot {
  slug: string;
  name: string;
  city: string;
  area: string;
  address: string;
  categories: GameCategory[];
  metadata: Record<string, any>;
  status: 'online' | 'offline' | 'suspended';
  is_stale: boolean;
  last_updated: number;
  last_heartbeat?: string;
  devices: LiveDeviceAvailability[];
  configurations?: {
    devices?: Array<Record<string, unknown>>;
    pricing?: Array<Record<string, unknown>>;
    happyHours?: Array<Record<string, unknown>>;
    happyHoursPricing?: Array<Record<string, unknown>>;
  };
}

function normalizeType(value: unknown): string {
  return String(value || 'PC').trim().toUpperCase();
}

function normalizeCategory(value: unknown): GameCategory | null {
  const category = String(value || '').trim().toUpperCase();
  if (category.includes('PS5') || category.includes('CONSOLE') || category.includes('PLAYSTATION')) return 'Console';
  if (category.includes('PC') || category.includes('COMPUTER')) return 'PC';
  if (category.includes('VR')) return 'VR';
  if (category.includes('MOBILE') || category.includes('PHONE')) return 'Mobile';
  return null;
}

function inferDeviceType(device: any): string {
  const descriptor = [device?.type, device?.category, device?.name, device?.platform]
    .filter(Boolean)
    .join(' ')
    .toUpperCase();
  if (descriptor.includes('PS5') || descriptor.includes('PLAYSTATION')) return 'PS5';
  if (descriptor.includes('PC') || descriptor.includes('COMPUTER')) return 'PC';
  return normalizeType(device?.type ?? device?.category ?? device?.name);
}

function displayStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object') {
        const record = item as Record<string, unknown>;
        return String(record.name ?? record.label ?? record.title ?? record.category ?? '');
      }
      return String(item ?? '');
    })
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeSeat(seat: any, index: number): LiveSeat {
  const available = seat?.available === true || String(seat?.status || '').toLowerCase() === 'available';
  return {
    id: String(seat?.id ?? seat?.seatId ?? seat?.seat_name ?? index + 1),
    label: String(seat?.label ?? seat?.seatName ?? seat?.seat_name ?? seat?.name ?? `Seat ${index + 1}`),
    available,
    status: String(seat?.status ?? (available ? 'available' : 'in_use')),
    occupiedUntil: seat?.occupiedUntil ?? seat?.endTime ?? seat?.end_time ?? null,
  };
}

function normalizeDevice(device: any): LiveDeviceAvailability {
  const type = inferDeviceType(device);
  const rawSeats = device?.seats ?? device?.seatAvailability;
  const seats = Array.isArray(rawSeats) ? rawSeats.map(normalizeSeat) : [];
  const total = Number(device?.total ?? seats.length ?? 0);
  const available = Number(device?.available ?? seats.filter((seat: LiveSeat) => seat.available).length ?? 0);
  return {
    type,
    category: device?.category,
    total: Math.max(0, total),
    available: Math.max(0, Math.min(total, available)),
    inUse: Math.max(0, total - available),
    seats,
  };
}

export function getLiveDevice(snapshot: LiveCafeSnapshot | null, type: 'PC' | 'PS5') {
  if (!snapshot) return null;
  return snapshot.devices.find((device) => normalizeType(device.type) === type) ?? null;
}

const AIRAVOTO_API_URL = (import.meta.env.VITE_AIRAVOTO_API_URL || 'https://airavotoheadcli.onrender.com').replace(/\/$/, '');

export async function fetchLiveCafes(): Promise<LiveCafeSnapshot[]> {
  const response = await fetch(`${AIRAVOTO_API_URL}/api/directory`, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Live café service returned HTTP ${response.status}`);
  const payload = (await response.json()) as { data?: unknown };
  return Array.isArray(payload.data)
    ? payload.data.map((listing: any) => {
        const metadata = listing.cafe || listing.cafe_details || {};
        const devices = Array.isArray(listing.availability) ? listing.availability.map(normalizeDevice) : [];
        const categories = Array.from(new Set(
          (Array.isArray(metadata.categories) ? metadata.categories : [])
            .concat(devices.map((device: LiveDeviceAvailability) => device.type))
            .map(normalizeCategory)
            .filter(Boolean),
        )) as GameCategory[];
        return {
          slug: String(listing.slug ?? listing.cafe_slug ?? metadata.id ?? ''),
          name: String(metadata.name ?? listing.cafe_name ?? listing.slug ?? 'Gaming café'),
          city: String(metadata.city ?? metadata.location?.city ?? 'Online'),
          area: String(metadata.area ?? metadata.location?.area ?? 'Live listing'),
          address: String(metadata.address ?? metadata.location?.address ?? ''),
          categories,
          metadata,
          status: listing.status === 'offline' ? 'offline' : listing.status === 'suspended' ? 'suspended' : 'online',
          is_stale: Boolean(listing.is_stale),
          last_updated: Number(listing.last_updated || 0),
          last_heartbeat: listing.capturedAt || listing.last_heartbeat,
          devices,
          configurations: listing.configurations,
        };
      }).filter((snapshot: LiveCafeSnapshot) => snapshot.status === 'online' && !snapshot.is_stale)
    : [];
}

export async function fetchLiveCafe(slug: string): Promise<LiveCafeSnapshot | null> {
  const snapshots = await fetchLiveCafes();
  return snapshots.find((snapshot) => snapshot.slug === slug) ?? null;
}

export function liveSnapshotToCafe(snapshot: LiveCafeSnapshot): Cafe {
  const totalSeats = snapshot.devices.reduce((total, device) => total + device.total, 0);
  const availableSeats = snapshot.devices.reduce((total, device) => total + device.available, 0);
  const pricing = Array.isArray(snapshot.configurations?.pricing) ? snapshot.configurations.pricing : [];
  const pricePerHour = Number(pricing.find((item) => Number(item.duration) === 60 && Number(item.price) > 0)?.price ?? pricing.find((item) => Number(item.price) > 0)?.price ?? 0);
  const metadata = snapshot.metadata || {};
  return {
    id: snapshot.slug,
    slug: snapshot.slug,
    name: snapshot.name,
    tagline: String(metadata.tagline ?? 'Live availability from Airavoto'),
    city: snapshot.city,
    area: snapshot.area,
    address: snapshot.address,
    rating: Number(metadata.rating ?? 0),
    reviewCount: Number(metadata.reviewCount ?? metadata.review_count ?? 0),
    pricePerHour,
    isOpen: snapshot.status === 'online' && !snapshot.is_stale,
    openUntil: String(metadata.openUntil ?? metadata.open_until ?? ''),
    hoursDisplay: String(metadata.hoursDisplay ?? metadata.hours_display ?? 'Live status'),
    image: String(metadata.image ?? 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=900&q=80&auto=format&fit=crop'),
    gallery: displayStrings(metadata.gallery),
    categories: snapshot.categories,
    amenities: displayStrings(metadata.amenities),
    totalSeats,
    availableSeats,
    about: String(metadata.about ?? 'Check live PC and PS5 availability before you visit.'),
    hours: Array.isArray(metadata.hours) ? metadata.hours : [],
    phone: String(metadata.phone ?? ''),
    maps: String(metadata.maps ?? 'https://maps.google.com'),
    plans: pricing.map((item: any) => ({ name: String(item.category ?? 'Gaming session'), duration: String(item.duration ?? ''), price: Number(item.price ?? 0) })),
    reviews: [],
    games: displayStrings(metadata.games),
  };
}
