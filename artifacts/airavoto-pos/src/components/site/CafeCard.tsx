import { Link } from 'wouter';
import { MapPin, Star, Users, Wifi, Zap, Wind, UtensilsCrossed, Clock } from 'lucide-react';
import type { Cafe } from '@/lib/cafes';

const amenityIcons: Record<string, { icon: React.ElementType; label: string }> = {
  'High-Speed WiFi': { icon: Wifi, label: 'WiFi' },
  'AC': { icon: Wind, label: 'AC' },
  'Food Menu': { icon: UtensilsCrossed, label: 'Food' },
  'Snack Bar': { icon: UtensilsCrossed, label: 'Snacks' },
  'Tournaments': { icon: Zap, label: 'Tournaments' },
};

const categoryColors: Record<string, string> = {
  PC: 'bg-[oklch(0.28_0.06_265)] text-[oklch(0.82_0.14_265)]',
  Console: 'bg-[oklch(0.26_0.06_310)] text-[oklch(0.82_0.14_310)]',
  VR: 'bg-[oklch(0.26_0.06_150)] text-[oklch(0.78_0.16_150)]',
  Mobile: 'bg-[oklch(0.26_0.06_35)] text-[oklch(0.82_0.14_35)]',
};

interface CafeCardProps {
  cafe: Cafe;
  variant?: 'default' | 'featured';
}

export function CafeCard({ cafe, variant = 'default' }: CafeCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Link href={`/cafes/${cafe.slug}`} className="group block focus:outline-none">
      <article
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-[0_0_40px_oklch(0.50_0.08_265/0.15)] ${isFeatured ? 'md:flex-row' : ''}`}
      >
        {/* Image */}
        <div className={`relative shrink-0 overflow-hidden ${isFeatured ? 'h-56 md:h-auto md:w-80' : 'h-48'}`}>
          <img
            src={cafe.image}
            alt={cafe.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0_0/0.85)] via-[oklch(0.14_0_0/0.20)] to-transparent" />

          {/* Open/Closed badge */}
          <span
            className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm ${
              cafe.isOpen
                ? 'bg-[oklch(0.20_0.06_150/0.9)] text-[oklch(0.78_0.18_150)]'
                : 'bg-[oklch(0.20_0.06_25/0.9)] text-[oklch(0.72_0.18_25)]'
            }`}
          >
            <span className={`size-1.5 rounded-full ${cafe.isOpen ? 'bg-[oklch(0.72_0.18_150)]' : 'bg-[oklch(0.60_0.18_25)]'}`} />
            {cafe.isOpen ? `Open · ${cafe.openUntil}` : cafe.openUntil}
          </span>

          {/* Category chips on image bottom */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {cafe.categories.slice(0, 3).map((cat) => (
              <span key={cat} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${categoryColors[cat]}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          {/* Name + location */}
          <div>
            <h3 className="text-base font-bold leading-snug text-foreground group-hover:text-[oklch(0.85_0.06_265)] transition-colors">
              {cafe.name}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-[13px] text-muted-foreground">
              <MapPin className="size-3 shrink-0" />
              {cafe.area}, {cafe.city}
            </p>
          </div>

          {/* Rating + reviews + seats */}
          <div className="flex items-center gap-3 text-[13px]">
            <span className="flex items-center gap-1 font-medium text-[oklch(0.80_0.14_60)]">
              <Star className="size-3.5 fill-[oklch(0.80_0.14_60)]" />
              {cafe.rating}
              <span className="font-normal text-muted-foreground">({cafe.reviewCount})</span>
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Users className="size-3.5" />
              {cafe.availableSeats > 0 ? (
                <span className="text-[oklch(0.72_0.14_150)]">{cafe.availableSeats} seats free</span>
              ) : (
                <span className="text-[oklch(0.60_0.14_25)]">Full</span>
              )}
            </span>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(amenityIcons)
              .filter(([key]) => cafe.amenities.includes(key as typeof cafe.amenities[number]))
              .slice(0, 4)
              .map(([key, { icon: Icon, label }]) => (
                <span key={key} className="flex items-center gap-1 rounded-lg border border-border/60 bg-surface px-2 py-1 text-[11px] text-muted-foreground">
                  <Icon className="size-3" />
                  {label}
                </span>
              ))}
          </div>

          {/* Price + CTA row */}
          <div className="mt-auto flex items-center justify-between pt-1">
            <div>
              <span className="text-lg font-bold text-foreground">₹{cafe.pricePerHour}</span>
              <span className="ml-1 text-xs text-muted-foreground">/ hr</span>
            </div>
            <span className="flex items-center gap-1 rounded-xl bg-primary/10 px-4 py-2 text-xs font-semibold text-primary ring-1 ring-primary/20 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Clock className="size-3.5" />
              Book Now
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
