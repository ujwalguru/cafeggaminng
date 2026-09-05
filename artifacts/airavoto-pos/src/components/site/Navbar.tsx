import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X, Instagram, Youtube, Gamepad2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Explore', to: '/cafes' },
  { label: 'Blog', to: '/blog' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: Instagram },
  { label: 'Discord', href: 'https://discord.com/', icon: Gamepad2 },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: Youtube },
];

export function Navbar({ cafePage = false }: { cafePage?: boolean }) {
  const [pathname] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [, navigate] = useLocation();

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/cafes${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex h-[58px] max-w-5xl items-center gap-4 rounded-2xl border border-border/40 bg-[oklch(0.10_0_0/0.85)] px-4 shadow-[0_8px_32px_oklch(0_0_0/0.4)] backdrop-blur-2xl">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Airavoto Cafe"
            className="size-8 object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="text-[15px] tracking-tight">
            <span className="font-normal text-foreground">Airavoto</span>
            <span className="font-bold text-foreground"> Cafe</span>
          </span>
        </Link>

        {cafePage ? (
          <div className="ml-auto hidden min-w-0 flex-1 items-center justify-end md:flex">
            <div className="max-w-2xl overflow-hidden rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-wide text-primary">
              <div className="booking-marquee-track whitespace-nowrap">To book a seat, please contact the gaming café owner by phone or WhatsApp. &nbsp; • &nbsp; To book a seat, please contact the gaming café owner by phone or WhatsApp.</div>
            </div>
            <div className="ml-2 flex items-center gap-1 border-l border-border/50 pl-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Center search — desktop */}
            <form onSubmit={handleSearch} className="mx-4 hidden max-w-md flex-1 md:flex">
              <div className="flex w-full items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-2">
                <Search className="size-4 shrink-0 text-muted-foreground" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="City, area or cafe name..." className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none" />
              </div>
            </form>

            {/* Desktop nav links */}
            <nav className="ml-auto hidden items-center gap-1 md:flex">
              {NAV_LINKS.map((l) => <Link key={l.label} href={l.to} className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground">{l.label}</Link>)}
              <Link href="/cafes" className="ml-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90">Find a Cafe</Link>
              <div className="ml-2 flex items-center gap-1 border-l border-border/50 pl-2">
                {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </nav>
          </>
        )}

        {/* Mobile hamburger */}
        {!cafePage && <button
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>}
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mx-4 mt-2 rounded-2xl border border-border/40 bg-[oklch(0.10_0_0/0.95)] px-5 pb-5 pt-3 shadow-[0_8px_32px_oklch(0_0_0/0.4)] backdrop-blur-2xl md:hidden">
          {/* Mobile search */}
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-2.5">
              <Search className="size-4 shrink-0 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="City, area or cafe name..."
                className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
            </div>
          </form>
          <ul className="space-y-1">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.to}
                  className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/tournaments"
                className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                Tournaments
              </Link>
            </li>
          </ul>
          <Link
            href="/cafes"
            className="mt-2 flex w-full items-center justify-center rounded-full bg-foreground py-3 text-sm font-semibold text-background"
          >
            Find a Cafe
          </Link>
          <div className="mt-4 flex items-center justify-center gap-2 border-t border-border/40 pt-4">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className="flex size-10 items-center justify-center rounded-full border border-border/50 text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
