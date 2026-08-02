import { Link } from 'wouter';
import { Sparkles } from 'lucide-react';

const cols = [
  {
    title: 'Product',
    items: [
      { label: 'Features', to: '/features' },
      { label: 'Download', to: '/download' },
      { label: 'Changelog', to: '/changelog' },
      { label: 'Roadmap', to: '/roadmap' },
    ],
  },
  {
    title: 'Modules',
    items: [
      { label: 'Sessions', to: '/features#sessions' },
      { label: 'Bookings', to: '/features#bookings' },
      { label: 'Food & Inventory', to: '/features#food' },
      { label: 'Expenses', to: '/features#expenses' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'FAQ', to: '/faq' },
      { label: 'Setup guide', to: '/download' },
      { label: 'Changelog', to: '/changelog' },
      { label: 'Roadmap', to: '/roadmap' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Security', to: '/privacy#security' },
      { label: 'License', to: '/terms#license' },
    ],
  },
];

function FooterLink({ label, to }: { label: string; to: string }) {
  // hash-only fragments use <a> so browser handles scroll
  if (to.includes('#') && !to.startsWith('/features')) {
    return (
      <a href={to} className="text-sm text-foreground/80 hover:text-foreground">
        {label}
      </a>
    );
  }
  return (
    <Link href={to} className="text-sm text-foreground/80 hover:text-foreground">
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 md:grid-cols-[1.4fr_2fr]">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4" />
            Airavoto Gaming POS
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            The complete gaming center management system — sessions, bookings, food,
            inventory and finances. Free to download, no hidden charges.
          </p>
          <div className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-border bg-surface p-1.5">
            <input
              type="email"
              placeholder="Get release updates"
              aria-label="Email address"
              className="w-full bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button className="rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
              Subscribe
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <h3 className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                {c.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {c.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink label={item.label} to={item.to} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col gap-2 border-t border-border/60 px-5 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Airavoto Gaming POS. All rights reserved.</p>
        <p>100% free — no hidden charges.</p>
      </div>
    </footer>
  );
}
