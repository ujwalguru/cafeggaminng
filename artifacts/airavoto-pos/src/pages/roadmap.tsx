import { Link } from 'wouter';
import { Calendar, Check, Clock, Download, Rocket, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section, SectionHeading } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'Roadmap — Airavoto Gaming POS';
const DESCRIPTION = "See what's coming next in Airavoto Gaming POS — planned features, improvements and future modules.";

const shipped = [
  'Real-time session management across all device types',
  'Walk-in and advance bookings with conflict detection',
  'Food & Inventory module with live stock tracking',
  'Role-based access control (Owner / Manager / Staff)',
  'Expense categorisation and monthly/quarterly summaries',
  'CSV and PDF export for all reports',
  'Loyalty members and events tracking',
  'AI Maintenance suggestion module',
  'Occupancy heatmap and hourly analytics',
  'Multi-terminal sync via local network',
];

const quarters = [
  {
    label: 'Q3 2026',
    status: 'In progress',
    statusColor: 'oklch(0.72 0.16 150)',
    items: [
      { title: 'Dark / light theme toggle', desc: 'Let staff switch between dark and light UI per terminal preference.' },
      { title: 'WhatsApp booking notifications', desc: 'Auto-send confirmation and reminder messages to customers via WhatsApp Business API.' },
      { title: 'Scheduled weekly email reports', desc: "Automatically email the weekly revenue summary to the owner's inbox every Monday." },
      { title: 'Mobile-responsive staff view', desc: 'A lightweight mobile view so staff can check seat status from their phone on the floor.' },
    ],
  },
  {
    label: 'Q4 2026',
    status: 'Planned',
    statusColor: 'oklch(0.72 0.14 200)',
    items: [
      { title: 'Online pre-booking portal', desc: 'A customer-facing booking page where players can reserve seats and pay in advance.' },
      { title: 'UPI / card payment integration', desc: 'Accept digital payments directly from the POS billing screen.' },
      { title: 'Multi-branch support', desc: 'Manage multiple gaming center locations from a single owner dashboard.' },
      { title: 'Regional language support', desc: 'Hindi, Tamil, Telugu and Malayalam interface options for counter staff.' },
    ],
  },
  {
    label: 'Q1 2027',
    status: 'Planned',
    statusColor: 'oklch(0.72 0.14 200)',
    items: [
      { title: 'Tournament mode', desc: 'Built-in bracket management for in-store tournaments with automated bracket progression.' },
      { title: 'Customer mobile app', desc: 'iOS and Android app for customers to view their session history, loyalty points and book seats.' },
      { title: 'Inventory supplier management', desc: 'Track suppliers, purchase orders and cost-per-item for F&B inventory.' },
      { title: 'Advanced loyalty tiers', desc: 'Configurable VIP tiers with exclusive perks, priority booking and custom discounts.' },
    ],
  },
  {
    label: 'Future',
    status: 'Considering',
    statusColor: 'oklch(0.64 0 0)',
    items: [
      { title: 'Cloud sync (optional)', desc: 'Opt-in encrypted cloud backup so your data is safe even if the server machine fails.' },
      { title: 'Franchise management', desc: 'Centralised franchise dashboard with per-center performance benchmarking.' },
      { title: 'Hardware integrations', desc: 'Direct integrations with receipt printers, barcode scanners and turnstile gates.' },
      { title: 'AI revenue forecasting', desc: 'Predict peak hours and optimal pricing windows based on your historical data.' },
    ],
  },
];

export default function Roadmap() {
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
          <Eyebrow>Roadmap</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            What's coming next.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            A transparent look at the features we're building, planning and considering. All updates ship free.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Already shipped" title="What's in the current release" subtitle="Every feature below is available in the free download today." />
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="panel p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Check className="size-3.5 text-[oklch(0.72_0.16_150)]" /> v1.3.0 — Live now
            </div>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {shipped.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                  <Check className="mt-0.5 size-4 shrink-0 text-[oklch(0.72_0.16_150)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Upcoming" title="What we're building" />
        <div className="mx-auto mt-12 max-w-4xl space-y-6">
          {quarters.map((q) => (
            <div key={q.label} className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
                <div className="flex items-center gap-2.5">
                  {q.status === 'In progress' ? (
                    <Rocket className="size-4" style={{ color: q.statusColor }} />
                  ) : q.status === 'Planned' ? (
                    <Calendar className="size-4" style={{ color: q.statusColor }} />
                  ) : (
                    <Clock className="size-4" style={{ color: q.statusColor }} />
                  )}
                  <span className="text-sm font-semibold">{q.label}</span>
                </div>
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-medium" style={{ background: `${q.statusColor}22`, color: q.statusColor }}>
                  {q.status}
                </span>
              </div>
              <div className="grid gap-px bg-border/40 sm:grid-cols-2">
                {q.items.map((item) => (
                  <div key={item.title} className="bg-surface p-5">
                    <div className="flex items-start gap-2">
                      <Sparkles className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium text-foreground/90">{item.title}</div>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 glow-top" />
          <div className="relative">
            <Eyebrow>Use it today</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
              Don't wait — download the current release free.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Every feature on this roadmap will ship as a free update. Download now and get it all as it arrives.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-4" /> Download free
              </Link>
              <Link
                href="/changelog"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface"
              >
                View changelog
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
