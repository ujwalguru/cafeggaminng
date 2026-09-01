import { useState } from 'react';
import { Gamepad2, CheckCircle2, Store, Globe, BarChart3, Users, MapPin, Search as SearchIcon, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const PERKS = [
  { icon: Globe, title: 'Be Discovered', desc: 'Reach thousands of gamers searching for cafes in your city every month.' },
  { icon: Users, title: 'Live Seat Visibility', desc: 'Show real-time seat availability so players know before walking in.' },
  { icon: BarChart3, title: 'Performance Insights', desc: 'See page views, searches, and how players find your listing.' },
  { icon: Store, title: 'Free Forever', desc: 'Basic listing on Airavoto Cafe is completely free. No hidden fees.' },
];

type FormState = 'idle' | 'submitting' | 'done';

type LocationResult = {
  place_id: string | number;
  display_name: string;
  lat: string;
  lon: string;
  address?: Record<string, string>;
};

function decodeMapsSearch(value: string) {
  const input = value.trim();
  if (!input) return '';

  try {
    const url = new URL(input);
    const query = url.searchParams.get('query') || url.searchParams.get('q');
    if (query) return query;

    const placeMatch = url.pathname.match(/\/maps\/(?:search|place)\/([^/]+)/i);
    if (placeMatch) return decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));

    const coordinateMatch = url.pathname.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
    if (coordinateMatch) return `${coordinateMatch[1]},${coordinateMatch[2]}`;
  } catch {
    // Treat non-URL input as a normal place search.
  }

  return input;
}

function getLocationPart(address: Record<string, string> | undefined, keys: string[]) {
  if (!address) return '';
  return keys.map((key) => address[key]).find(Boolean) || '';
}

