import { Link } from 'wouter';
import { useState } from 'react';
import { ChevronDown, Download } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow, Section, SectionHeading } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

const TITLE = 'FAQ — Airavoto Gaming POS';
const DESCRIPTION = 'Frequently asked questions about Airavoto Gaming POS — setup, pricing, features, security and more.';

const categories = [
  {
    label: 'General',
    items: [
      {
        q: 'Is Airavoto Gaming POS really free?',
        a: 'Yes. The complete software is free to download with every module unlocked — no trial period, no hidden charges and no locked features. You download it once and use it forever.',
      },
      {
        q: 'Who is this software for?',
        a: 'Airavoto Gaming POS is built for gaming centers of any size — from a 5-seat cafe to a multi-room esports arena with PC, PS5, Xbox, VR rigs, racing simulators and snooker tables.',
      },
      {
        q: 'Do I need technical knowledge to set it up?',
        a: 'Basic familiarity with installing software on Windows or Linux is enough. The setup guide walks you through every step, and most center owners are up and running the same day.',
      },
      {
        q: 'What languages does the interface support?',
        a: 'The current release is in English. Regional language support is on the roadmap for a future update.',
      },
    ],
  },
  {
    label: 'Setup & Installation',
    items: [
      {
        q: 'How long does setup take?',
        a: 'Most gaming centers download, configure their seats and pricing, and start billing sessions on the same day. The guided setup takes around 30–60 minutes for a typical center.',
      },
      {
        q: 'What are the system requirements?',
        a: 'Windows 10/11, macOS 12+, or Ubuntu 20.04+, with Node.js v18+, PostgreSQL v14+, 2 GB RAM and 500 MB free disk space. A basic counter PC is more than sufficient.',
      },
      {
        q: 'Can I run it on multiple counter terminals?',
        a: "Yes. Start the server on one machine and point every other terminal's browser at that machine's local IP address. All seats, timers and orders stay in sync in real time across every screen.",
      },
      {
        q: 'Do I need an internet connection to run it?',
        a: 'No. Once installed, the app runs entirely on your local network. Internet is only needed for the initial download and dependency install (npm install).',
      },
    ],
  },
  {
    label: 'Features & Modules',
    items: [
      {
        q: 'Which device types can I manage?',
        a: "PC, PS5, Xbox and other consoles, VR rigs, racing simulators and any custom seat type you configure in the device settings. There's no cap on seat count or device type.",
      },
      {
        q: 'Can I attach food orders to a gaming session?',
        a: 'Yes. The integrated Food & Inventory module lets staff attach menu items directly to an active booking. Stock levels update in real time and F&B revenue is tracked separately from session revenue.',
      },
      {
        q: 'Does it support advance bookings?',
        a: "Yes. You can take walk-in and advance reservations from the same booking screen. Conflict detection prevents double-bookings and the customer's history is a click away.",
      },
      {
        q: 'Can I export financial reports?',
        a: 'Yes. Daily, monthly and quarterly summaries can be exported as CSV or PDF directly from the Reports module — ready to hand to your accountant.',
      },
    ],
  },
  {
    label: 'Security & Data',
    items: [
      {
        q: 'Where is my data stored?',
        a: 'All data stays in your own PostgreSQL database on your machine or server. Nothing is sent to any external server or cloud. You have full ownership and control.',
      },
      {
        q: 'How are staff accounts protected?',
        a: 'Staff passwords are hashed with bcrypt. Role-based access control (owner, manager, staff) limits what each login can see or change. Every action is logged in the activity log.',
      },
      {
        q: 'Is there a backup system?',
        a: 'The software uses standard PostgreSQL, so you can use any PostgreSQL backup tool (pg_dump, pgBackRest, etc.) to schedule automated backups on your own schedule.',
      },
      {
        q: 'Can I restrict what staff can access?',
        a: 'Yes. Role-based access control lets you define exactly what each role can view and modify — from billing sessions all the way to financial reports and settings.',
      },
    ],
  },
  {
    label: 'Updates & Support',
    items: [
      {
        q: 'How do I update to a newer version?',
        a: 'Download the latest release ZIP, replace your application files (keep your .env file), run npm install and npm run db:migrate. Your data is preserved in PostgreSQL across updates.',
      },
      {
        q: 'Are updates free?',
        a: 'Yes. Free lifetime updates. New features, bug fixes and new modules are released at no cost and always will be.',
      },
      {
        q: 'Where do I get support?',
        a: 'Community support is available via the GitHub Discussions and Issues board. Feature requests and bug reports are tracked publicly so you can follow their progress.',
      },
    ],
  },
];

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

export default function Faq() {
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
          <Eyebrow>FAQ</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-3xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            Common questions, answered.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Everything you need to know about Airavoto Gaming POS — setup, features, pricing and more.
          </p>
        </div>
      </section>

      {categories.map((cat) => (
        <Section key={cat.label}>
          <SectionHeading title={cat.label} />
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {cat.items.map((f) => (
              <FaqItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </Section>
      ))}

      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface px-6 py-16 text-center">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 glow-top" />
          <div className="relative">
            <Eyebrow>Still have questions?</Eyebrow>
            <h2 className="mx-auto mt-5 max-w-xl text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
              Download and try it yourself — it's free.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              No account, no payment, no risk. Download the full software and explore every
              feature in your own environment.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/download"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Download className="size-4" /> Download free
              </Link>
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
