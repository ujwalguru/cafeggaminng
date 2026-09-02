type RequestLike = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
};

type RateBucket = { count: number; resetAt: number };

const buckets = new Map<string, RateBucket>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;
const UPSTREAM = (
  process.env.AIRAVOTO_API_URL || "https://airavotoheadcli.onrender.com"
).replace(/\/$/, "");

function header(req: RequestLike, name: string): string {
  const value = req.headers[name.toLowerCase()] ?? req.headers[name];
  return Array.isArray(value) ? value[0] || "" : value || "";
}

function clientKey(req: RequestLike): string {
  return (
    header(req, "x-forwarded-for").split(",")[0].trim() ||
    header(req, "x-real-ip") ||
    "unknown"
  );
}

function allowedOrigin(origin: string): boolean {
  if (!origin) return true;
  const configured = (
    process.env.ALLOWED_ORIGINS ||
    "https://airavotogaming.com,https://www.airavotogaming.com"
  )
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return configured.includes(origin);
}

function safeString(value: unknown, max = 500): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

function safeNumber(value: unknown): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function minimizeListing(listing: any) {
  const cafe = listing?.cafe || listing?.cafe_details || {};
  const availability = Array.isArray(listing?.availability)
    ? listing.availability
    : [];
  return {
    slug: safeString(listing?.slug ?? listing?.cafe_slug ?? cafe.id, 120),
    status: ["offline", "suspended"].includes(listing?.status)
      ? listing.status
      : "online",
    is_stale: Boolean(listing?.is_stale),
    last_updated: safeNumber(listing?.last_updated),
    capturedAt: safeString(listing?.capturedAt ?? listing?.last_heartbeat, 80),
    cafe: {
      id: safeString(cafe.id, 120),
      name: safeString(cafe.name || listing?.cafe_name || listing?.slug, 160),
      city: safeString(cafe.city ?? cafe.location?.city, 120),
      area: safeString(cafe.area ?? cafe.location?.area, 160),
      address: safeString(cafe.address ?? cafe.location?.address, 300),
      tagline: safeString(cafe.tagline, 240),
      rating: safeNumber(cafe.rating),
      reviewCount: safeNumber(cafe.reviewCount ?? cafe.review_count),
      openUntil: safeString(cafe.openUntil ?? cafe.open_until, 40),
      hoursDisplay: safeString(cafe.hoursDisplay ?? cafe.hours_display, 120),
      image: safeString(cafe.image, 500),
      gallery: Array.isArray(cafe.gallery)
        ? cafe.gallery
            .slice(0, 12)
            .map((item: unknown) => safeString(item, 500))
            .filter(Boolean)
        : [],
      categories: Array.isArray(cafe.categories)
        ? cafe.categories
            .slice(0, 20)
            .map((item: unknown) => safeString(item, 80))
            .filter(Boolean)
        : [],
      amenities: Array.isArray(cafe.amenities)
        ? cafe.amenities
            .slice(0, 30)
            .map((item: unknown) => safeString(item, 100))
            .filter(Boolean)
        : [],
      about: safeString(cafe.about, 1000),
      hours: Array.isArray(cafe.hours) ? cafe.hours.slice(0, 14) : [],
      phone: safeString(
        cafe.phone ?? cafe.whatsappNumber ?? cafe.whatsapp_number,
        40,
      ),
      maps: safeString(cafe.maps, 500),
      games: Array.isArray(cafe.games)
        ? cafe.games
            .slice(0, 50)
            .map((item: unknown) => safeString(item, 120))
            .filter(Boolean)
        : [],
      foodItems: Array.isArray(cafe.foodItems ?? cafe.food_items)
        ? (cafe.foodItems ?? cafe.food_items).slice(0, 100)
        : [],
    },
    availability: availability.slice(0, 30).map((device: any) => ({
      type: safeString(device?.type ?? device?.category ?? device?.name, 80),
      category: safeString(device?.category, 80),
      total: Math.max(0, safeNumber(device?.total)),
      available: Math.max(0, safeNumber(device?.available)),
      seats: Array.isArray(device?.seats)
        ? device.seats.slice(0, 200).map((seat: any, index: number) => ({
            id: safeString(seat?.id ?? seat?.seatId ?? index + 1, 80),
            label: safeString(
              seat?.label ??
                seat?.seatName ??
                seat?.seat_name ??
                seat?.name ??
                `Seat ${index + 1}`,
              100,
            ),
            available:
              seat?.available === true ||
              String(seat?.status || "").toLowerCase() === "available",
            status: safeString(seat?.status, 40),
            occupiedUntil:
              safeString(
                seat?.occupiedUntil ?? seat?.endTime ?? seat?.end_time,
                80,
              ) || null,
          }))
        : [],
    })),
    configurations: {
      pricing: Array.isArray(listing?.configurations?.pricing)
        ? listing.configurations.pricing.slice(0, 100)
        : [],
      happyHours: Array.isArray(
        listing?.configurations?.happyHours ??
          listing?.configurations?.happy_hours,
      )
        ? (
            listing.configurations.happyHours ??
            listing.configurations.happy_hours
          ).slice(0, 30)
        : [],
      happyHoursPricing: Array.isArray(
        listing?.configurations?.happyHoursPricing ??
          listing?.configurations?.happy_hours_pricing,
      )
        ? (
            listing.configurations.happyHoursPricing ??
            listing.configurations.happy_hours_pricing
          ).slice(0, 100)
        : [],
    },
  };
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method && req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ success: false, data: [] });
  }

  const origin = header(req, "origin");
  if (!allowedOrigin(origin))
    return res.status(403).json({ success: false, data: [] });

  const now = Date.now();
  const key = clientKey(req);
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
  } else if (current.count >= MAX_REQUESTS) {
    res.setHeader(
      "Retry-After",
      String(Math.ceil((current.resetAt - now) / 1000)),
    );
    return res.status(429).json({ success: false, data: [] });
  } else {
    current.count += 1;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);
  try {
    const upstream = await fetch(`${UPSTREAM}/api/directory`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!upstream.ok) return res.status(502).json({ success: false, data: [] });
    const payload = (await upstream.json()) as { data?: unknown };
    const data = Array.isArray(payload.data)
      ? payload.data
          .map(minimizeListing)
          .filter(
            (listing) =>
              listing.slug && !listing.is_stale && listing.status === "online",
          )
      : [];
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res
      .status(200)
      .json({ success: true, data, fetchedAt: new Date().toISOString() });
  } catch {
    return res.status(502).json({ success: false, data: [] });
  } finally {
    clearTimeout(timeout);
  }
}
