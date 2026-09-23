// Vercel serverless presence endpoint for live café viewers.
// Viewers expire automatically after 45 seconds if their heartbeat stops.
const viewersByCafe = new Map();
const PRESENCE_TTL_MS = 45_000;
const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/;

function value(input) {
  return Array.isArray(input) ? String(input[0] ?? '') : String(input ?? '');
}

function cleanSlug(input) {
  return value(input).trim().toLowerCase();
}

function prune(slug, now) {
  const viewers = viewersByCafe.get(slug) ?? new Map();
  for (const [viewerId, viewer] of viewers) {
    if (now - viewer.lastSeen > PRESENCE_TTL_MS) viewers.delete(viewerId);
  }
  if (viewers.size === 0) viewersByCafe.delete(slug);
  else viewersByCafe.set(slug, viewers);
  return viewers;
}

export default function handler(req, res) {
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  const slug = cleanSlug(req.query?.slug ?? body.slug);
  if (!SLUG_PATTERN.test(slug)) {
    return res.status(400).json({ success: false, message: 'A valid café slug is required.' });
  }

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const now = Date.now();
  const viewers = prune(slug, now);
  if (req.method === 'POST') {
    const viewerId = value(body.viewerId).trim().slice(0, 120);
    if (!viewerId) return res.status(400).json({ success: false, message: 'A viewer id is required.' });
    viewers.set(viewerId, { lastSeen: now });
    viewersByCafe.set(slug, viewers);
  }

  return res.status(200).json({
    success: true,
    slug,
    viewers: prune(slug, now).size,
    updatedAt: new Date(now).toISOString(),
  });
}
