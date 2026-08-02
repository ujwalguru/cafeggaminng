import { Link } from 'wouter';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  Download,
  FileText,
  Lock,
  RefreshCw,
  ShieldCheck,
  Timer,
  TrendingUp,
  Users,
  Utensils,
  Wallet,
  Zap,
} from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section, SectionHeading, Stat } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'Features — Airavoto Gaming POS';
const DESCRIPTION =
  'Explore every module in Airavoto Gaming POS — live session tracking, bookings, food & inventory, expenses, analytics and reports. All free.';

const modules = [
  {
    id: 'sessions',
    icon: Timer,
    color: 'oklch(0.72 0.16 150)',
    label: 'Sessions',
    title: 'Real-time Session Management',
    description:
      'Track every seat in real time — PC, PS5, Xbox, VR rigs, racing simulators and any custom type you configure. Visual and audio countdown timers keep your floor running on time.',
    bullets: [
      'Per-seat countdown with audio alert before expiry',
      'Pause / resume sessions mid-game',
      'Auto status updates: Active → Expiring → Expired',
      'Bulk session actions for party bookings',
      'Session history with revenue breakdown',
    ],
    stats: [{ v: '< 1s', l: 'Status refresh latency' }, { v: '∞', l: 'Seats supported' }, { v: '6+', l: 'Device types' }],
  },
  {
    id: 'bookings',
    icon: BookOpen,
    color: 'oklch(0.72 0.16 280)',
    label: 'Bookings',
    title: 'Streamlined Booking Management',
    description:
      'Handle walk-ins and advance reservations from one unified view. Conflict detection prevents double-bookings and instant seat allocation keeps queues moving.',
    bullets: [
      'Walk-in and advance reservation in one flow',
      'Real-time conflict detection',
      'Bulk party bookings with seat allocation',
      'Full customer history and loyalty lookup',
      'WhatsApp / phone number capture',
    ],
    stats: [{ v: '0', l: 'Double-booking risk' }, { v: '24h', l: 'Advance booking window' }, { v: '1-tap', l: 'Walk-in check-in' }],
  },
  {
    id: 'food',
    icon: Utensils,
    color: 'oklch(0.72 0.18 50)',
    label: 'Food & Inventory',
    title: 'Integrated Food & Inventory',
    description:
      'Attach food orders directly to bookings and track stock in real time. From a cold drink to a full meal, every item is accounted for and priced correctly.',
    bullets: [
      'Item catalog with configurable pricing',
      'Orders attached to active bookings',
      'Real-time quantity tracking and low-stock alerts',
      'F&B revenue analytics separate from session revenue',
      'Category-based menu organisation',
    ],
    stats: [{ v: '100%', l: 'Order accuracy' }, { v: 'Live', l: 'Stock levels' }, { v: '∞', l: 'Menu items' }],
  },
  {
    id: 'expenses',
    icon: Wallet,
    color: 'oklch(0.72 0.16 20)',
    label: 'Expenses',
    title: 'Comprehensive Financial Tracking',
    description:
      'Log every cost — electricity, rent, staff, maintenance — and see where money is going. Monthly and quarterly summaries make accounting straightforward.',
    bullets: [
      'Custom expense categories',
      'Monthly and quarterly summaries',
      'Revenue vs expense comparison',
      'CSV and PDF export for your accountant',
      'Notes and receipt attachments per entry',
    ],
    stats: [{ v: 'CSV', l: '& PDF export' }, { v: 'Monthly', l: '& quarterly reports' }, { v: '∞', l: 'Categories' }],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    color: 'oklch(0.72 0.14 200)',
    label: 'Analytics',
    title: 'Data-Driven Center Insights',
    description:
      "Occupancy trends, peak hours, top-spending customers and F&B bestsellers — all in one analytics dashboard. Know what's working and where to improve.",
    bullets: [
      'Hourly and daily occupancy heatmaps',
      'Revenue by device type and time period',
      'Top customers by spend and visit frequency',
      'F&B bestsellers and slow-movers',
      'Session length distribution charts',
    ],
    stats: [{ v: 'Live', l: 'Dashboard updates' }, { v: '90d', l: 'Historical data view' }, { v: '10+', l: 'Chart types' }],
  },
  {
    id: 'reports',
    icon: FileText,
    color: 'oklch(0.72 0.12 290)',
    label: 'Reports',
    title: 'One-Click Closing Reports',
    description:
      'End every shift with a complete financial summary — sessions billed, food sold, expenses logged and net revenue — exported in seconds.',
    bullets: [
      'Daily shift closing summary',
      'Per-seat billing history',
      'Loyalty program event log',
      'Activity log for every staff action',
      'Scheduled weekly email reports (coming soon)',
    ],
    stats: [{ v: '1-click', l: 'Daily close report' }, { v: 'PDF', l: '& CSV export' }, { v: 'Full', l: 'Audit trail' }],
  },
];

