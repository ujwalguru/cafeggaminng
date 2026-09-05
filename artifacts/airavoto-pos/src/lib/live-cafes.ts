import type {
  Cafe,
  CafeHappyHour,
  CafeHappyHourPricing,
  GameCategory,
} from "@/lib/cafes";

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
  status: "online" | "offline" | "suspended";
  is_stale: boolean;
  last_updated: number;
  last_heartbeat?: string;
  devices: LiveDeviceAvailability[];
  configurations?: {
    devices?: Array<Record<string, unknown>>;
    pricing?: Array<Record<string, unknown>>;
    happyHours?: Array<Record<string, unknown>>;
    happy_hours?: Array<Record<string, unknown>>;
    happyHoursPricing?: Array<Record<string, unknown>>;
    happy_hours_pricing?: Array<Record<string, unknown>>;
    foodItems?: Array<Record<string, unknown> | string>;
    food_items?: Array<Record<string, unknown> | string>;
  };
}

function normalizeType(value: unknown): string {
  return String(value || "PC")
    .trim()
    .toUpperCase();
}

function normalizeCategory(value: unknown): GameCategory | null {
  const category = String(value || "")
    .trim()
    .toUpperCase();
  if (
    category.includes("PS5") ||
    category.includes("CONSOLE") ||
    category.includes("PLAYSTATION")
  )
    return "Console";
  if (category.includes("PC") || category.includes("COMPUTER")) return "PC";
  if (category.includes("VR")) return "VR";
  if (category.includes("MOBILE") || category.includes("PHONE"))
    return "Mobile";
  return null;
}

function inferDeviceType(device: any): string {
  const descriptor = [
    device?.type,
    device?.category,
    device?.name,
    device?.platform,
  ]
    .filter(Boolean)
    .join(" ")
    .toUpperCase();
  if (descriptor.includes("PS5") || descriptor.includes("PLAYSTATION"))
    return "PS5";
  if (descriptor.includes("PC") || descriptor.includes("COMPUTER")) return "PC";
  return normalizeType(device?.type ?? device?.category ?? device?.name);
}

function displayStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object") {
        const record = item as Record<string, unknown>;
        return String(
          record.imageUrl ?? record.image_url ?? record.url ?? record.name ?? record.label ?? record.title ?? record.category ?? "",
        );
      }
      return String(item ?? "");
    })
    .map((item) => item.trim())
    .filter(Boolean);
}

