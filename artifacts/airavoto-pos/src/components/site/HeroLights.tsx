export function HeroLights() {
  // `mobile: false` particles are hidden below the sm breakpoint so the
  // starfield stays as sparse as the reference on small screens.
  const particles = [
    { left: '8%', top: '12%', size: 3, color: 'oklch(0.95 0 0 / 0.85)', opacity: 0.55, tx: '14px', ty: '-18px', dur: 16, dur2: 7, delay: -2, mobile: true },
    { left: '22%', top: '8%', size: 2, color: 'oklch(0.82 0.09 290 / 0.8)', opacity: 0.45, tx: '-10px', ty: '-12px', dur: 20, dur2: 9, delay: -5, mobile: false },
    { left: '38%', top: '18%', size: 4, color: 'oklch(0.95 0 0 / 0.75)', opacity: 0.5, tx: '18px', ty: '-22px', dur: 14, dur2: 6, delay: -1, mobile: true },
    { left: '52%', top: '6%', size: 2, color: 'oklch(0.8 0.1 290 / 0.85)', opacity: 0.4, tx: '-16px', ty: '-10px', dur: 22, dur2: 8, delay: -7, mobile: false },
    { left: '68%', top: '14%', size: 3, color: 'oklch(0.95 0 0 / 0.9)', opacity: 0.6, tx: '10px', ty: '-20px', dur: 18, dur2: 7, delay: -3, mobile: true },
    { left: '85%', top: '10%', size: 2, color: 'oklch(0.82 0.09 290 / 0.75)', opacity: 0.45, tx: '-12px', ty: '-14px', dur: 15, dur2: 10, delay: -6, mobile: false },
    { left: '14%', top: '34%', size: 2, color: 'oklch(0.95 0 0 / 0.7)', opacity: 0.35, tx: '8px', ty: '-16px', dur: 19, dur2: 6, delay: -4, mobile: false },
    { left: '44%', top: '30%', size: 3, color: 'oklch(0.8 0.1 290 / 0.8)', opacity: 0.5, tx: '-14px', ty: '-18px', dur: 17, dur2: 8, delay: -8, mobile: true },
    { left: '74%', top: '32%', size: 2, color: 'oklch(0.95 0 0 / 0.75)', opacity: 0.4, tx: '16px', ty: '-12px', dur: 21, dur2: 9, delay: -2, mobile: false },
    { left: '92%', top: '26%', size: 3, color: 'oklch(0.82 0.09 290 / 0.7)', opacity: 0.45, tx: '-10px', ty: '-24px', dur: 13, dur2: 7, delay: -9, mobile: true },
    { left: '30%', top: '22%', size: 2, color: 'oklch(0.95 0 0 / 0.65)', opacity: 0.35, tx: '12px', ty: '-10px', dur: 23, dur2: 11, delay: -1, mobile: false },
    { left: '60%', top: '20%', size: 2, color: 'oklch(0.8 0.1 290 / 0.75)', opacity: 0.4, tx: '-8px', ty: '-16px', dur: 16, dur2: 8, delay: -5, mobile: false },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full ${p.mobile ? '' : 'hidden sm:block'}`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            filter: 'blur(1.5px)',
            opacity: p.opacity,
            ['--tx' as string]: p.tx,
            ['--ty' as string]: p.ty,
            animation: `particle-drift ${p.dur}s ease-in-out infinite alternate, particle-twinkle ${p.dur2}s ease-in-out infinite alternate`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
