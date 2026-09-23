import { useEffect, useMemo, useState } from 'react';

function formatDigits(value: number) {
  return Math.max(0, Math.floor(value)).toString().padStart(8, '0').slice(-8);
}

export function PageVisitDisplay() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/page-visits', { method: 'POST', headers: { Accept: 'application/json' } })
      .then((response) => response.ok ? response.json() : null)
      .then((payload: { visits?: number } | null) => {
        if (!cancelled && payload && Number.isFinite(payload.visits)) setVisits(Number(payload.visits));
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  const digits = useMemo(() => formatDigits(visits ?? 0).split(''), [visits]);

  return (
    <div className="relative flex flex-col items-center gap-2 overflow-hidden rounded-2xl border border-cyan-300/25 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.16),transparent_58%),linear-gradient(145deg,rgba(11,18,32,0.98),rgba(18,8,32,0.98))] px-5 py-4 shadow-[0_0_18px_rgba(34,211,238,0.16),0_0_42px_rgba(217,70,239,0.12),0_16px_38px_rgba(0,0,0,0.45)] backdrop-blur-sm" aria-label={`${visits ?? 0} unique visitors`}>
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:repeating-linear-gradient(0deg,transparent_0px,transparent_3px,rgba(125,211,252,0.12)_4px)]" />
      <div className="relative flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-200 [text-shadow:0_0_8px_rgba(34,211,238,0.8)]">
        <span className="size-1.5 animate-pulse rounded-full bg-pink-400 shadow-[0_0_6px_rgba(244,114,182,1),0_0_14px_rgba(244,114,182,0.8)]" />
        Unique visitors
      </div>
      <div className="relative flex gap-1" aria-hidden="true">
        {digits.map((digit, index) => (
          <span key={`${index}-${digit}`} className="relative flex h-10 w-6 items-center justify-center overflow-hidden rounded-[4px] border border-cyan-200/30 bg-[#090c16] font-mono text-xl font-black tabular-nums text-cyan-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-7px_12px_rgba(0,0,0,0.65),0_0_7px_rgba(34,211,238,0.28),2px_3px_0_rgba(0,0,0,0.45)] [perspective:500px] sm:h-11 sm:w-7 sm:text-2xl">
            <span className="absolute inset-x-0 top-1/2 z-10 border-t border-pink-300/35 shadow-[0_0_5px_rgba(244,114,182,0.7)]" />
            <span className="relative z-0 [text-shadow:0_0_6px_rgba(165,243,252,0.95),0_0_16px_rgba(34,211,238,0.6)] [transform:rotateX(0.01deg)]">{digit}</span>
            <span className="absolute inset-0 bg-gradient-to-b from-cyan-100/[0.12] via-transparent to-fuchsia-500/[0.12]" />
          </span>
        ))}
      </div>
    </div>
  );
}
