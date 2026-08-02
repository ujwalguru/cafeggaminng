import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Search, MapPin, ChevronDown, X } from 'lucide-react';
import { CITIES, CATEGORIES, type GameCategory } from '@/lib/cafes';

interface SearchBarProps {
  defaultQuery?: string;
  defaultCity?: string;
  defaultCategory?: GameCategory | '';
  variant?: 'hero' | 'compact';
  onSearch?: (query: string, city: string, category: GameCategory | '') => void;
}

export function SearchBar({
  defaultQuery = '',
  defaultCity = '',
  defaultCategory = '',
  variant = 'hero',
  onSearch,
}: SearchBarProps) {
  const [, navigate] = useLocation();
  const [query, setQuery] = useState(defaultQuery);
  const [city, setCity] = useState(defaultCity);
  const [category, setCategory] = useState<GameCategory | ''>(defaultCategory);
  const [cityOpen, setCityOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
      if (catRef.current && !catRef.current.contains(e.target as Node)) setCatOpen(false);
    }
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (onSearch) {
      onSearch(query, city, category);
    } else {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (city) params.set('city', city);
      if (category) params.set('cat', category);
      navigate(`/cafes${params.toString() ? `?${params}` : ''}`);
    }
    setCityOpen(false);
    setCatOpen(false);
  }

  if (variant === 'compact') {
    return (
      <form
        onSubmit={handleSubmit}
        className="flex w-full items-center gap-2 rounded-2xl border border-border/70 bg-[oklch(0.11_0_0/0.95)] p-2 backdrop-blur-xl"
      >
        <div className="flex flex-1 items-center gap-2 rounded-xl bg-surface px-3 py-2">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cafes, cities…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Find
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative w-full transition-all duration-300 ${focused ? 'scale-[1.01]' : ''}`}
    >
      <div
        className={`flex w-full flex-col gap-2 overflow-hidden rounded-3xl border p-2 backdrop-blur-xl transition-colors duration-300 sm:flex-row sm:items-center sm:rounded-full ${
          focused ? 'border-[oklch(0.45_0.08_265)] bg-[oklch(0.12_0_0/0.98)]' : 'border-border/70 bg-[oklch(0.11_0_0/0.92)]'
        }`}
      >
        {/* Search input */}
        <div className="flex flex-1 items-center gap-3 rounded-full px-4 py-3">
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search café name, area or city…"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:text-base"
          />
          {query && (
            <button type="button" onClick={() => setQuery('')} className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 px-2 sm:px-0">
          {/* City picker */}
          <div ref={cityRef} className="relative">
            <button
              type="button"
              onClick={() => { setCityOpen((v) => !v); setCatOpen(false); }}
              className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <MapPin className="size-4 shrink-0" />
              <span className={city ? 'text-foreground font-medium' : ''}>{city || 'All Cities'}</span>
              <ChevronDown className={`size-3.5 transition-transform ${cityOpen ? 'rotate-180' : ''}`} />
            </button>
            {cityOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <button
                  type="button"
                  onClick={() => { setCity(''); setCityOpen(false); }}
                  className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-surface-2 ${!city ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                >
                  All Cities
                </button>
                {CITIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setCity(c); setCityOpen(false); }}
                    className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-surface-2 ${city === c ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category picker */}
          <div ref={catRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => { setCatOpen((v) => !v); setCityOpen(false); }}
              className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className={category ? 'text-foreground font-medium' : ''}>{category || 'Game Type'}</span>
              <ChevronDown className={`size-3.5 transition-transform ${catOpen ? 'rotate-180' : ''}`} />
            </button>
            {catOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <button
                  type="button"
                  onClick={() => { setCategory(''); setCatOpen(false); }}
                  className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-surface-2 ${!category ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                >
                  All Types
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => { setCategory(cat); setCatOpen(false); }}
                    className={`flex w-full items-center px-4 py-2.5 text-sm transition-colors hover:bg-surface-2 ${category === cat ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                  >
                    {cat} Gaming
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            <Search className="size-4" />
            <span className="hidden sm:inline">Find Cafes</span>
          </button>
        </div>
      </div>
    </form>
  );
}
