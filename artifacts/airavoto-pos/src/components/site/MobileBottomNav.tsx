import { Home, ListPlus, Search, UserRound } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const NAV_ITEMS = [
  { label: 'Home', to: '/', icon: Home },
  { label: 'Explore', to: '/cafes', icon: Search },
  { label: 'List', to: '/list-cafe', icon: ListPlus },
  { label: 'Account', to: '/signup', icon: UserRound },
];

export function MobileBottomNav() {
  const [pathname] = useLocation();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border/60 bg-[oklch(0.09_0_0/0.96)] px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_30px_oklch(0_0_0/0.3)] backdrop-blur-2xl lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
          const active = to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`);
          return (
            <Link
              key={to}
              href={to}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium transition-colors active:scale-[0.97] ${
                active
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-surface-2 hover:text-foreground'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              <Icon className="size-[18px]" strokeWidth={active ? 2.4 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
