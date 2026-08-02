import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Link } from 'wouter';
import {
  MapPin, Star, Users, Clock, Phone, ArrowLeft, CheckCircle2, Wifi,
  Wind, UtensilsCrossed, Headphones, Zap, Trophy, Shield, Monitor,
  ChevronRight, ExternalLink, MessageCircle, Gamepad2, X
} from 'lucide-react';
import { getCafeBySlug } from '@/lib/cafes';
import { CafeCard } from '@/components/site/CafeCard';
import { cafes } from '@/lib/cafes';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { useDocumentMeta } from '@/hooks/use-document-meta';
import NotFound from '@/pages/not-found';

// ── Station helpers ──────────────────────────────────────────────────────────
type StationType = 'PC' | 'PS5';
interface Station { id: number; label: string; available: boolean; occupiedUntil: string | null }

function buildStations(type: StationType, total: number, avail: number, seed: number): Station[] {
  // deterministically mark which stations are free vs occupied
  const indices = Array.from({ length: total }, (_, i) => i);
  // shuffle using seed
  for (let i = indices.length - 1; i > 0; i--) {
    const j = (seed * (i + 7) * 31 + 17) % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const freeSet = new Set(indices.slice(0, avail));
  const times = ['12:30', '1:00', '1:30', '2:00', '2:30', '3:00', '4:00', '5:30', '6:00', '7:00'];
  return Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    label: `${type} ${i + 1}`,
    available: freeSet.has(i),
    occupiedUntil: freeSet.has(i) ? null : times[(seed + i * 3) % times.length] + ' PM',
  }));
}

const amenityIconMap: Record<string, React.ElementType> = {
  'High-Speed WiFi': Wifi,
  'AC': Wind,
  'Food Menu': UtensilsCrossed,
  'Snack Bar': UtensilsCrossed,
  'Cold Drinks': UtensilsCrossed,
  'Premium Headsets': Headphones,
  'Private Rooms': Shield,
  'Tournaments': Trophy,
  'Live Streaming Setup': Monitor,
  '24/7 Open': Clock,
  'Webcam': Monitor,
  'Parking': CheckCircle2,
};

