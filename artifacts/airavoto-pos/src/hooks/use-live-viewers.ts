import { useEffect, useState } from 'react';

const VIEWER_ID_KEY = 'airavoto-live-viewer-id';
const HEARTBEAT_MS = 15_000;

type ViewerResponse = { viewers?: number };

function getViewerId() {
  const existing = window.localStorage.getItem(VIEWER_ID_KEY);
  if (existing) return existing;
  const next = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  window.localStorage.setItem(VIEWER_ID_KEY, next);
  return next;
}

async function sendPresence(slug: string, viewerId: string): Promise<number | null> {
  try {
    const response = await fetch('/api/live-viewers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, viewerId }),
      keepalive: true,
    });
    if (!response.ok) return null;
    const payload = await response.json() as ViewerResponse;
    return Number.isFinite(payload.viewers) ? Number(payload.viewers) : null;
  } catch {
    return null;
  }
}

async function readPresence(slug: string): Promise<number | null> {
  try {
    const response = await fetch(`/api/live-viewers?slug=${encodeURIComponent(slug)}`);
    if (!response.ok) return null;
    const payload = await response.json() as ViewerResponse;
    return Number.isFinite(payload.viewers) ? Number(payload.viewers) : null;
  } catch {
    return null;
  }
}

export function useLiveViewerCount(slug: string | undefined, join = false) {
  const [viewerCount, setViewerCount] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    const viewerId = getViewerId();

    const heartbeat = async () => {
      const count = join ? await sendPresence(slug, viewerId) : await readPresence(slug);
      if (!cancelled && count !== null) setViewerCount(count);
    };

    void heartbeat();
    const interval = window.setInterval(() => void heartbeat(), HEARTBEAT_MS);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, [slug, join]);

  return viewerCount;
}
