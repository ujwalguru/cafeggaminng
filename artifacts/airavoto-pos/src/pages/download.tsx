import { Link } from 'wouter';
import { Check, ChevronDown, Download, HardDrive, Monitor, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section, SectionHeading } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'Download — Airavoto Gaming POS';
const DESCRIPTION =
  'Download Airavoto Gaming POS free — complete gaming center software with every module unlocked. Self-host on your own PC or server.';

const DOWNLOAD_URL =
  'https://github.com/airavotogaming-arch/image-to-web/releases/download/v1.0.0/Airavoto.Gaming.POS_1.0.0_x64-setup.exe';

const steps = [
  {
    n: '01',
    icon: Download,
    title: 'Install',
    body: 'Download the release ZIP and install PostgreSQL (v14+). Create a database named airavoto_pos.',
  },
  {
    n: '02',
    icon: Sparkles,
    title: 'Fill the form',
    body: 'Enter your gaming center details below. Takes 30 seconds.',
  },
  {
    n: '03',
    icon: HardDrive,
    title: 'Ready to start',
    body: 'Run the app and open it in your browser. Your center is configured and ready to go.',
  },
];

const sysReqs = [
  { label: 'OS', value: 'Windows 10/11 · macOS 12+ · Ubuntu 20.04+' },
  { label: 'Node.js', value: 'v18 or later' },
  { label: 'PostgreSQL', value: 'v14 or later' },
  { label: 'RAM', value: '2 GB minimum (4 GB recommended)' },
  { label: 'Storage', value: '500 MB free space' },
  { label: 'Network', value: 'Local LAN for multi-terminal setups' },
];

const faqs = [
  {
    q: 'Is there really no cost?',
    a: 'Yes. Airavoto Gaming POS is 100% free — every module is unlocked, no trial period, no seat limits and no hidden charges. Download it, self-host it and use it forever.',
  },
  {
    q: 'Do I need internet to run it?',
    a: "Mostly no — the POS runs on your local machine or server without internet. However, an active internet connection is required to sync live seat availability to the Airavoto Gaming web platform in real time. Without it, the live availability feature will be unavailable to your customers online.",
  },
  {
    q: 'Can I run it on multiple counters?',
    a: "Yes. Start the server on one machine and point every other counter's browser to that machine's local IP address. All seats stay in sync via the live data layer.",
  },
  {
    q: 'What database does it use?',
    a: 'Airavoto Gaming POS uses PostgreSQL. The included Drizzle ORM migrations create all 16 tables automatically — no manual SQL needed.',
  },
  {
    q: 'How do I update to a newer version?',
    a: 'Download the latest release, replace your files (keep your .env), run npm install and npm run db:migrate. Your data is preserved in PostgreSQL.',
  },
  {
    q: 'Is my data safe?',
    a: 'All data stays on your machine — nothing is sent to any external server. Staff accounts use bcrypt-hashed passwords and role-based access control.',
  },
];

