import { useEffect, useRef } from 'react';
import { Link } from 'wouter';
import {
  Gamepad2, MapPin, Star, Zap, Trophy, Users, Shield, Clock,
  Monitor, Cpu, Headphones, Wifi, ChevronRight, ArrowRight
} from 'lucide-react';
import { SearchBar } from '@/components/site/SearchBar';
import { CafeCard } from '@/components/site/CafeCard';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { getFeaturedCafes, CITIES } from '@/lib/cafes';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const POPULAR_SEARCHES = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Chennai'];

const HOW_IT_WORKS = [
  { step: '01', icon: MapPin, title: 'Enter Your Location', desc: 'Type your city, area, or café name in the search bar to find options near you.' },
  { step: '02', icon: Star, title: 'Compare & Explore', desc: 'Browse ratings, amenities, pricing, and live seat availability for every café.' },
  { step: '03', icon: Gamepad2, title: 'Walk In & Play', desc: 'Head over — seats are shown in real-time so you know before you go.' },
];

const CATEGORIES = [
  { label: 'PC Gaming', icon: Monitor, color: 'oklch(0.72_0.14_265)', bg: 'oklch(0.22_0.06_265)', desc: 'High-end rigs, 144–240 Hz monitors', cat: 'PC' },
  { label: 'Console', icon: Gamepad2, color: 'oklch(0.72_0.14_310)', bg: 'oklch(0.22_0.06_310)', desc: 'PS5, Xbox Series X, Nintendo Switch', cat: 'Console' },
  { label: 'VR Arena', icon: Headphones, color: 'oklch(0.72_0.16_150)', bg: 'oklch(0.22_0.06_150)', desc: 'Immersive VR headset experiences', cat: 'VR' },
  { label: 'Mobile Zone', icon: Cpu, color: 'oklch(0.72_0.14_35)', bg: 'oklch(0.22_0.06_35)', desc: 'BGMI, Free Fire, tournament setups', cat: 'Mobile' },
];

const STATS = [
  { value: '500+', label: 'Gaming Cafes' },
  { value: '50+', label: 'Cities Covered' },
  { value: '10K+', label: 'Gamers Monthly' },
  { value: '4.6★', label: 'Avg. Rating' },
];

const PERKS = [
  { icon: Zap, title: 'Real-Time Seats', desc: 'Live availability so you never walk in to a full house.' },
  { icon: Trophy, title: 'Tournament Alerts', desc: 'Get notified about local tournaments and prize pools.' },
  { icon: Shield, title: 'Verified Listings', desc: 'Every café is reviewed and verified before listing.' },
  { icon: Clock, title: 'Honest Hours', desc: 'Up-to-date opening hours including late-night slots.' },
  { icon: Users, title: 'Squad-Friendly', desc: 'Filter for group rooms and multi-seat booking options.' },
  { icon: Wifi, title: 'Spec Transparency', desc: 'See GPU, internet speed, and peripheral specs upfront.' },
];

