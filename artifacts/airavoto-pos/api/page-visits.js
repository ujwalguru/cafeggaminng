import { randomUUID } from 'node:crypto';

const MEMORY_KEY = '__airavotoUniqueVisitors';
const VISITOR_SET_KEY = 'airavoto:unique-page-visitors';
const VISITOR_COOKIE = 'airavoto_visitor_id';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function memoryStore() {
  const root = globalThis;
  if (!root[MEMORY_KEY]) root[MEMORY_KEY] = new Set();
  return root[MEMORY_KEY];
}

function kvConfigured() {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function kvCommand(command, ...args) {
  const base = process.env.KV_REST_API_URL.replace(/\/$/, '');
  const encodedArgs = args.map((value) => encodeURIComponent(value)).join('/');
  const response = await fetch(`${base}/${command}/${encodeURIComponent(VISITOR_SET_KEY)}${encodedArgs ? `/${encodedArgs}` : ''}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });
  if (!response.ok) throw new Error(`KV returned ${response.status}`);
  const payload = await response.json();
  return payload.result;
}

function readCookie(req, name) {
  const cookies = String(req.headers?.cookie || '').split(';');
  const entry = cookies.find((item) => item.trim().startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.trim().slice(name.length + 1)) : '';
}

function setVisitorCookie(res, visitorId) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${VISITOR_COOKIE}=${encodeURIComponent(visitorId)}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secure}`);
}

async function registerUniqueVisitor(visitorId) {
  if (kvConfigured()) {
    await kvCommand('sadd', visitorId);
    return Number(await kvCommand('scard'));
  }
  const visitors = memoryStore();
  visitors.add(visitorId);
  return visitors.size;
}

async function readUniqueVisitorCount() {
  if (kvConfigured()) return Number(await kvCommand('scard'));
  return memoryStore().size;
}

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  try {
    let visitorId = readCookie(req, VISITOR_COOKIE);
    if (!/^[a-f0-9-]{20,100}$/i.test(visitorId)) {
      visitorId = randomUUID();
      setVisitorCookie(res, visitorId);
    }

    const visits = req.method === 'POST'
      ? await registerUniqueVisitor(visitorId)
      : await readUniqueVisitorCount();

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json({
      success: true,
      visits,
      unique: true,
      persistent: kvConfigured(),
    });
  } catch {
    return res.status(503).json({ success: false, message: 'Unique visitor counter is temporarily unavailable.' });
  }
}
