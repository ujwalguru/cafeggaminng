import { Link } from 'wouter';
import { ArrowRight, CalendarDays, Trophy, Users } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';
import { Eyebrow } from '@/components/site/primitives';
import { useDocumentMeta } from '@/hooks/use-document-meta';

export default function Tournaments() {
  useDocumentMeta({
    title: 'Tournaments — Airavoto Cafe',
    description: 'Airavoto Cafe tournaments are coming soon. Watch this space for gaming competitions and events near you.',
  });

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative flex min-h-[calc(100vh-5rem)] items-center overflow-hidden px-5 pb-20 pt-36 sm:pt-40">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(55% 45% at 50% 15%, oklch(0.75 0.10 290 / 0.2), transparent 72%)' }}
        />
        <div className="relative mx-auto w-full max-w-3xl text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-3xl border border-border/70 bg-surface shadow-[0_12px_40px_oklch(0_0_0/0.3)]">
            <Trophy className="size-10 text-primary" />
          </div>
          <Eyebrow>Tournaments</Eyebrow>
          <h1 className="mx-auto mt-7 max-w-2xl text-balance text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-7xl">
            The competition starts soon.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            We’re building a better way to discover and join gaming tournaments at cafes near you. Check back soon for brackets, events and prizes.
          </p>
          <div className="mx-auto mt-10 grid max-w-xl gap-3 text-left sm:grid-cols-3">
            <div className="panel p-4"><CalendarDays className="size-5 text-primary" /><p className="mt-3 text-sm font-medium">Upcoming events</p><p className="mt-1 text-xs text-muted-foreground">Find competitions near you.</p></div>
            <div className="panel p-4"><Users className="size-5 text-primary" /><p className="mt-3 text-sm font-medium">Play together</p><p className="mt-1 text-xs text-muted-foreground">Meet local players.</p></div>
            <div className="panel p-4"><Trophy className="size-5 text-primary" /><p className="mt-3 text-sm font-medium">Win prizes</p><p className="mt-1 text-xs text-muted-foreground">Compete for glory.</p></div>
          </div>
          <Link href="/cafes" className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90">
            Explore cafes <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