const OPENING_HOURS_DAY_ORDER = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function formatOpeningClock(value: unknown): string {
  const raw = String(value ?? "").trim();
  const match = raw.match(/^(\d{1,2})(?::(\d{2}))?$/);
  if (!match) return raw;
  const hour = Number(match[1]);
  const minute = match[2] ?? "00";
  if (hour > 23) return raw;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${suffix}`;
}

function parseVersionedOpeningHours(
  value: unknown,
): { day: string; time: string }[] {
  let payload: unknown = value;
  if (typeof payload === "string") {
    const raw = payload.trim();
    const marker = raw.indexOf("{");
    if (!raw.startsWith("AIRAVOTO_OPENING_HOURS_V1:") || marker < 0) return [];
    try {
      payload = JSON.parse(raw.slice(marker));
    } catch {
      return [];
    }
  }

  if (
    !payload ||
    typeof payload !== "object" ||
    !Array.isArray((payload as any).groups)
  )
    return [];
  const groups = (payload as any).groups as Array<Record<string, unknown>>;
  const rows: { day: string; time: string }[] = [];
  for (const day of OPENING_HOURS_DAY_ORDER) {
    const group = groups.find(
      (candidate) =>
        Array.isArray(candidate.days) &&
        candidate.days.some(
          (item) => String(item).toLowerCase() === day.toLowerCase(),
        ),
    );
    if (!group) continue;
    const mode = String(group.mode ?? "")
      .trim()
      .toLowerCase();
    if (mode === "closed") {
      rows.push({ day, time: "Closed" });
      continue;
    }
    const open = formatOpeningClock(group.openTime ?? group.open_time);
    const close = formatOpeningClock(group.closeTime ?? group.close_time);
    const time = open && close ? `${open} – ${close}` : open || close;
    if (time) rows.push({ day, time });
  }
  return rows;
}

function normalizeGameTags(
  value: unknown,
): { name: string; platform: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item: any) => {
      if (typeof item === "string")
        return { name: item.trim(), platform: "Game" };
      const name = String(
        item?.name ?? item?.title ?? item?.gameName ?? "",
      ).trim();
      const rawPlatform = String(
        item?.platform ?? item?.category ?? item?.deviceType ?? "Game",
      ).trim();
      const upper = rawPlatform.toUpperCase();
      const platform =
        upper.includes("PS5") ||
        upper.includes("PLAYSTATION") ||
        upper.includes("CONSOLE")
          ? "PS5"
          : upper.includes("PC") || upper.includes("COMPUTER")
            ? "PC"
            : upper.includes("VR")
              ? "VR"
              : rawPlatform || "Game";
      return { name, platform };
    })
    .filter((item) => item.name);
}

function normalizeHours(value: unknown): { day: string; time: string }[] {
  const structuredRows = parseVersionedOpeningHours(value);
  if (structuredRows.length > 0) return structuredRows;

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string")
          return { day: "Every day", time: item.trim() };
        if (!item || typeof item !== "object") return null;
        const record = item as Record<string, unknown>;
        const day = String(
          record.day ?? record.days ?? record.label ?? "Every day",
        ).trim();
        const time = String(
          record.time ?? record.hours ?? record.value ?? "",
        ).trim();
        return time ? { day, time } : null;
      })
      .filter((item): item is { day: string; time: string } => Boolean(item));
  }

  if (typeof value === "string" && value.trim()) {
    return [{ day: "Every day", time: value.trim() }];
  }

  return [];
}

function normalizeEnabled(value: unknown): boolean {
  if (typeof value === "string")
    return !["false", "0", "off", "disabled", "no"].includes(
      value.trim().toLowerCase(),
    );
  return value !== false && value !== 0;
}

function normalizeHappyHours(value: unknown): CafeHappyHour[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const startTime = String(
        record.startTime ?? record.start_time ?? "",
      ).trim();
      const endTime = String(record.endTime ?? record.end_time ?? "").trim();
      if (!startTime || !endTime) return null;
      return {
        category:
          String(record.category ?? "All gaming").trim() || "All gaming",
        startTime,
        endTime,
        enabled: normalizeEnabled(record.enabled),
      };
    })
    .filter((item): item is CafeHappyHour => Boolean(item));
}

function normalizeHappyHourPricing(value: unknown): CafeHappyHourPricing[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const price = Number(record.price ?? 0);
      if (!Number.isFinite(price) || price <= 0) return null;
      return {
        category:
          String(record.category ?? "All gaming").trim() || "All gaming",
        duration: Number(record.duration ?? 0),
        price,
        personCount: Number(record.personCount ?? record.person_count ?? 1),
        priceVisible: record.websiteVisible !== false && record.website_visible !== false,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}

function normalizeSeat(seat: any, index: number): LiveSeat {
  const available =
    seat?.available === true ||
    String(seat?.status || "").toLowerCase() === "available";
  return {
    id: String(seat?.id ?? seat?.seatId ?? seat?.seat_name ?? index + 1),
    label: String(
      seat?.label ??
        seat?.seatName ??
        seat?.seat_name ??
        seat?.name ??
        `Seat ${index + 1}`,
    ),
    available,
    status: String(seat?.status ?? (available ? "available" : "in_use")),
    occupiedUntil:
      seat?.occupiedUntil ?? seat?.endTime ?? seat?.end_time ?? null,
  };
}

function normalizeDevice(device: any): LiveDeviceAvailability {
  const type = inferDeviceType(device);
  const rawSeats = device?.seats ?? device?.seatAvailability;
  const seats = Array.isArray(rawSeats) ? rawSeats.map(normalizeSeat) : [];
  const total = Number(device?.total ?? seats.length ?? 0);
  const available = Number(
    device?.available ??
      seats.filter((seat: LiveSeat) => seat.available).length ??
      0,
  );
  return {
    type,
    category: device?.category,
    total: Math.max(0, total),
    available: Math.max(0, Math.min(total, available)),
    inUse: Math.max(0, total - available),
    seats,
  };
}

export function getLiveDevice(
  snapshot: LiveCafeSnapshot | null,
  type: "PC" | "PS5",
) {
  if (!snapshot) return null;
  return (
    snapshot.devices.find((device) => normalizeType(device.type) === type) ??
    null
  );
}

const AIRAVOTO_API_URL = (import.meta.env.VITE_AIRAVOTO_API_URL || "").replace(
  /\/$/,
  "",
);
export const DEFAULT_CAFE_IMAGE =
  "https://res.cloudinary.com/iu8wwiuc/image/upload/f_auto,q_auto/WhatsApp_Image_2026-09-01_at_4.52.44_PM";

export async function fetchLiveCafes(): Promise<LiveCafeSnapshot[]> {
  const response = await fetch(`${AIRAVOTO_API_URL}/api/live-cafes`, {
    headers: { Accept: "application/json" },
    credentials: "same-origin",
  });
  if (!response.ok)
    throw new Error(`Live café service returned HTTP ${response.status}`);
  const payload = (await response.json()) as { data?: unknown };
  return Array.isArray(payload.data)
    ? payload.data
        .map((listing: any) => {
          const metadata = listing.cafe || listing.cafe_details || {};
          const devices = Array.isArray(listing.availability)
            ? listing.availability.map(normalizeDevice)
            : [];
          const categories = Array.from(
            new Set(
              (Array.isArray(metadata.categories) ? metadata.categories : [])
                .concat(
                  devices.map((device: LiveDeviceAvailability) => device.type),
                )
                .map(normalizeCategory)
                .filter(Boolean),
            ),
          ) as GameCategory[];
          const status: LiveCafeSnapshot["status"] =
            listing.status === "offline"
              ? "offline"
              : listing.status === "suspended"
                ? "suspended"
                : "online";
          return {
            slug: String(
              listing.slug ?? listing.cafe_slug ?? metadata.id ?? "",
            ),
            name: String(
              metadata.name ??
                listing.cafe_name ??
                listing.slug ??
                "Gaming café",
            ),
            city: String(metadata.city ?? metadata.location?.city ?? "Online"),
            area: String(
              metadata.area ?? metadata.location?.area ?? "Live listing",
            ),
            address: String(
              metadata.address ?? metadata.location?.address ?? "",
            ),
            categories,
            metadata,
            status,
            is_stale: Boolean(listing.is_stale),
            last_updated: Number(listing.last_updated || 0),
            last_heartbeat: listing.capturedAt || listing.last_heartbeat,
            devices,
            configurations: listing.configurations,
          };
        })
        .filter(
          (snapshot: LiveCafeSnapshot) =>
            snapshot.status !== "suspended",
        )
    : [];
}

export async function fetchLiveCafe(
  slug: string,
): Promise<LiveCafeSnapshot | null> {
  const snapshots = await fetchLiveCafes();
  return snapshots.find((snapshot) => snapshot.slug === slug) ?? null;
}

export function liveSnapshotToCafe(snapshot: LiveCafeSnapshot): Cafe {
  const totalSeats = snapshot.devices.reduce(
    (total, device) => total + device.total,
    0,
  );
  const availableSeats = snapshot.devices.reduce(
    (total, device) => total + device.available,
    0,
  );
  const pricing = Array.isArray(snapshot.configurations?.pricing)
    ? snapshot.configurations.pricing
    : [];
  // Render is the source of truth for live cafés. Do not add static/default plans;
  // discard placeholder rows (for example PS5 at ₹0) before rendering anything.
  const renderPricing = pricing
    .map((item) => ({
      ...item,
      category: String(item.category ?? "").trim(),
      price: Number(item.price ?? 0),
      websiteVisible: item.websiteVisible !== false && item.website_visible !== false,
    }))
    .filter(
      (item) => item.category && Number.isFinite(item.price) && item.price > 0,
    );
  const pricePerHour =
    renderPricing.length > 0
      ? Math.min(...renderPricing.map((item) => item.price))
      : 0;
  const priceVisible = renderPricing.every((item) => item.websiteVisible !== false);
  const plansByCategory = new Map<string, any>();
  for (const item of renderPricing) {
    // One public plan per Render category: prefer the lowest valid configured rate.
    const existing = plansByCategory.get(item.category);
    if (!existing || item.price < Number(existing.price))
      plansByCategory.set(item.category, item);
  }
  const metadata = snapshot.metadata || {};
  const normalizedHours = normalizeHours(
    metadata.hours ?? metadata.openingHours ?? metadata.opening_hours,
  );
  return {
    id: snapshot.slug,
    slug: snapshot.slug,
    name: snapshot.name,
    tagline: String(metadata.tagline ?? "Live availability from Airavoto"),
    city: snapshot.city,
    area: snapshot.area,
    address: snapshot.address,
    rating: Number(metadata.rating ?? 0),
    reviewCount: Number(metadata.reviewCount ?? metadata.review_count ?? 0),
    pricePerHour,
    priceVisible,
    isOpen: snapshot.status === "online" && !snapshot.is_stale,
    openUntil: String(metadata.openUntil ?? metadata.open_until ?? ""),
    hoursDisplay: String(
      metadata.hoursDisplay ??
        metadata.hours_display ??
        normalizedHours[0]?.time ??
        "Live status",
    ),
    image: String(metadata.image || DEFAULT_CAFE_IMAGE),
    gallery: displayStrings(metadata.gallery),
    categories: snapshot.categories,
    amenities: displayStrings(metadata.amenities) as Cafe["amenities"],
    totalSeats,
    availableSeats,
    about: String(
      metadata.about ?? "Check live PC and PS5 availability before you visit.",
    ),
    hours: normalizedHours,
    happyHours: normalizeHappyHours(
      snapshot.configurations?.happyHours ??
        snapshot.configurations?.happy_hours,
    ).filter((item) => item.enabled),
    happyHourPricing: normalizeHappyHourPricing(
      snapshot.configurations?.happyHoursPricing ??
        snapshot.configurations?.happy_hours_pricing,
    ),
    phone: String(
      metadata.phone ??
        metadata.whatsappNumber ??
        metadata.whatsapp_number ??
        "",
    ),
    maps: String(metadata.maps ?? "https://maps.google.com"),
    plans: Array.from(plansByCategory.values()).map((item: any) => ({
      name: String(item.category ?? "Gaming session"),
      duration:
        Number(item.duration) === 1
          ? "1 hr"
          : `${String(item.duration ?? "")} min`,
      price: Number(item.price),
      priceVisible: item.websiteVisible !== false,
    })),
    reviews: [],
    games: displayStrings(metadata.games),
    gameTags: normalizeGameTags(metadata.games),
    foodItems: (
      snapshot.configurations?.foodItems ??
      snapshot.configurations?.food_items ??
      metadata.foodItems ??
      metadata.food_items ??
      []
    )
      .filter(
        (item: unknown) =>
          typeof item === "string" || (item && typeof item === "object"),
      )
      .map((item: any) =>
        typeof item === "string"
          ? { name: item }
          : {
              name: item.name,
              title: item.title,
              itemName: item.itemName,
              price: item.price,
              category: item.category,
            },
      ),
  };
}
