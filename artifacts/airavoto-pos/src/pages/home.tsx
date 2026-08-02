import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Search, MapPin, Gamepad2, Zap, ArrowRight, ChevronRight
} from 'lucide-react';
import { CafeCard } from '@/components/site/CafeCard';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { getTopRated, getCafeCountByCity, CITIES } from '@/lib/cafes';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const POPULAR = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune'];

const STEPS = [
  {
    num: '01',
    icon: MapPin,
    title: 'Enter your location',
    desc: 'Type your city, area or neighbourhood to find gaming cafes nearby.',
  },
  {
    num: '02',
    icon: Gamepad2,
    title: 'Filter by devices',
    desc: 'Looking for PS5, VR or racing simulators? Filter by exactly what you want to play.',
  },
  {
    num: '03',
    icon: Zap,
    title: 'Walk in and play',
    desc: 'See ratings, pricing, open hours and amenities — then head straight in.',
  },
];

export default function Home() {
  useDocumentMeta({
    title: 'Airavoto Cafe — Find Gaming Cafes Near You',
    description:
      'Discover the best gaming cafes near you — PC, PS5, VR zones and more, rated and reviewed by real gamers.',
  });

  const [, navigate] = useLocation();
  const [locationQ, setLocationQ] = useState('');
  const [deviceQ, setDeviceQ] = useState('');

  const allCafes = getTopRated(6);
  const featured = allCafes.slice(0, 3);    // Top-rated near you
  const favourites = allCafes.slice(3, 6);  // Gamers' favourites
  const cityCounts = getCafeCountByCity();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (locationQ.trim()) params.set('q', locationQ.trim());
    if (deviceQ.trim()) params.set('q', `${locationQ.trim()} ${deviceQ.trim()}`.trim());
    navigate(`/cafes${params.toString() ? `?${params}` : ''}`);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pb-20 pt-28 text-center">
        {/* Glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(50% 50% at 50% 0%, oklch(0.40 0.02 265 / 0.25), transparent 70%)' }}
          />
          {/* Subtle dot-grid */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative mx-auto w-full max-w-2xl px-5">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-surface px-4 py-1.5 text-[12px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-[oklch(0.72_0.18_150)]" />
            15+ gaming cafes across India
          </span>

          {/* Heading — 3 fading lines */}
          <h1 className="mt-7 text-5xl font-extrabold leading-[1.07] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-foreground">Find your perfect</span>
            <span className="block text-foreground/55">gaming cafe</span>
            <span className="block text-foreground/30">near you.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
            Discover gaming cafes with the best PCs, PS5s, VR zones and more —
            rated and reviewed by real gamers.
          </p>

          {/* Two-field search */}
          <form onSubmit={handleSearch} className="mx-auto mt-10 max-w-xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:overflow-hidden sm:rounded-full sm:border sm:border-border/60 sm:bg-surface sm:p-1.5">
              {/* Location */}
              <div className="flex flex-1 items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:py-2">
                <MapPin className="size-4 shrink-0 text-muted-foreground" />
                <input
                  value={locationQ}
                  onChange={(e) => setLocationQ(e.target.value)}
                  placeholder="City or area..."
                  className="w-full bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              {/* Divider */}
              <div className="hidden h-5 w-px shrink-0 bg-border/60 sm:block" />

              {/* Device type */}
              <div className="flex flex-1 items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:py-2">
                <Gamepad2 className="size-4 shrink-0 text-muted-foreground" />
                <input
                  value={deviceQ}
                  onChange={(e) => setDeviceQ(e.target.value)}
                  placeholder="PS5, VR, tournaments..."
                  className="w-full bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 rounded-full bg-foreground px-7 py-3 text-[14px] font-bold text-background transition-opacity hover:opacity-90"
              >
                <Search className="size-4" />
                Search
              </button>
            </div>
          </form>

          {/* Popular chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[12px] text-muted-foreground">Popular:</span>
            {POPULAR.map((city) => (
              <Link
                key={city}
                href={`/cafes?city=${encodeURIComponent(city)}`}
                className="rounded-full border border-border/50 px-3 py-1 text-[12px] text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED — Top-rated near you ──────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Featured</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Top-rated near you</h2>
          </div>
          <Link href="/cafes" className="flex items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {featured.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)}
        </div>
      </section>

      {/* ── HIGHEST RATED — Gamers' favourites ─────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-7 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Highest Rated</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Gamers' favourites</h2>
          </div>
          <Link href="/cafes" className="flex items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground">
            See all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {favourites.map((cafe) => <CafeCard key={cafe.id} cafe={cafe} />)}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">How it works</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Find and visit in 3 steps</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {STEPS.map(({ num, icon: Icon, title, desc }) => (
              <div
                key={num}
                className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border/50 bg-card p-6"
              >
                {/* Large step number background */}
                <span className="absolute right-4 top-3 select-none text-5xl font-black text-border/60">
                  {num}
                </span>
                <span className="flex size-10 items-center justify-center rounded-xl border border-border/50 bg-surface">
                  <Icon className="size-5 text-muted-foreground" />
                </span>
                <div>
                  <h3 className="text-[15px] font-bold">{title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BROWSE BY CITY ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Browse</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Find cafes by city</h2>
          </div>
          <Link href="/cafes" className="flex items-center gap-1 text-[13px] text-muted-foreground transition-colors hover:text-foreground">
            All cities <ChevronRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {CITIES.map((city) => {
            const count = cityCounts[city] ?? 0;
            return (
              <Link
                key={city}
                href={`/cafes?city=${encodeURIComponent(city)}`}
                className="group flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-border/50 bg-card py-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:bg-[oklch(0.18_0_0)]"
              >
                <span className="text-4xl font-black text-foreground/80 transition-colors group-hover:text-foreground">
                  {city[0]}
                </span>
                <span className="text-[13px] font-semibold text-foreground">{city}</span>
                <span className="text-[11px] text-muted-foreground">
                  {count} {count === 1 ? 'cafe' : 'cafes'}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── OWN A GAMING CAFE? ─────────────────────────────────────── */}
      <section className="mx-5 mb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border/50 bg-[oklch(0.16_0_0)] px-8 py-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Own a gaming cafe?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground">
            List your cafe on Airavoto for free and get discovered by thousands of gamers in your city.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/list-cafe"
              className="rounded-full bg-foreground px-7 py-3 text-[14px] font-bold text-background transition-opacity hover:opacity-90"
            >
              List your cafe free
            </Link>
            <Link
              href="/cafes"
              className="flex items-center gap-1.5 rounded-full border border-border/60 px-7 py-3 text-[14px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse cafes <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