function SetupForm() {
  const [form, setForm] = useState({ centerName: '', ownerName: '', city: '', seats: '' });
  const [done, setDone] = useState(false);

  const field =
    'w-full rounded-xl border border-border bg-surface-2 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/60';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto mt-14 max-w-2xl">
        <div className="panel p-8 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl border border-border bg-surface-2">
            <Check className="size-7 text-foreground/70" />
          </span>
          <h3 className="mt-5 text-xl font-semibold tracking-tight">You're ready to start!</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{form.centerName}</span> is all set. Run the app and open it in your browser — your center details will be waiting inside.
          </p>
          <div className="mx-auto mt-6 max-w-xs rounded-xl border border-border bg-[oklch(0.08_0_0)] px-5 py-3.5 font-mono text-sm text-foreground/80">
            npm run start
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Then open <span className="text-foreground/70">localhost:3000</span>
          </p>
          <button onClick={() => setDone(false)} className="mt-5 text-xs text-muted-foreground underline hover:text-foreground">
            ← Edit details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-14 max-w-2xl">
      <div className="panel p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Gaming Center Name</label>
              <input
                className={field}
                placeholder="e.g. Arena Pro Gaming"
                value={form.centerName}
                onChange={(e) => setForm({ ...form, centerName: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Owner Name</label>
              <input
                className={field}
                placeholder="e.g. Rahul Sharma"
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">City</label>
              <input
                className={field}
                placeholder="e.g. Mumbai"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Number of Seats</label>
              <input
                className={field}
                type="number"
                placeholder="e.g. 20"
                min="1"
                value={form.seats}
                onChange={(e) => setForm({ ...form, seats: e.target.value })}
                required
              />
            </div>
          </div>
          <button type="submit" className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Ready to start →
          </button>
        </form>
      </div>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-surface">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium">
        {q}
        <ChevronDown className={`ml-4 size-4 shrink-0 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <p className="border-t border-border/60 px-5 py-4 text-sm leading-relaxed text-muted-foreground">{a}</p>}
    </div>
  );
}

export default function DownloadPage() {
  useDocumentMeta({ title: TITLE, description: DESCRIPTION });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="relative overflow-hidden pb-16 pt-36 sm:pt-44">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 45% at 50% 0%, oklch(0.75 0.10 290/0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-5 text-center">
          <Eyebrow>Download</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            Free forever. No hidden charges.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Download the complete Airavoto Gaming POS — every module unlocked, no trial period, no seat limits.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-lg">
          <div className="panel flex flex-col p-10 shadow-[var(--shadow-glow)]">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface-2">
                <Download className="size-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">Free Download</div>
                <div className="text-[11px] text-muted-foreground">Latest stable release</div>
              </div>
              <span className="ml-auto rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-muted-foreground">
                Complete software
              </span>
            </div>
            <div className="mt-6 text-5xl font-bold tracking-tight">₹0</div>
            <p className="mt-1 text-xs text-muted-foreground">No hidden charges, ever</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                'All 6 modules fully unlocked',
                'Unlimited seats & devices',
                'Sessions, bookings, food, inventory',
                'Expenses, reports & loyalty',
                'Free lifetime updates',
                'Full PostgreSQL database included',
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/85">
                  <Check className="size-4 shrink-0 text-foreground/50" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={DOWNLOAD_URL}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Download className="size-4" /> Download free
            </a>
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5" /> No payment required · No account needed
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          {['Free lifetime updates', 'No subscription', 'No hidden charges', 'All features unlocked', 'Self-hosted'].map((i) => (
            <span key={i} className="inline-flex items-center gap-2">
              <Check className="size-3.5" /> {i}
            </span>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Quick setup"
          title="Up and running in minutes"
          subtitle="Most gaming centers download, configure their seats and start billing sessions the same day."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {steps.map(({ n, icon: Icon, title, body }) => (
            <div key={n} className="panel p-6">
              <div className="flex items-start justify-between">
                <span className="flex size-9 items-center justify-center rounded-xl border border-border bg-surface-2">
                  <Icon className="size-4 text-foreground/70" />
                </span>
                <span className="font-mono text-3xl font-bold text-foreground/10">{n}</span>
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <SetupForm />
      </Section>

      <Section>
        <SectionHeading
          eyebrow="System requirements"
          title="Runs on almost anything"
          subtitle="A basic counter PC is all you need — no expensive hardware required."
        />
        <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-2xl border border-border">
          <div className="flex items-center gap-3 border-b border-border bg-surface px-5 py-3.5">
            <Monitor className="size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Minimum requirements</span>
          </div>
          {sysReqs.map(({ label, value }, i) => (
            <div key={label} className={`flex items-center justify-between px-5 py-3.5 text-sm ${i !== sysReqs.length - 1 ? 'border-b border-border/60' : ''}`}>
              <span className="w-28 text-muted-foreground">{label}</span>
              <span className="text-foreground/85">{value}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 glow-top" />
          <div className="relative">
            <Eyebrow>Ready?</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold tracking-tight text-gradient sm:text-5xl">
              Start managing your center today.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Download Airavoto Gaming POS free — no payment, no trial limits, no hidden charges.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-4" /> Download free
              </a>
              <Link
                href="/features"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                See all features
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