export default function ListCafe() {
  useDocumentMeta({ title: 'List Your Gaming Cafe — Airavoto Cafe', description: 'Add your gaming cafe to Airavoto and reach thousands of gamers.' });

  const [form, setForm] = useState({ name: '', city: '', area: '', address: '', mapsLink: '', phone: '', whatsapp: '', email: '', description: '' });
  const [state, setState] = useState<FormState>('idle');
  const [locationResults, setLocationResults] = useState<LocationResult[]>([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState('');
  const [formError, setFormError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleLocationLookup() {
    const input = form.mapsLink.trim();
    if (!input) {
      setLocationMessage('Paste a Google Maps link or type a café name and area first.');
      return;
    }

    if (/maps\.app\.goo\.gl|goo\.gl/i.test(input)) {
      setLocationMessage('Short Google Maps links cannot be read directly. Paste the full google.com/maps link or type the café name and area.');
      return;
    }

    const query = decodeMapsSearch(input);
    setLocationLoading(true);
    setLocationMessage('Searching for the location…');
    setLocationResults([]);

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`, {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error('Location search failed');
      const results = (await response.json()) as LocationResult[];
      if (results.length === 0) {
        setLocationMessage('No location found. Try a more complete café name, area, or city.');
        return;
      }
      setLocationResults(results);
      setLocationMessage('Select the matching location to fill the address fields.');
    } catch {
      setLocationMessage('Location search is unavailable right now. You can still enter the address manually.');
    } finally {
      setLocationLoading(false);
    }
  }

  function applyLocation(result: LocationResult) {
    const address = result.address || {};
    const city = getLocationPart(address, ['city', 'town', 'municipality', 'village', 'county']);
    const area = getLocationPart(address, ['suburb', 'neighbourhood', 'city_district', 'quarter']);
    const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${result.lat},${result.lon}`)}`;
    setForm((prev) => ({
      ...prev,
      city: city || prev.city,
      area: area || prev.area,
      address: result.display_name,
      mapsLink,
      name: prev.name || result.display_name.split(',')[0].trim(),
    }));
    setLocationResults([]);
    setLocationMessage('Location added. Review the fields before submitting.');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const indianMobile = /^[6-9]\d{9}$/;
    const approvedEmail = /^[^\s@]+@(gmail|googlemail|outlook|hotmail|live|msn|yahoo)\.com$/i;
    if (!indianMobile.test(form.phone) || !indianMobile.test(form.whatsapp)) {
      setFormError('Enter valid 10-digit Indian mobile numbers beginning with 6, 7, 8, or 9.');
      return;
    }
    if (!approvedEmail.test(form.email.trim())) {
      setFormError('Use a Gmail, Outlook, Hotmail, Live, MSN, or Yahoo .com email address.');
      return;
    }
    setFormError('');
    setState('submitting');
    setTimeout(() => setState('done'), 1400);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 text-center">
        <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(50% 50% at 50% 0%, oklch(0.55_0.14_265/0.15), transparent)' }} />
        <div className="relative mx-auto max-w-2xl px-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.45_0.08_265/0.5)] bg-[oklch(0.20_0.06_265/0.4)] px-4 py-1.5 text-xs font-medium text-[oklch(0.80_0.12_265)]">
            <Gamepad2 className="size-3.5" /> For Cafe Owners
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get Your Cafe <span style={{ WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(135deg, oklch(0.80 0.14 265), oklch(0.78 0.18 310))', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Discovered</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
            List your gaming cafe on Airavoto and connect with thousands of gamers searching for the perfect place to play in your city.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 pb-24">
        {/* Perks */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5">
              <span className="flex size-10 items-center justify-center rounded-xl bg-[oklch(0.22_0.06_265/0.4)] text-[oklch(0.80_0.12_265)]">
                <Icon className="size-5" />
              </span>
              <div>
                <div className="text-sm font-bold">{title}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="mx-auto max-w-xl">
          {state === 'done' ? (
            <div className="flex flex-col items-center gap-5 rounded-3xl border border-[oklch(0.45_0.08_150/0.5)] bg-[oklch(0.18_0.04_150/0.3)] px-8 py-16 text-center">
              <span className="flex size-14 items-center justify-center rounded-full border border-[oklch(0.45_0.08_150/0.5)] bg-[oklch(0.22_0.06_150/0.4)]">
                <CheckCircle2 className="size-7 text-[oklch(0.72_0.18_150)]" />
              </span>
              <div>
                <h2 className="text-xl font-bold">Application Received!</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Thanks for submitting <strong className="text-foreground">{form.name}</strong>! Our team will review your listing and get back to you within 2 business days.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="rounded-3xl border border-border/60 bg-card p-8">
              <h2 className="mb-6 text-xl font-bold">Submit Your Cafe</h2>
              <div className="space-y-4">
                <div className="rounded-2xl border border-[oklch(0.45_0.08_265/0.45)] bg-[oklch(0.20_0.06_265/0.25)] p-4">
                  <label htmlFor="mapsLink" className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-foreground">
                    <MapPin className="size-3.5 text-[oklch(0.80_0.12_265)]" /> Google Maps link or cafe search
                  </label>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <input
                      id="mapsLink"
                      name="mapsLink"
                      value={form.mapsLink}
                      onChange={handleChange}
                      placeholder="Paste a Google Maps link or type cafe name + area"
                      className="min-w-0 flex-1 rounded-xl border border-border/60 bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.45_0.08_265)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.45_0.08_265/0.4)]"
                    />
                    <button
                      type="button"
                      onClick={handleLocationLookup}
                      disabled={locationLoading}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2 disabled:cursor-wait disabled:opacity-60"
                    >
                      {locationLoading ? <Loader2 className="size-4 animate-spin" /> : <SearchIcon className="size-4" />}
                      {locationLoading ? 'Searching…' : 'Find address'}
                    </button>
                  </div>
                  <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">We use the link or search text to suggest the address, city, and area. Review the result before submitting.</p>
                  {locationMessage && <p className="mt-2 text-xs text-[oklch(0.78_0.12_265)]">{locationMessage}</p>}
                  {locationResults.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {locationResults.map((result) => (
                        <button
                          type="button"
                          key={`${result.place_id}-${result.lat}-${result.lon}`}
                          onClick={() => applyLocation(result)}
                          className="flex w-full items-start gap-2 rounded-xl border border-border/60 bg-surface px-3 py-2.5 text-left transition-colors hover:border-[oklch(0.55_0.12_265)] hover:bg-surface-2"
                        >
                          <MapPin className="mt-0.5 size-4 shrink-0 text-[oklch(0.80_0.12_265)]" />
                          <span className="text-xs leading-relaxed text-foreground">{result.display_name}</span>
                        </button>
                      ))}
                      <p className="text-[10px] text-muted-foreground">Search results powered by OpenStreetMap contributors.</p>
                    </div>
                  )}
                </div>
                {[
                  { name: 'name', label: 'Cafe Name', placeholder: 'e.g. Neon Arena Gaming Lounge', required: true },
                  { name: 'city', label: 'City', placeholder: 'e.g. Mumbai', required: true },
                  { name: 'area', label: 'Area / Locality', placeholder: 'e.g. Andheri West', required: true },
                  { name: 'address', label: 'Full Address', placeholder: 'Street, building, landmark, pincode', required: true },
                  { name: 'phone', label: 'Phone Number (India)', placeholder: '9820000000', required: true, type: 'tel', pattern: '[6-9][0-9]{9}', maxLength: 10 },
                  { name: 'whatsapp', label: 'WhatsApp Number (India)', placeholder: '9820000000', required: true, type: 'tel', pattern: '[6-9][0-9]{9}', maxLength: 10 },
                  { name: 'email', label: 'Email Address', placeholder: 'owner@gmail.com', required: true, type: 'email' },
                ].map(({ name, label, placeholder, required, type, pattern, maxLength }) => (
                  <div key={name}>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">{label}</label>
                    <input
                      name={name}
                      value={(form as Record<string, string>)[name]}
                      onChange={handleChange}
                      required={required}
                      type={type || 'text'}
                      pattern={pattern}
                      maxLength={maxLength}
                      inputMode={type === 'tel' ? 'numeric' : undefined}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-border/60 bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.45_0.08_265)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.45_0.08_265/0.4)]"
                    />
                  </div>
                ))}
                {formError && <p className="rounded-xl border border-[oklch(0.55_0.16_25/0.5)] bg-[oklch(0.20_0.05_25/0.25)] px-3 py-2 text-xs text-[oklch(0.78_0.14_25)]">{formError}</p>}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">Tell us about your cafe</label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Number of PCs, consoles, VR rigs, amenities, pricing, special features…"
                    className="w-full resize-none rounded-xl border border-border/60 bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.45_0.08_265)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.45_0.08_265/0.4)]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {state === 'submitting' ? 'Submitting…' : 'Submit Listing Request'}
                </button>
                <p className="text-center text-xs text-muted-foreground">Free to list · No credit card needed · 2-day review</p>
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
