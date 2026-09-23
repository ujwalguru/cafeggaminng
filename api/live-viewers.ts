type RequestLike = {
  method?: string;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ResponseLike = {
  status: (code: number) => ResponseLike;
  setHeader: (name: string, value: string) => void;
  json: (body: unknown) => void;
};

type Viewer = { lastSeen: number };

// Presence is intentionally short-lived: a disconnected browser disappears
// automatically even when pagehide is not delivered.
const viewersByCafe = new Map<string, Map<string, Viewer>>();
const PRESENCE_TTL_MS = 45_000;
const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/;

function value(input: unknown): string {
  return Array.isArray(input) ? String(input[0] ?? '') : String(input ?? '');
}

function clean(slug: unknown): string {
  return value(slug).trim().toLowerCase();
}

function prune(slug: string, now: number): Map<string, Viewer> {
  const viewers = viewersByCafe.get(slug) ?? new Map<string, Viewer>();
  for (const [viewerId, viewer] of viewers) {
    if (now - viewer.lastSeen > PRESENCE_TTL_MS) viewers.delete(viewerId);
  }
  if (viewers.size === 0) viewersByCafe.delete(slug);
  else viewersByCafe.set(slug, viewers);
  return viewers;
}

export default function handler(req: RequestLike, res: ResponseLike) {
  const body = req.body && typeof req.body === 'object' ? req.body as Record<string, unknown> : {};
  const slug = clean(req.query?.slug ?? body.slug);
  if (!SLUG_PATTERN.test(slug)) return res.status(400).json({ success: false, message: 'A valid café slug is required.' });

  const now = Date.now();
  const viewers = prune(slug, now);
  const viewerId = value(body.viewerId).trim().slice(0, 120);

  if (req.method === 'POST') {
    if (!viewerId) return res.status(400).json({ success: false, message: 'A viewer id is required.' });
    viewers.set(viewerId, { lastSeen: now });
    viewersByCafe.set(slug, viewers);
  } else if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  return res.status(200).json({
    success: true,
    slug,
    viewers: prune(slug, now).size,
    updatedAt: new Date(now).toISOString(),
  });
}
