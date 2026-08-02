import { Clock, Gamepad2, ShoppingBag, Timer, TrendingUp, Users } from 'lucide-react';

function Card({
  className,
  style,
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`absolute rounded-2xl border border-border/80 bg-[oklch(0.17_0_0/0.85)] p-4 backdrop-blur-sm shadow-[var(--shadow-soft)] ${className ?? ''}`}
      style={style}
    >
      {children}
    </div>
  );
}

const sessions = [
  { seat: 'PC-1', customer: 'Arjun', time: '1:24 left', status: 'Active' },
  { seat: 'PS5-2', customer: 'Sneha', time: '0:47 left', status: 'Expiring' },
  { seat: 'PC-4', customer: 'Rahul', time: '2:10 left', status: 'Active' },
];

export function HeroFloaters() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden select-none lg:block"
      style={{
        maskImage:
          'radial-gradient(70% 60% at 50% 45%, transparent 30%, black 75%), linear-gradient(to bottom, black 60%, transparent 95%)',
        maskComposite: 'intersect',
        WebkitMaskImage:
          'radial-gradient(70% 60% at 50% 45%, transparent 30%, black 75%), linear-gradient(to bottom, black 60%, transparent 95%)',
        WebkitMaskComposite: 'source-in',
      }}
    >
      {/* left top — active session */}
      <Card
        className="left-[4%] top-[8%] w-64 opacity-70 animate-[float_5s_ease-in-out_infinite]"
        style={{ transform: 'perspective(1200px) rotateY(14deg) rotateZ(-3deg)' }}
      >
        <div className="flex items-center gap-2 text-xs font-medium">
          <Timer className="size-3.5 text-[oklch(0.72_0.16_150)]" /> Live Session
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2">
          <div>
            <div className="text-sm font-semibold">PC-3</div>
            <div className="text-[10px] text-muted-foreground">Vikram · Walk-in</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono font-semibold text-[oklch(0.72_0.16_150)]">48:12</div>
            <div className="text-[10px] text-muted-foreground">remaining</div>
          </div>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-[62%] rounded-full bg-[oklch(0.72_0.16_150)]" />
        </div>
      </Card>

      {/* left middle — walk-in queue */}
      <Card
        className="left-[-2%] top-[36%] w-72 opacity-60 animate-[float_6s_ease-in-out_1s_infinite]"
        style={{ transform: 'perspective(1200px) rotateY(16deg) rotateZ(-2deg)' }}
      >
        <div className="flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-1.5 font-medium">
            <Users className="size-3" /> Walk-in Queue
          </span>
          <span className="rounded-full bg-[oklch(0.55_0.18_20/0.25)] px-2 py-0.5 text-[10px] text-[oklch(0.78_0.15_20)]">
            4 waiting
          </span>
        </div>
        {[
          { name: 'Anjali S.', seats: '2 × PC', wait: '2 min' },
          { name: 'Rohan K.', seats: '1 × PS5', wait: '5 min' },
          { name: 'Party of 4', seats: '4 × PC', wait: '8 min' },
        ].map((r) => (
          <div
            key={r.name}
            className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-[11px]"
          >
            <div>
              <div className="font-medium text-foreground/85">{r.name}</div>
              <div className="text-muted-foreground">{r.seats}</div>
            </div>
            <span className="text-muted-foreground">{r.wait}</span>
          </div>
        ))}
      </Card>

      {/* left bottom — revenue summary */}
      <Card
        className="bottom-[2%] left-[2%] w-72 opacity-55 animate-[float_7s_ease-in-out_2s_infinite]"
        style={{ transform: 'perspective(1200px) rotateY(14deg) rotateZ(-6deg)' }}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <TrendingUp className="size-3.5 text-[oklch(0.72_0.16_150)]" /> Today's Revenue
          </span>
          <span className="rounded-md border border-border px-2 py-1 text-[10px] text-muted-foreground">
            Live
          </span>
        </div>
        <div className="mt-4 text-3xl font-bold tracking-tight">₹4,820</div>
        <div className="mt-1 text-[10px] text-muted-foreground">↑ 18% vs yesterday</div>
        <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px]">
          {[
            { label: 'Sessions', val: '₹3,200' },
            { label: 'Food', val: '₹980' },
            { label: 'Other', val: '₹640' },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-surface-2 px-2 py-2">
              <div className="font-semibold text-foreground/90">{s.val}</div>
              <div className="text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* right top — seat occupancy */}
      <Card
        className="right-[3%] top-[6%] w-56 opacity-70 animate-[float_5.5s_ease-in-out_0.5s_infinite]"
        style={{ transform: 'perspective(1200px) rotateY(-14deg) rotateZ(3deg)' }}
      >
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <Gamepad2 className="size-3.5" /> Seat Occupancy
        </div>
        <div className="mt-3 space-y-2.5">
          {[
            { label: 'PC', filled: 8, total: 10 },
            { label: 'PS5', filled: 4, total: 5 },
            { label: 'VR', filled: 2, total: 3 },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex justify-between text-[11px]">
                <span className="text-foreground/80">{s.label}</span>
                <span className="text-muted-foreground">
                  {s.filled}/{s.total}
                </span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: s.total }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i < s.filled ? 'bg-[oklch(0.72_0.16_150)]' : 'bg-surface-2'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* right middle — session timers */}
      <Card
        className="right-[2%] top-[40%] w-64 opacity-65 animate-[float_6.5s_ease-in-out_1.5s_infinite]"
        style={{ transform: 'perspective(1200px) rotateY(-16deg) rotateZ(6deg)' }}
      >
        <div className="flex items-center gap-2 text-xs font-medium">
          <Clock className="size-3.5 text-[oklch(0.7_0.18_280)]" /> Active Sessions
        </div>
        <div className="mt-3 space-y-2">
          {sessions.map((s) => (
            <div key={s.seat} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2 text-[11px]">
              <div>
                <span className="font-semibold text-foreground/90">{s.seat}</span>
                <span className="ml-1.5 text-muted-foreground">{s.customer}</span>
              </div>
              <span
                className={`font-mono font-medium ${s.status === 'Expiring' ? 'text-[oklch(0.72_0.16_20)]' : 'text-[oklch(0.72_0.16_150)]'}`}
              >
                {s.time}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* right bottom — food orders */}
      <Card
        className="bottom-[3%] right-[1%] w-72 opacity-55 animate-[float_7.5s_ease-in-out_2.5s_infinite]"
        style={{ transform: 'perspective(1200px) rotateY(-12deg) rotateZ(4deg)' }}
      >
        <div className="flex items-center gap-2 text-xs font-medium">
          <ShoppingBag className="size-3.5 text-[oklch(0.72_0.18_50)]" /> Food Orders
          <span className="ml-auto rounded-md bg-[oklch(0.35_0.1_150)] px-1.5 py-0.5 text-[9px] text-[oklch(0.85_0.15_150)]">
            3 pending
          </span>
        </div>
        <div className="mt-3 space-y-2 text-[11px]">
          {[
            { item: 'Chicken Burger ×2', seat: 'PC-1', price: '₹280' },
            { item: 'Red Bull ×1', seat: 'PS5-3', price: '₹120' },
            { item: 'Nachos ×1', seat: 'PC-7', price: '₹90' },
          ].map((o) => (
            <div key={o.item} className="flex items-center justify-between border-t border-border/60 pt-2">
              <div>
                <div className="font-medium text-foreground/85">{o.item}</div>
                <div className="text-muted-foreground">{o.seat}</div>
              </div>
              <span className="text-foreground/80">{o.price}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