function StarRow({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const s = size === 'lg' ? 'size-5' : 'size-3.5';
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${s} ${i <= Math.round(rating) ? 'fill-[oklch(0.80_0.14_60)] text-[oklch(0.80_0.14_60)]' : 'fill-muted text-muted'}`}
        />
      ))}
    </span>
  );
}

export default function CafeDetail() {
  const { slug } = useParams<{ slug: string }>();
  const cafe = getCafeBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const [stationModal, setStationModal] = useState<StationType | null>(null);

  // derive station counts from cafe data
  const hasConsole = cafe.categories.includes('Console');
  const pcTotal = hasConsole ? Math.round(cafe.totalSeats * 0.65) : cafe.totalSeats;
  const ps5Total = hasConsole ? cafe.totalSeats - pcTotal : 0;
  const pcAvail = hasConsole ? Math.round(cafe.availableSeats * 0.65) : cafe.availableSeats;
  const ps5Avail = hasConsole ? Math.max(0, cafe.availableSeats - pcAvail) : 0;
  const seed = parseInt(cafe.id, 10) || 1;
  const pcStations = buildStations('PC', pcTotal, pcAvail, seed);
  const ps5Stations = buildStations('PS5', ps5Total, ps5Avail, seed + 50);
  const modalStations = stationModal === 'PC' ? pcStations : ps5Stations;
  const modalAvail = stationModal === 'PC' ? pcAvail : ps5Avail;
  const modalTotal = stationModal === 'PC' ? pcTotal : ps5Total;

  useDocumentMeta({
    title: cafe ? `${cafe.name} — ${cafe.area}, ${cafe.city} | Airavoto Cafe` : 'Café Not Found',
    description: cafe?.tagline ?? '',
    image: cafe?.image,
  });

  if (!cafe) return <NotFound />;

  const related = cafes.filter((c) => c.id !== cafe.id && (c.city === cafe.city || c.categories.some((cat) => cafe.categories.includes(cat)))).slice(0, 4);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── Hero image banner ─────────────────────────────────────── */}
      <div className="relative h-72 w-full overflow-hidden sm:h-96">
        <img src={cafe.image} alt={cafe.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.14_0_0/0.3)] via-transparent to-[oklch(0.14_0_0/0.90)]" />
        {/* Back link */}
        <Link
          href="/cafes"
          className="absolute left-5 top-24 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <ArrowLeft className="size-4" /> All Cafes
        </Link>
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-24">
        {/* ── Info header ───────────────────────────────────────── */}
        <div className="relative z-10 -mt-16 mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="flex-1">
            {/* Categories */}
            <div className="mb-3 flex flex-wrap gap-2">
              {cafe.categories.map((cat) => (
                <span key={cat} className="rounded-full border border-border/60 bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
                  {cat} Gaming
                </span>
              ))}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{cafe.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{cafe.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-4" />
                {cafe.address}
              </span>
            </div>
          </div>

          {/* Rating + open pill */}
          <div className="flex flex-col items-end gap-3">
            <span
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${
                cafe.isOpen
                  ? 'bg-[oklch(0.20_0.06_150/0.8)] text-[oklch(0.78_0.18_150)]'
                  : 'bg-[oklch(0.20_0.06_25/0.8)] text-[oklch(0.72_0.18_25)]'
              }`}
            >
              <span className={`size-2 rounded-full ${cafe.isOpen ? 'bg-[oklch(0.72_0.18_150)]' : 'bg-[oklch(0.60_0.18_25)]'}`} />
              {cafe.isOpen ? `Open · Until ${cafe.openUntil}` : cafe.openUntil}
            </span>
            <div className="flex items-center gap-2">
              <StarRow rating={cafe.rating} size="lg" />
              <span className="text-xl font-bold">{cafe.rating}</span>
              <span className="text-sm text-muted-foreground">({cafe.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* ── Main layout: content + sidebar ────────────────────── */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left content */}
          <div className="min-w-0 flex-1 space-y-10">

            {/* About */}
            <section>
              <h2 className="mb-3 text-lg font-bold">About {cafe.name}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{cafe.about}</p>
            </section>

            {/* Games */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Games Available</h2>
              <div className="flex flex-wrap gap-2">
                {cafe.games.map((game) => (
                  <span
                    key={game}
                    className="flex items-center gap-1.5 rounded-full border border-[oklch(0.40_0.12_265/0.5)] bg-[oklch(0.22_0.06_265/0.35)] px-3.5 py-1.5 text-xs font-medium text-[oklch(0.85_0.10_265)]"
                  >
                    <Gamepad2 className="size-3 shrink-0 opacity-70" />
                    {game}
                  </span>
                ))}
              </div>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Amenities</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {cafe.amenities.map((amenity) => {
                  const Icon = amenityIconMap[amenity] ?? CheckCircle2;
                  return (
                    <div key={amenity} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3">
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[oklch(0.22_0.06_265/0.4)] text-[oklch(0.78_0.12_265)]">
                        <Icon className="size-4" />
                      </span>
                      <span className="text-xs font-medium text-foreground">{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Gallery */}
            {cafe.gallery.length > 1 && (
              <section>
                <h2 className="mb-4 text-lg font-bold">Gallery</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {cafe.gallery.map((src, i) => (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border/60">
                      <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pricing */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Pricing Plans</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {cafe.plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`relative flex items-center justify-between rounded-2xl border px-5 py-4 transition-colors ${
                      plan.highlight
                        ? 'border-[oklch(0.45_0.08_265/0.7)] bg-[oklch(0.20_0.06_265/0.4)]'
                        : 'border-border/60 bg-card'
                    }`}
                  >
                    {plan.highlight && (
                      <span className="absolute -top-2.5 left-4 rounded-full bg-[oklch(0.55_0.12_265)] px-3 py-0.5 text-[10px] font-bold text-white">
                        Best Value
                      </span>
                    )}
                    <div>
                      <div className="text-sm font-bold text-foreground">{plan.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{plan.duration}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-foreground">₹{plan.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Hours */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Opening Hours</h2>
              <div className="overflow-hidden rounded-2xl border border-border/60">
                {cafe.hours.map(({ day, time }, i) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm ${i !== 0 ? 'border-t border-border/40' : ''}`}
                  >
                    <span className="font-medium text-foreground">{day}</span>
                    <span className="text-muted-foreground">{time}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <h2 className="mb-4 text-lg font-bold">Reviews</h2>
              <div className="space-y-4">
                {cafe.reviews.map((rev) => (
                  <div key={rev.author} className="rounded-2xl border border-border/60 bg-card p-5">
                    <div className="flex items-start gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.28_0.06_265)] text-sm font-bold text-[oklch(0.82_0.14_265)]">
                        {rev.avatar}
                      </span>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-sm font-semibold">{rev.author}</span>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                        <StarRow rating={rev.rating} />
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{rev.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right sidebar */}
          <aside className="w-full shrink-0 space-y-5 lg:w-72">
            {/* Seat availability */}
            <div className="sticky top-24 space-y-5">
              {/* Station type boxes */}
              <div className={`grid gap-3 ${hasConsole ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {/* PC Box */}
                <button
                  onClick={() => setStationModal('PC')}
                  className="group rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:border-[oklch(0.55_0.18_265/0.6)] hover:bg-[oklch(0.18_0.04_265/0.4)]"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.75_0.14_265)]">
                      <Monitor className="size-4" />
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wide ${pcAvail > 0 ? 'text-[oklch(0.72_0.18_150)]' : 'text-[oklch(0.60_0.14_25)]'}`}>
                      {pcAvail > 0 ? 'Available' : 'Full'}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-muted-foreground">PC</p>
                  <p className="mt-0.5 text-2xl font-extrabold text-foreground">{pcAvail}<span className="text-sm font-normal text-muted-foreground">/{pcTotal}</span></p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(pcAvail / pcTotal) * 100}%`, background: pcAvail > 3 ? 'oklch(0.72 0.18 150)' : pcAvail > 0 ? 'oklch(0.72 0.18 60)' : 'oklch(0.60 0.18 25)' }} />
                  </div>
                  <p className="mt-2 text-[10px] text-muted-foreground group-hover:text-foreground">Tap to see stations →</p>
                </button>

                {/* PS5 Box */}
                {hasConsole && (
                  <button
                    onClick={() => setStationModal('PS5')}
                    className="group rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:border-[oklch(0.55_0.18_265/0.6)] hover:bg-[oklch(0.18_0.04_265/0.4)]"
                  >
                    <div className="mb-3 flex items-center justify-between">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.75_0.14_265)]">
                        <Gamepad2 className="size-4" />
                      </span>
                      <span className={`text-[10px] font-semibold uppercase tracking-wide ${ps5Avail > 0 ? 'text-[oklch(0.72_0.18_150)]' : 'text-[oklch(0.60_0.14_25)]'}`}>
                        {ps5Avail > 0 ? 'Available' : 'Full'}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-muted-foreground">PS5</p>
                    <p className="mt-0.5 text-2xl font-extrabold text-foreground">{ps5Avail}<span className="text-sm font-normal text-muted-foreground">/{ps5Total}</span></p>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
                      <div className="h-full rounded-full transition-all" style={{ width: ps5Total > 0 ? `${(ps5Avail / ps5Total) * 100}%` : '0%', background: ps5Avail > 2 ? 'oklch(0.72 0.18 150)' : ps5Avail > 0 ? 'oklch(0.72 0.18 60)' : 'oklch(0.60 0.18 25)' }} />
                    </div>
                    <p className="mt-2 text-[10px] text-muted-foreground group-hover:text-foreground">Tap to see stations →</p>
                  </button>
                )}
              </div>

              {/* Starting from */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <p className="text-xs text-muted-foreground">Starting from</p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-foreground">₹{cafe.pricePerHour}</span>
                  <span className="text-sm text-muted-foreground">/ hour</span>
                </div>
                <div className="mt-4 space-y-2">
                  <a
                    href={`tel:${cafe.phone}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    <Phone className="size-4" /> Call to Book
                  </a>
                  <a
                    href={`https://wa.me/${cafe.phone.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-border/60 bg-card p-5">
                <h3 className="mb-3 text-sm font-bold">Location</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{cafe.address}</p>
                <a
                  href={cafe.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-1.5 text-xs font-medium text-[oklch(0.72_0.12_265)] transition-opacity hover:opacity-80"
                >
                  Open in Google Maps <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related cafes ──────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">More Cafes You May Like</h2>
              <Link href="/cafes" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                View all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((c) => (
                <CafeCard key={c.id} cafe={c} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />

      {/* ── Station modal ─────────────────────────────────────────── */}
      {stationModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" onClick={() => setStationModal(null)}>
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-lg rounded-t-3xl border border-border/60 bg-[oklch(0.13_0.02_265)] p-6 shadow-2xl sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.75_0.14_265)]">
                  {stationModal === 'PC' ? <Monitor className="size-5" /> : <Gamepad2 className="size-5" />}
                </span>
                <div>
                  <h3 className="font-bold">{stationModal} Stations</h3>
                  <p className="text-xs text-muted-foreground">{modalAvail} of {modalTotal} available right now</p>
                </div>
              </div>
              <button onClick={() => setStationModal(null)} className="flex size-8 items-center justify-center rounded-full border border-border/60 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>

            {/* Legend */}
            <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[oklch(0.72_0.18_150)]" /> Available</span>
              <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[oklch(0.55_0.16_25)]" /> Occupied</span>
            </div>

            {/* Station grid */}
            <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
              {modalStations.map((s) => (
                <div
                  key={s.id}
                  className={`rounded-xl border p-3 text-center transition-colors ${
                    s.available
                      ? 'border-[oklch(0.55_0.18_150/0.5)] bg-[oklch(0.18_0.06_150/0.25)]'
                      : 'border-border/40 bg-[oklch(0.15_0.02_0/0.4)]'
                  }`}
                >
                  <p className={`text-xs font-bold ${s.available ? 'text-[oklch(0.80_0.16_150)]' : 'text-foreground'}`}>{s.label}</p>
                  {s.available ? (
                    <p className="mt-1 text-[10px] text-[oklch(0.65_0.14_150)]">Free</p>
                  ) : (
                    <p className="mt-1 text-[10px] text-muted-foreground">Until {s.occupiedUntil}</p>
                  )}
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">Call the cafe to reserve a specific station</p>
          </div>
        </div>
      )}
    </main>
  );
}
