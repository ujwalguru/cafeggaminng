import { Home, Search, Trophy, UserRound } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const NAV_ITEMS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Explore', to: '/cafes', icon: Search },
  { label: 'Tournaments', to: '/tournaments', icon: Trophy },
  { label: 'Account', to: '/signup', icon: UserRound },
];

export function MobileBottomNav() {
  const [pathname] = useLocation();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="relative mx-auto grid max-w-md grid-cols-4 gap-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[oklch(0.11_0_0/0.88)] p-1.5 shadow-[0_-12px_45px_oklch(0_0_0/0.45),0_8px_30px_oklch(0_0_0/0.25)] backdrop-blur-2xl">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
          const active = to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              href={to}
              className={`group relative flex min-h-[3.35rem] flex-col items-center justify-center gap-1 rounded-[1.15rem] text-[10px] font-medium transition-all duration-300 active:scale-90 ${
                active
                  ? 'bg-foreground text-background shadow-[0_4px_18px_oklch(1_0_0/0.16)]'
                  : 'text-muted-foreground hover:bg-white/[0.07] hover:text-foreground'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {active && <span className="absolute -top-1.5 h-1 w-7 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />}
              <Icon className={`size-[18px] transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:-translate-y-0.5'}`} strokeWidth={active ? 2.5 : 1.8} />
              <span className={label === 'Tournaments' ? 'text-[9px] sm:text-[10px]' : undefined}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
