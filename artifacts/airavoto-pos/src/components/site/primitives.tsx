import { type ReactNode, useEffect, useRef } from 'react';

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
      <span className="size-1.5 rounded-full bg-foreground/70" />
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-2xl text-center ${className}`}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-gradient sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="panel p-6">
      <div className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {value}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{label}</p>
    </div>
  );
}

export function Section({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`reveal border-t border-border/60 py-20 sm:py-28 ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5">{children}</div>
    </section>
  );
}
