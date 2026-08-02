import { Link } from 'wouter';
import { ArrowLeft, Gamepad2 } from 'lucide-react';
import { Navbar } from '@/components/site/Navbar';
import { Footer } from '@/components/site/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(60% 45% at 50% 30%, oklch(0.75 0.10 290/0.18), transparent 70%)' }}
        />
        <div className="relative mx-auto w-full max-w-lg px-5 text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-border bg-surface">
            <Gamepad2 className="size-6 text-foreground/70" />
          </span>
          <h1 className="mt-8 text-6xl font-bold tracking-tight sm:text-7xl">404</h1>
          <p className="mt-4 text-lg font-medium text-foreground/90">This seat isn't taken.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
