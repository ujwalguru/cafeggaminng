import { useState } from 'react';
import { Link } from 'wouter';
import { MapPin } from 'lucide-react';
import { MobileBottomNav } from '@/components/site/MobileBottomNav';

const DISCOVER = [
  { label: 'Browse all cafes', to: '/cafes' },
  { label: 'By city', to: '/cafes' },
  { label: 'VR zones', to: '/cafes?cat=VR' },
  { label: 'PS5 cafes', to: '/cafes?cat=Console' },
  { label: 'Racing simulators', to: '/cafes' },
];

const CITIES = ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur'];

const COMPANY = [
  { label: 'Blog', to: '/blog' },
  { label: 'List your cafe', to: '/list-cafe' },
  { label: 'Contact', to: '/list-cafe' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Terms', to: '/terms' },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [notified, setNotified] = useState(false);

  function handleNotify(event: React.FormEvent) {
    event.preventDefault();
    if (email.trim()) setNotified(true);
  }

  return (
    <>
      {/* Light newsletter area from the reference layout. */}
      <section className="bg-white px-5 py-14 text-zinc-950 sm:py-20">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">Airavoto Cafe updates</p>
          <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Subscribe to our newsletter</h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-500">Get new gaming cafes, tournaments, and special offers delivered to your inbox.</p>
          <form onSubmit={handleNotify} className="mx-auto mt-6 flex max-w-md overflow-hidden rounded-full border border-zinc-300 bg-zinc-50 p-1 shadow-sm">
            {notified ? (
              <p className="w-full px-4 py-2.5 text-center text-sm font-semibold text-emerald-700">You’re on the list.</p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-zinc-400"
                />
                <button type="submit" className="rounded-full bg-zinc-950 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-zinc-700">Get started</button>
              </>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black text-white">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:pt-14">
          {/* Floating CTA panel */}
          <div className="relative mb-12 overflow-hidden rounded-2xl border border-white/15 bg-[radial-gradient(circle_at_85%_30%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(120deg,#111113,#050506)] px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.45)] sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute -right-12 -top-24 size-64 rounded-full border border-cyan-300/30 shadow-[0_0_50px_rgba(34,211,238,0.16)]" />
            <div className="relative max-w-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-300">Find your next arena</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">Experience superior gaming.</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/55">Compare real-time availability and discover the perfect PC, console, VR, or racing setup near you.</p>
              <Link href="/cafes" className="mt-5 inline-flex rounded-full bg-white px-5 py-2.5 text-xs font-bold text-black transition-transform hover:scale-105">Find a cafe</Link>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1.2fr_1fr]">
            <div>
              <Link href="/" className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full border border-white/20 bg-white text-sm font-black text-black">A</span>
                <span className="text-[15px] tracking-tight"><span className="font-normal">Airavoto</span><span className="font-bold"> Cafe</span></span>
              </Link>
              <p className="mt-4 max-w-[230px] text-[13px] leading-relaxed text-white/50">Discover the best gaming cafes near you — PC, PS5, VR, simulators and more, rated by real gamers.</p>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">Discover</h3>
              <ul className="mt-4 space-y-2.5">{DISCOVER.map(({ label, to }) => <li key={label}><Link href={to} className="text-[13px] text-white/65 transition-colors hover:text-white">{label}</Link></li>)}</ul>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">Cities</h3>
              <ul className="mt-4 space-y-2.5">{CITIES.map((city) => <li key={city}><Link href={`/cafes?city=${encodeURIComponent(city)}`} className="flex items-center gap-1.5 text-[13px] text-white/65 transition-colors hover:text-white"><MapPin className="size-3 shrink-0 text-white/40" />{city}</Link></li>)}</ul>
            </div>

            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/45">Company</h3>
              <ul className="mt-4 space-y-2.5">{COMPANY.map(({ label, to }) => <li key={label}><Link href={to} className="text-[13px] text-white/65 transition-colors hover:text-white">{label}</Link></li>)}</ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-5 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Airavoto Cafe. All rights reserved.</p>
            <p>Find gaming cafes across India</p>
          </div>
        </div>
      </footer>
      <MobileBottomNav />
    </>
  );
}
