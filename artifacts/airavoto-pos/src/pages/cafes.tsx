import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';
import { SlidersHorizontal, X, ChevronDown, Star, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import { SearchBar } from '@/components/site/SearchBar';
import { CafeCard } from '@/components/site/CafeCard';
import { Footer } from '@/components/site/Footer';
import { cafes, CITIES, CATEGORIES, type GameCategory } from '@/lib/cafes';
import { useDocumentMeta } from '@/hooks/use-document-meta';
import { fetchLiveCafes, liveSnapshotToCafe, type LiveCafeSnapshot } from '@/lib/live-cafes';

type SortKey = 'rating' | 'price_asc' | 'price_desc' | 'reviews';

const SORT_LABELS: Record<SortKey, string> = {
  rating: 'Top Rated',
  price_asc: 'Price: Low to High',
  price_desc: 'Price: High to Low',
  reviews: 'Most Reviewed',
};

function parseParams(search: string) {
  const p = new URLSearchParams(search);
  return {
    q: p.get('q') ?? '',
    city: p.get('city') ?? '',
    cat: (p.get('cat') ?? '') as GameCategory | '',
  };
}

export default function CafesPage() {
  useDocumentMeta({ title: 'Find Gaming Cafes — Airavoto Cafe', description: 'Browse and find gaming cafes near you across India. Filter by city, game type, price, and more.' });

  const [location] = useLocation();
  const search = typeof window !== 'undefined' ? window.location.search : '';

  const { q: initQ, city: initCity, cat: initCat } = useMemo(() => parseParams(search), [search]);

  const [query, setQuery] = useState(initQ);
  const [city, setCity] = useState(initCity);
  const [category, setCategory] = useState<GameCategory | ''>(initCat);
  const [sort, setSort] = useState<SortKey>('rating');
  const [openOnly, setOpenOnly] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [liveSnapshots, setLiveSnapshots] = useState<LiveCafeSnapshot[]>([]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const snapshots = await fetchLiveCafes();
        if (!cancelled) setLiveSnapshots(snapshots);
      } catch {
        // Static café content remains usable if the live bridge is unavailable.
      }
    };
    load();
    const interval = window.setInterval(load, 15_000);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  const liveBySlug = useMemo(() => new Map(liveSnapshots.map((snapshot) => [snapshot.slug, snapshot])), [liveSnapshots]);
  const liveCatalog = useMemo(() => liveSnapshots.map(liveSnapshotToCafe), [liveSnapshots]);
  const catalog = useMemo(() => {
    const bySlug = new Map(cafes.map((cafe) => [cafe.slug, cafe]));
    for (const liveCafe of liveCatalog) {
      if (!bySlug.has(liveCafe.slug)) bySlug.set(liveCafe.slug, liveCafe);
    }
    return Array.from(bySlug.values());
  }, [liveCatalog]);

  // Sync URL params whenever they change externally (back button, etc.)
  useEffect(() => {
    const { q, city: c, cat } = parseParams(window.location.search);
    setQuery(q);
    setCity(c);
    setCategory(cat);
  }, [location]);

  const results = useMemo(() => {
    let list = catalog.filter((c) => {
      const q = query.toLowerCase().trim();
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.area.toLowerCase().includes(q);
      const matchCity = !city || c.city === city;
      const matchCat = !category || c.categories.includes(category as GameCategory);
      const matchOpen = !openOnly || c.isOpen;
      return matchQ && matchCity && matchCat && matchOpen;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'price_asc') return a.pricePerHour - b.pricePerHour;
      if (sort === 'price_desc') return b.pricePerHour - a.pricePerHour;
      if (sort === 'reviews') return b.reviewCount - a.reviewCount;
      return 0;
    });

    return list;
  }, [query, city, category, openOnly, sort, catalog]);

  function clearFilter(key: 'query' | 'city' | 'category' | 'openOnly') {
    if (key === 'query') setQuery('');
    if (key === 'city') setCity('');
    if (key === 'category') setCategory('');
    if (key === 'openOnly') setOpenOnly(false);
  }

  const activeFilters = [
    query && { key: 'query' as const, label: `"${query}"` },
    city && { key: 'city' as const, label: city },
    category && { key: 'category' as const, label: `${category} Gaming` },
    openOnly && { key: 'openOnly' as const, label: 'Open Now' },
  ].filter(Boolean) as { key: 'query' | 'city' | 'category' | 'openOnly'; label: string }[];

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ── Search header ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 border-b border-border/60 bg-[oklch(0.11_0_0/0.95)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-4">
          <Link
            href="/"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex-1">
            <SearchBar
              variant="compact"
              defaultQuery={query}
              defaultCity={city}
              defaultCategory={category}
              onSearch={(q, c, cat) => { setQuery(q); setCity(c); setCategory(cat); }}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 py-8">
        {/* ── Toolbar ───────────────────────────────────────────── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{results.length}</span> café{results.length !== 1 ? 's' : ''}
              {city ? ` in ${city}` : ''}
            </span>

            {/* Active filter chips */}
            {activeFilters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => clearFilter(key)}
                className="flex items-center gap-1.5 rounded-full border border-[oklch(0.45_0.08_265/0.5)] bg-[oklch(0.22_0.06_265/0.35)] px-3 py-1 text-xs font-medium text-[oklch(0.80_0.12_265)] transition-colors hover:bg-[oklch(0.22_0.06_265/0.6)]"
              >
                {label}
                <X className="size-3" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Open now toggle */}
            <button
              onClick={() => setOpenOnly((v) => !v)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${openOnly ? 'border-[oklch(0.50_0.14_150/0.7)] bg-[oklch(0.22_0.06_150/0.5)] text-[oklch(0.78_0.16_150)]' : 'border-border/60 text-muted-foreground hover:text-foreground'}`}
            >
              <span className={`size-1.5 rounded-full ${openOnly ? 'bg-[oklch(0.72_0.18_150)]' : 'bg-muted-foreground'}`} />
              Open Now
            </button>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <SlidersHorizontal className="size-3.5" />
                {SORT_LABELS[sort]}
                <ChevronDown className={`size-3 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-48 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                  {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => { setSort(key); setSortOpen(false); }}
                      className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-surface-2 ${sort === key ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                    >
                      {SORT_LABELS[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile filters toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-1.5 rounded-full border border-border/60 px-4 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground sm:hidden"
            >
              Filters
            </button>
          </div>
        </div>

        {/* ── Mobile filter panel ───────────────────────────────── */}
        {showFilters && (
          <div className="mb-6 rounded-2xl border border-border/60 bg-card p-5 sm:hidden">
            <h3 className="mb-4 text-sm font-semibold">Filters</h3>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">City</p>
                <div className="flex flex-wrap gap-2">
                  {['', ...CITIES].map((c) => (
                    <button key={c || 'all'} onClick={() => setCity(c)} className={`rounded-full border px-3 py-1 text-xs transition-colors ${city === c ? 'border-[oklch(0.50_0.08_265)] bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.82_0.12_265)] font-medium' : 'border-border/60 text-muted-foreground'}`}>
                      {c || 'All'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Game Type</p>
                <div className="flex flex-wrap gap-2">
                  {(['', ...CATEGORIES] as (GameCategory | '')[]).map((cat) => (
                    <button key={cat || 'all'} onClick={() => setCategory(cat)} className={`rounded-full border px-3 py-1 text-xs transition-colors ${category === cat ? 'border-[oklch(0.50_0.08_265)] bg-[oklch(0.22_0.06_265/0.5)] text-[oklch(0.82_0.12_265)] font-medium' : 'border-border/60 text-muted-foreground'}`}>
                      {cat || 'All'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Desktop sidebar + grid ──────────────────────────────── */}
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden w-52 shrink-0 space-y-6 sm:block sticky top-16 self-start max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">City</p>
              <div className="space-y-1">
                {['', ...CITIES].map((c) => (
                  <button
                    key={c || 'all'}
                    onClick={() => setCity(c)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${city === c ? 'bg-[oklch(0.22_0.06_265/0.5)] text-foreground font-medium' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'}`}
                  >
                    {c || 'All Cities'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Game Type</p>
              <div className="space-y-1">
                {(['', ...CATEGORIES] as (GameCategory | '')[]).map((cat) => (
                  <button
                    key={cat || 'all'}
                    onClick={() => setCategory(cat)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${category === cat ? 'bg-[oklch(0.22_0.06_265/0.5)] text-foreground font-medium' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'}`}
                  >
                    {cat || 'All Types'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Availability</p>
              <button
                onClick={() => setOpenOnly((v) => !v)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${openOnly ? 'bg-[oklch(0.22_0.06_150/0.5)] text-[oklch(0.78_0.16_150)] font-medium' : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'}`}
              >
                <span className={`size-2 rounded-full ${openOnly ? 'bg-[oklch(0.72_0.18_150)]' : 'bg-muted-foreground'}`} />
                Open Now
              </button>
            </div>

            <div>
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Min. Rating</p>
              <div className="space-y-1">
                {[4.5, 4.0, 3.5].map((r) => (
                  <button
                    key={r}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    <Star className="size-3.5 fill-[oklch(0.80_0.14_60)] text-[oklch(0.80_0.14_60)]" />
                    {r}+
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results grid */}
          <div className="min-w-0 flex-1">
            {results.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                {results.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} live={liveBySlug.get(cafe.slug)} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-3xl border border-border/60 bg-card py-24 text-center">
                <span className="flex size-14 items-center justify-center rounded-2xl border border-border bg-surface">
                  <Star className="size-6 text-muted-foreground" />
                </span>
                <div>
                  <p className="text-base font-semibold">No cafes found</p>
                  <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or filters.</p>
                </div>
                <button
                  onClick={() => { setQuery(''); setCity(''); setCategory(''); setOpenOnly(false); }}
                  className="rounded-full border border-border px-5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
