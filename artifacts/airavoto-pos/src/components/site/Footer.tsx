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
  return (
    <>
      <footer className="border-t border-white/10 bg-black text-white">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-10 sm:pt-14">
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
