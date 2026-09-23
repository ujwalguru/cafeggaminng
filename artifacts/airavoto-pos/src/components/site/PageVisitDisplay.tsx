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
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/35 px-4 py-4 shadow-[0_12px_34px_rgba(0,0,0,0.25)] backdrop-blur-sm" aria-label={`${visits ?? 0} total page visits`}>
      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white/55">
        <span className="size-1.5 rounded-full bg-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.9)]" />
        Total page visits
      </div>
      <div className="flex gap-1" aria-hidden="true">
        {digits.map((digit, index) => (
          <span key={`${index}-${digit}`} className="relative flex h-10 w-6 items-center justify-center overflow-hidden rounded-[4px] border border-white/15 bg-[#16161a] font-mono text-xl font-black tabular-nums text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12),2px_3px_0_rgba(0,0,0,0.35)] [perspective:500px] sm:h-11 sm:w-7 sm:text-2xl">
            <span className="absolute inset-x-0 top-1/2 z-10 border-t border-black/70" />
            <span className="relative z-0 [transform:rotateX(0.01deg)]">{digit}</span>
            <span className="absolute inset-0 bg-gradient-to-b from-white/[0.08] via-transparent to-black/30" />
          </span>
        ))}
      </div>
    </div>
  );
}
