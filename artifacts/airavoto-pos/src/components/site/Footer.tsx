import { useState } from 'react';
import { Link } from 'wouter';
import { MapPin } from 'lucide-react';

const DISCOVER = [
  { label: 'Browse all cafes', to: '/cafes' },
  { label: 'By city', to: '/cafes' },
  { label: 'VR zones', to: '/cafes?cat=VR' },
  { label: 'PS5 cafes', to: '/cafes?cat=Console' },
  { label: 'Racing simulators', to: '/cafes' },
];

const CITIES = [
  'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur',
];

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

  function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setNotified(true);
  }

  return (
    <footer className="border-t border-border/50 bg-[oklch(0.10_0_0)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1.6fr_1fr_1.2fr_1fr]">

        {/* Brand + newsletter */}
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-full border border-border bg-foreground text-sm font-black text-background">
              A
            </span>
            <span className="text-[15px] tracking-tight">
              <span className="font-normal">Airavoto</span>
              <span className="font-bold"> Cafe</span>
            </span>
          </Link>
          <p className="mt-4 max-w-[230px] text-[13px] leading-relaxed text-muted-foreground">
            Discover the best gaming cafes near you — PC, PS5, VR, simulators and more, rated by real gamers.
          </p>

          {/* Newsletter */}
          <form onSubmit={handleNotify} className="mt-6">
            {notified ? (
              <p className="text-[13px] text-[oklch(0.72_0.14_150)]">✓ You're on the list!</p>
            ) : (
              <div className="flex items-center overflow-hidden rounded-full border border-border/60 bg-surface">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="New cafes in your city"
                  className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  className="m-1 rounded-full bg-foreground px-4 py-1.5 text-[12px] font-semibold text-background transition-opacity hover:opacity-90"
                >
                  Notify me
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Discover */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Discover
          </h3>
          <ul className="mt-4 space-y-2.5">
            {DISCOVER.map(({ label, to }) => (
              <li key={label}>
                <Link href={to} className="text-[13px] text-foreground/70 transition-colors hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Cities */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Cities
          </h3>
          <ul className="mt-4 space-y-2.5">
            {CITIES.map((city) => (
              <li key={city}>
                <Link
                  href={`/cafes?city=${encodeURIComponent(city)}`}
                  className="flex items-center gap-1.5 text-[13px] text-foreground/70 transition-colors hover:text-foreground"
                >
                  <MapPin className="size-3 shrink-0 text-muted-foreground" />
                  {city}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Company
          </h3>
          <ul className="mt-4 space-y-2.5">
            {COMPANY.map(({ label, to }) => (
              <li key={label}>
                <Link href={to} className="text-[13px] text-foreground/70 transition-colors hover:text-foreground">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex max-w-6xl items-center justify-between border-t border-border/50 px-5 py-5">
        <p className="text-[12px] text-muted-foreground">© 2026 Airavoto Cafe. All rights reserved.</p>
        <p className="text-[12px] text-muted-foreground">Find gaming cafes across India</p>
      </div>
    </footer>
  );
}