export default function Home() {
  useDocumentMeta({
    title: 'Airavoto Cafe — Find Gaming Cafes Near You',
    description: 'Discover the best gaming cafes and esports lounges near you. Browse real-time seat availability, pricing, and amenities across India.',
  });

  const featuredCafes = getFeaturedCafes();

  // Scroll reveal
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.1 }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const addRef = (el: HTMLElement | null, i: number) => { sectionRefs.current[i] = el; };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pb-24 pt-32">
        {/* Background glows */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div style={{ background: 'radial-gradient(55% 55% at 50% -5%, oklch(0.55_0.14_270/0.22), transparent)' }} className="absolute inset-0" />
          <div style={{ background: 'radial-gradient(35% 35% at 20% 60%, oklch(0.55_0.14_310/0.10), transparent)' }} className="absolute inset-0" />
          <div style={{ background: 'radial-gradient(35% 35% at 80% 70%, oklch(0.55_0.14_150/0.08), transparent)' }} className="absolute inset-0" />
          {/* Grid */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative mx-auto w-full max-w-4xl px-5 text-center">
          {/* Pill badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.45_0.08_265/0.6)] bg-[oklch(0.20_0.06_265/0.5)] px-4 py-1.5 text-xs font-medium text-[oklch(0.80_0.12_265)] backdrop-blur-sm">
            <Gamepad2 className="size-3.5" />
            India's #1 Gaming Café Discovery Platform
          </span>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            Find Your Perfect{' '}
            <span
              className="relative inline-block"
              style={{ WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(135deg, oklch(0.80 0.14 265), oklch(0.78 0.18 310), oklch(0.72 0.18 150))', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}
            >
              Gaming Cafe
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Browse real-time seat availability, compare pricing and amenities, and discover the best gaming cafes and esports lounges near you.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar variant="hero" />
          </div>

          {/* Popular searches */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Popular:</span>
            {POPULAR_SEARCHES.map((city) => (
              <Link
                key={city}
                href={`/cafes?city=${encodeURIComponent(city)}`}
                className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border hover:text-foreground"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 0)}
        className="reveal mx-auto max-w-4xl px-5 pb-24"
      >
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border/60 bg-border/60 sm:grid-cols-4">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1 bg-card px-6 py-8 text-center">
              <span className="text-3xl font-extrabold tracking-tight text-foreground">{value}</span>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 1)}
        className="reveal mx-auto max-w-5xl px-5 pb-28"
      >
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Browse by Type</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Every Way to Play</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {CATEGORIES.map(({ label, icon: Icon, color, bg, desc, cat }) => (
            <Link
              key={cat}
              href={`/cafes?cat=${cat}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all duration-200 hover:-translate-y-1 hover:border-border"
            >
              <span
                className="flex size-11 items-center justify-center rounded-xl"
                style={{ background: `oklch(from ${bg} l c h / 0.5)`, color }}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-sm font-bold text-foreground">{label}</div>
                <div className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{desc}</div>
              </div>
              <span className="mt-auto flex items-center gap-1 text-[11px] font-medium" style={{ color }}>
                Explore <ChevronRight className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED CAFES ────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 2)}
        className="reveal mx-auto max-w-5xl px-5 pb-28"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Top Picks</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Featured Cafes</h2>
          </div>
          <Link href="/cafes" className="flex items-center gap-1.5 rounded-full border border-border/60 px-5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            View all cafes <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {featuredCafes.slice(0, 4).map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 3)}
        className="reveal relative overflow-hidden py-28"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(60% 60% at 50% 50%, oklch(0.50_0.10_265/0.06), transparent)' }} />
        <div className="relative mx-auto max-w-4xl px-5">
          <div className="mb-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Simple Process</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Find a Café in 3 Steps</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl border border-[oklch(0.45_0.08_265/0.5)] bg-[oklch(0.22_0.06_265/0.4)]">
                    <Icon className="size-5 text-[oklch(0.80_0.12_265)]" />
                  </span>
                  <span className="text-4xl font-black text-border">{step}</span>
                </div>
                <h3 className="text-base font-bold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY AIRAVOTO ──────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 4)}
        className="reveal mx-auto max-w-5xl px-5 py-28"
      >
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Why Us</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Built for Gamers, by Gamers</h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            We obsess over the details so you always know exactly what you're walking into.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group flex gap-4 rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-border">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[oklch(0.45_0.08_265/0.4)] bg-[oklch(0.22_0.06_265/0.3)]">
                <Icon className="size-5 text-[oklch(0.80_0.12_265)]" />
              </span>
              <div>
                <div className="text-sm font-bold text-foreground">{title}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CITIES ────────────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 5)}
        className="reveal mx-auto max-w-4xl px-5 pb-28"
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Explore Cities</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Find Cafes In Your City</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {CITIES.map((city) => (
            <Link
              key={city}
              href={`/cafes?city=${encodeURIComponent(city)}`}
              className="group flex items-center gap-2 rounded-2xl border border-border/60 bg-card px-5 py-3 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-[oklch(0.45_0.08_265/0.6)] hover:text-foreground"
            >
              <MapPin className="size-4 text-[oklch(0.65_0.12_265)]" />
              {city}
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section
        ref={(el) => addRef(el, 6)}
        className="reveal mx-5 mb-24 overflow-hidden rounded-3xl border border-[oklch(0.45_0.08_265/0.3)] bg-[oklch(0.18_0.04_265/0.6)]"
        style={{ background: 'linear-gradient(135deg, oklch(0.18 0.06 265 / 0.8), oklch(0.18 0.06 310 / 0.5))' }}
      >
        <div className="px-8 py-16 text-center md:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Own a Gaming Café?</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            List your café on Airavoto and reach thousands of gamers looking for a place to play in your area.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/list-cafe"
              className="rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
            >
              List Your Café Free →
            </Link>
            <Link
              href="/cafes"
              className="rounded-full border border-border px-8 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse All Cafes
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
