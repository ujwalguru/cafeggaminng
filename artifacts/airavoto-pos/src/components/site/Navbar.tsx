import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Search, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Explore', to: '/cafes' },
  { label: 'Blog', to: '/blog' },
];

export function Navbar() {
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
          <span className="flex size-8 items-center justify-center rounded-full border border-border bg-foreground text-sm font-black text-background">
            A
          </span>
          <span className="text-[15px] tracking-tight">
            <span className="font-normal text-foreground">Airavoto</span>
            <span className="font-bold text-foreground"> Cafe</span>
          </span>
        </Link>

        {/* Center search — desktop */}
        <form
          onSubmit={handleSearch}
          className="mx-4 hidden flex-1 max-w-md md:flex"
        >
          <div className="flex w-full items-center gap-2 rounded-full border border-border/60 bg-surface px-4 py-2">
            <Search className="size-4 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="City, area or cafe name..."
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
        </form>

        {/* Desktop nav links */}
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.to}
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="ml-2 rounded-full border border-border/60 px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            Sign Up
          </Link>
          <Link
            href="/cafes"
            className="ml-2 rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Find a Cafe
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="ml-auto flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
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
          </ul>
          <Link
            href="/signup"
            className="mt-3 flex w-full items-center justify-center rounded-full border border-border/60 py-3 text-sm font-semibold text-foreground"
          >
            Sign Up
          </Link>
          <Link
            href="/cafes"
            className="mt-2 flex w-full items-center justify-center rounded-full bg-foreground py-3 text-sm font-semibold text-background"
          >
            Find a Cafe
          </Link>
        </div>
      )}
    </header>
  );
}