const trust = [
  { icon: Lock, title: 'Role-based access control', body: 'Owner, manager and staff roles with granular permission levels.' },
  { icon: ShieldCheck, title: 'Bcrypt password hashing', body: 'Industry-standard hashing protects every staff account.' },
  { icon: RefreshCw, title: 'Live data sync', body: 'All screens stay in sync — no manual refresh needed.' },
  { icon: Zap, title: 'Offline-friendly', body: 'Core operations continue if the internet drops; data syncs on reconnect.' },
  { icon: Users, title: 'Multi-staff support', body: 'Unlimited staff accounts with separate login sessions.' },
  { icon: TrendingUp, title: 'Free lifetime updates', body: 'Every new feature and fix ships to you at no extra cost, forever.' },
];

function ModuleSection({ mod, reverse }: { mod: (typeof modules)[0]; reverse?: boolean }) {
  const Icon = mod.icon;
  return (
    <Section id={mod.id}>
      <div className={`grid items-center gap-12 lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-last' : ''}`}>
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl border border-border" style={{ background: `${mod.color}22` }}>
              <Icon className="size-4" style={{ color: mod.color }} />
            </span>
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{mod.label}</span>
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{mod.title}</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{mod.description}</p>
          <ul className="mt-8 space-y-3">
            {mod.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-foreground/50" />
                <span className="text-foreground/85">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {mod.stats.map((s) => (
            <div key={s.l} className="panel col-span-1 flex flex-col items-center justify-center p-6 text-center">
              <div className="text-3xl font-semibold tracking-tight" style={{ color: mod.color }}>
                {s.v}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.l}</p>
            </div>
          ))}
          <div className="panel col-span-3 p-5">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">Included in free download</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {mod.bullets.slice(0, 3).map((b) => (
                <span key={b} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-[11px] text-foreground/80">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function Features() {
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
          <Eyebrow>Features</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            Everything your gaming center needs.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Six fully integrated modules — sessions, bookings, food, inventory, expenses and
            analytics — all free, all unlocked from day one.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {modules.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                className="flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <m.icon className="size-3.5" style={{ color: m.color }} />
                {m.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-4 sm:grid-cols-4">
          <Stat value="6" label="Fully integrated modules" />
          <Stat value="16" label="Database tables covering every operation" />
          <Stat value="₹0" label="Total cost — every feature unlocked" />
          <Stat value="∞" label="Seats, bookings and staff accounts" />
        </div>
      </Section>

      {modules.map((mod, i) => (
        <ModuleSection key={mod.id} mod={mod} reverse={i % 2 !== 0} />
      ))}

      <Section>
        <SectionHeading
          eyebrow="Built right"
          title="Security and reliability baked in"
          subtitle="Enterprise-grade protection without enterprise pricing — every security feature ships free."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map(({ icon: Icon, title, body }) => (
            <div key={title} className="panel p-6">
              <Icon className="size-5 text-foreground/60" />
              <h3 className="mt-4 text-sm font-medium tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 glow-top" />
          <div className="relative">
            <Eyebrow>Get started free</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold tracking-tight text-gradient sm:text-5xl">
              All features. Zero cost.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Download the complete Airavoto Gaming POS — every module above, unlocked forever.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-4" /> Download free
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:text-foreground"
              >
                Back to home <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
