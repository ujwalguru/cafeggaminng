const MEMORY_KEY = '__airavotoPageVisits';
const VISIT_KEY = 'airavoto:total-page-visits';

function memoryStore() {
  const root = globalThis;
  if (!root[MEMORY_KEY]) root[MEMORY_KEY] = 0;
  return root;
}

function kvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvCommand(command) {
  const base = process.env.KV_REST_API_URL.replace(/\/$/, '');
  const response = await fetch(`${base}/${command}/${encodeURIComponent(VISIT_KEY)}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });
  if (!response.ok) throw new Error(`KV returned ${response.status}`);
  const payload = await response.json();
  return Number(payload.result ?? 0);
}

async function readCount() {
  if (kvConfigured()) return kvCommand('get');
  return Number(memoryStore()[MEMORY_KEY] || 0);
}

async function incrementCount() {
  if (kvConfigured()) return kvCommand('incr');
  const store = memoryStore();
  store[MEMORY_KEY] = Number(store[MEMORY_KEY] || 0) + 1;
  return store[MEMORY_KEY];
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    const visits = req.method === 'POST' ? await incrementCount() : await readCount();
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json({ success: true, visits, persistent: kvConfigured() });
  } catch {
    return res.status(503).json({ success: false, message: 'Visit counter is temporarily unavailable.' });
  }
}
