import { Link } from 'wouter';
import { MapPin, Star, Monitor, Gamepad2, Headphones, Smartphone } from 'lucide-react';
import type { Cafe, GameCategory } from '@/lib/cafes';
import { getLiveDevice, type LiveCafeSnapshot } from '@/lib/live-cafes';

const CATEGORY_ICON: Record<GameCategory, React.ElementType> = {
  PC: Monitor,
  Console: Gamepad2,
  VR: Headphones,
  Mobile: Smartphone,
};

const TOP_AMENITIES = ['AC', 'High-Speed WiFi', 'Full Food Menu', 'Food Menu', 'Snack Bar', 'Tournaments', 'Live Streaming Setup', 'Private Rooms'];

export function CafeCard({ cafe, live }: { cafe: Cafe; live?: LiveCafeSnapshot }) {
  const livePc = getLiveDevice(live ?? null, 'PC');
  const livePs5 = getLiveDevice(live ?? null, 'PS5');
  const hasLiveData = live?.status === 'online' && !live.is_stale && Boolean(livePc || livePs5);
  // Take up to 3 amenities to show as chips; count overflow
  const chips = cafe.amenities.filter((a) => TOP_AMENITIES.includes(a)).slice(0, 3);
  const overflow = cafe.amenities.length - chips.length;

  return (
    <Link href={`/cafes/${cafe.slug}`} className="group block focus:outline-none">
      <article className="flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-[0_8px_32px_oklch(0_0_0/0.4)]">

        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={cafe.image}
            alt={cafe.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.12_0_0/0.7)] via-transparent to-transparent" />

          {/* Featured badge */}
          {cafe.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-black shadow-sm">
              Featured
            </span>
          )}

          {/* Category device icons */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {cafe.categories.slice(0, 4).map((cat) => {
              const Icon = CATEGORY_ICON[cat];
              return (
                <span
                  key={cat}
                  className="flex size-7 items-center justify-center rounded-full bg-[oklch(0.14_0_0/0.75)] backdrop-blur-sm"
                  title={cat}
                >
                  <Icon className="size-3.5 text-white/80" />
                </span>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-2.5 p-4">
          {/* Name + rating */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-bold leading-snug text-foreground group-hover:text-foreground/90">
              {cafe.name}
            </h3>
            <span className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-[oklch(0.80_0.14_60)]">
              <Star className="size-3.5 fill-[oklch(0.80_0.14_60)]" />
              {cafe.rating}
            </span>
          </div>

          {/* Location */}
          <p className="flex items-center gap-1 text-[12px] text-muted-foreground">
            <MapPin className="size-3 shrink-0" />
            {cafe.area}, {cafe.city}
          </p>

          {/* Amenity chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {chips.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border/50 bg-surface px-2.5 py-0.5 text-[11px] text-muted-foreground"
              >
                {a}
              </span>
            ))}
            {overflow > 0 && (
              <span className="rounded-full border border-border/50 bg-surface px-2.5 py-0.5 text-[11px] text-muted-foreground">
                +{overflow}
              </span>
            )}
          </div>

          {/* Price + seats/hours */}
          <div className="flex items-center justify-between border-t border-border/40 pt-2.5 text-[12px]">
            <span className="font-semibold text-foreground">
              From <span className="text-[14px]">₹{cafe.pricePerHour}</span>/hr
            </span>
            <span className="text-right text-muted-foreground">
              {hasLiveData ? (
                <>
                  <span className="block font-medium text-[oklch(0.72_0.18_150)]">{(livePc?.available ?? 0) + (livePs5?.available ?? 0)} available</span>
                  <span className="block text-[10px]">{livePc ? `PC ${livePc.available}/${livePc.total}` : ''}{livePc && livePs5 ? ' · ' : ''}{livePs5 ? `PS5 ${livePs5.available}/${livePs5.total}` : ''}</span>
                </>
              ) : (
                <>{cafe.totalSeats} seats · {cafe.hoursDisplay}</>
              )}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
