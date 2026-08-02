import { Link } from 'wouter';
import { ArrowRight, Download, GitCommit, Sparkles, Wrench, Zap } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'Changelog — Airavoto Gaming POS';
const DESCRIPTION = 'Release notes and version history for Airavoto Gaming POS.';

const releases = [
  {
    version: 'v1.3.0',
    date: 'July 2026',
    tag: 'Latest',
    tagColor: 'oklch(0.72 0.16 150)',
    summary: 'Analytics overhaul, AI maintenance suggestions and loyalty 2.0.',
    sections: [
      {
        icon: Sparkles,
        label: 'New',
        items: [
          'AI Maintenance module — suggests preventive maintenance based on session hours',
          'Loyalty 2.0: tiered membership levels with configurable point multipliers',
          'Occupancy heatmap in Analytics — visualise peak hours across the week',
          'Bulk seat pricing override for happy-hour or event pricing',
          'Gallery images module for displaying center photos on the dashboard',
        ],
      },
      {
        icon: Zap,
        label: 'Improved',
        items: [
          'Session countdown now shows audio alert at configurable time thresholds',
          'Walk-in queue reordering via drag-and-drop',
          'Food order kitchen display view for F&B stations',
          'Reports PDF now includes an executive summary on page 1',
        ],
      },
      {
        icon: Wrench,
        label: 'Fixed',
        items: [
          'Session timer drift under heavy CPU load on low-spec machines',
          'Booking conflict detection missed same-minute edge case',
          'CSV export encoding issue with non-ASCII customer names',
        ],
      },
    ],
  },
  {
    version: 'v1.2.0',
    date: 'April 2026',
    tag: 'Stable',
    tagColor: 'oklch(0.72 0.14 200)',
    summary: 'Expense categories, quarterly reports and multi-terminal sync improvements.',
    sections: [
      {
        icon: Sparkles,
        label: 'New',
        items: [
          'Custom expense categories with icons',
          'Quarterly financial summary with revenue vs expense chart',
          'Activity log export to CSV',
          'Center info and facilities management module',
          'Games library module for tracking titles per device',
        ],
      },
      {
        icon: Zap,
        label: 'Improved',
        items: [
          'Multi-terminal sync latency reduced from ~2 s to < 500 ms',
          'Booking history now searchable by customer phone number',
          'Inventory low-stock threshold configurable per item',
        ],
      },
      {
        icon: Wrench,
        label: 'Fixed',
        items: [
          'PS5 seat status not updating after manual end-session',
          'Food order total not recalculating when item removed',
        ],
      },
    ],
  },
  {
    version: 'v1.1.0',
    date: 'January 2026',
    tag: 'Stable',
    tagColor: 'oklch(0.72 0.14 200)',
    summary: 'Food & inventory module, role-based access control and booking history.',
    sections: [
      {
        icon: Sparkles,
        label: 'New',
        items: [
          'Food & Inventory module with full item catalog and order management',
          'Role-based access control: Owner, Manager, Staff',
          'Booking history with per-customer timeline',
          'Loyalty members and events tracking',
          'Bcrypt password hashing for all staff accounts',
        ],
      },
      {
        icon: Zap,
        label: 'Improved',
        items: [
          'Dashboard loads 40% faster on first paint',
          'Session management UI reorganised for single-monitor counter setups',
        ],
      },
      {
        icon: Wrench,
        label: 'Fixed',
        items: [
          'Walk-in assignment failing when all seats were occupied',
          'Timer audio not playing on Safari',
        ],
      },
    ],
  },
  {
    version: 'v1.0.0',
    date: 'October 2025',
    tag: 'Initial release',
    tagColor: 'oklch(0.64 0 0)',
    summary: 'First public release — sessions, bookings, basic reporting and multi-device support.',
    sections: [
      {
        icon: Sparkles,
        label: 'Launched',
        items: [
          'Real-time session management for PC, PS5, VR and simulators',
          'Walk-in and advance booking with conflict detection',
          'Basic financial reporting and daily closing',
          'Multi-device type support with configurable pricing',
          'PostgreSQL-backed 16-table operations schema',
          'Express + Drizzle ORM API, React 18 + TanStack frontend',
        ],
      },
    ],
  },
];

export default function Changelog() {
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
          <Eyebrow>Changelog</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            What's new in Airavoto POS.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every release, every fix — tracked here. All updates are free, forever.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="relative space-y-12 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border/60">
            {releases.map((r) => (
              <div key={r.version} className="relative pl-10">
                <span
                  className="absolute left-0 top-1.5 flex size-6 items-center justify-center rounded-full border border-border bg-surface-2"
                  style={{ boxShadow: `0 0 0 3px ${r.tagColor}22` }}
                >
                  <GitCommit className="size-3 text-muted-foreground" />
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl font-bold tracking-tight">{r.version}</span>
                  <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: `${r.tagColor}22`, color: r.tagColor }}>
                    {r.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.summary}</p>

                <div className="mt-5 space-y-4">
                  {r.sections.map(({ icon: Icon, label, items }) => (
                    <div key={label} className="panel p-5">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        <Icon className="size-3.5" />
                        {label}
                      </div>
                      <ul className="mt-3 space-y-2">
                        {items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                            <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 glow-top" />
          <div className="relative">
            <Eyebrow>Always free</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
              Every update ships to you free.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Download the latest version and get every future release at no cost.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-4" /> Download v1.3.0
              </Link>
              <Link
                href="/roadmap"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                See what's next <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
