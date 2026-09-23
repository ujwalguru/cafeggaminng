import { Eye } from 'lucide-react';
import { useLiveViewerCount } from '@/hooks/use-live-viewers';

export function LiveViewerBadge({ slug, join = false, compact = false }: { slug: string; join?: boolean; compact?: boolean }) {
  const viewers = useLiveViewerCount(slug, join);
  // Keep the visual badge present while the first heartbeat is loading. A zero
  // count is a real result when nobody else is on this café page.
  const displayCount = viewers ?? 0;

  return (
    <span className={`inline-flex items-center gap-1.5 ${compact ? 'scale-[0.86] origin-right' : ''}`} aria-label={`${displayCount} live viewers`}>
      <span className="inline-flex items-center gap-1 rounded-[9px] bg-[linear-gradient(135deg,#ff4f79,#ef174b)] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-[0_4px_14px_rgba(239,23,75,0.32)]">
        <span className="size-1.5 animate-pulse rounded-full bg-white" />
        Live
      </span>
      <span className="inline-flex items-center gap-1 rounded-[9px] bg-[#18181b]/95 px-2.5 py-1 text-[11px] font-bold tabular-nums text-white shadow-md">
        <Eye className="size-3.5" strokeWidth={2.5} />
        {displayCount}
      </span>
    </span>
  );
}
