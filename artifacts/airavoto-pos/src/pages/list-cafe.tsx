import { useState } from 'react';
import { Gamepad2, CheckCircle2, Store, Globe, BarChart3, Users } from 'lucide-react';
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

export default function ListCafe() {
  useDocumentMeta({ title: 'List Your Gaming Cafe — Airavoto Cafe', description: 'Add your gaming cafe to Airavoto and reach thousands of gamers.' });

  const [form, setForm] = useState({ name: '', city: '', area: '', phone: '', email: '', description: '' });
  const [state, setState] = useState<FormState>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
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
                {[
                  { name: 'name', label: 'Cafe Name', placeholder: 'e.g. Neon Arena Gaming Lounge', required: true },
                  { name: 'city', label: 'City', placeholder: 'e.g. Mumbai', required: true },
                  { name: 'area', label: 'Area / Locality', placeholder: 'e.g. Andheri West', required: true },
                  { name: 'phone', label: 'Phone Number', placeholder: '+91 98200 00000', required: true },
                  { name: 'email', label: 'Email Address', placeholder: 'owner@yourcafe.com', required: true },
                ].map(({ name, label, placeholder, required }) => (
                  <div key={name}>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">{label}</label>
                    <input
                      name={name}
                      value={(form as Record<string, string>)[name]}
                      onChange={handleChange}
                      required={required}
                      placeholder={placeholder}
                      className="w-full rounded-xl border border-border/60 bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-[oklch(0.45_0.08_265)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.45_0.08_265/0.4)]"
                    />
                  </div>
                ))}
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
