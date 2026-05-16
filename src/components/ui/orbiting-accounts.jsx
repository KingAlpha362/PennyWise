"use client"
import { useEffect, useState, useRef, useCallback, memo  } from 'react';
import { Landmark, CreditCard, TrendingUp, PiggyBank, Wallet, Bitcoin, ArrowRightLeft } from 'lucide-react';

const iconComponents = {
  bank: { component: () => <Landmark className="w-full h-full text-[#16A34A] dark:text-[#60d4aa]" />, color: '#16A34A' },
  card: { component: () => <CreditCard className="w-full h-full text-[#16A34A] dark:text-[#60d4aa]" />, color: '#16A34A' },
  investment: { component: () => <TrendingUp className="w-full h-full text-[#c9922a]" />, color: '#c9922a' },
  savings: { component: () => <PiggyBank className="w-full h-full text-[#16A34A] dark:text-[#60d4aa]" />, color: '#16A34A' },
  wallet: { component: () => <Wallet className="w-full h-full text-[#c9922a]" />, color: '#c9922a' },
  crypto: { component: () => <Bitcoin className="w-full h-full text-[#f7931a]" />, color: '#f7931a' },
};

const SkillIcon = memo(({ type }) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

const skillsConfig = [
  { id: 'bank', orbitRadius: 100, size: 40, speed: 1, iconType: 'bank', phaseShift: 0, label: 'Bank Account' },
  { id: 'card', orbitRadius: 100, size: 40, speed: 1, iconType: 'card', phaseShift: (2 * Math.PI) / 3, label: 'Credit Card' },
  { id: 'savings', orbitRadius: 100, size: 40, speed: 1, iconType: 'savings', phaseShift: (4 * Math.PI) / 3, label: 'Savings' },
  { id: 'investment', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'investment', phaseShift: 0, label: 'Investments' },
  { id: 'wallet', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'wallet', phaseShift: (2 * Math.PI) / 3, label: 'Digital Wallet' },
  { id: 'crypto', orbitRadius: 180, size: 45, speed: -0.6, iconType: 'crypto', phaseShift: (4 * Math.PI) / 3, label: 'Crypto' },
];

// ─── Tooltip: renders above the icon so it never clips off the bottom ──────────
const Tooltip = memo(({ label, color }) => (
  <div
    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
    style={{
      bottom: `calc(100% + 6px)`,
      width: 'max-content',
    }}
  >
    <div
      className="px-2 py-1 rounded text-xs font-semibold text-white whitespace-nowrap shadow-md"
      style={{ backgroundColor: color ?? '#16A34A' }}
    >
      {label}
    </div>
    {/* Arrow */}
    <div
      className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
      style={{
        top: '100%',
        borderLeft: '5px solid transparent',
        borderRight: '5px solid transparent',
        borderTop: `5px solid ${color ?? '#16A34A'}`,
      }}
    />
  </div>
));
Tooltip.displayName = 'Tooltip';

// ─── Single orbiting icon ──────────────────────────────────────────────────────
const OrbitingSkill = memo(({ config, angle, scale }) => {
  const [active, setActive] = useState(false);
  const { orbitRadius, iconType, label, size } = config;
  const iconColor = iconComponents[iconType]?.color;

  const currentRadius = orbitRadius * scale;
  const currentSize = size * scale;
  const x = Math.cos(angle) * currentRadius;
  const y = Math.sin(angle) * currentRadius;

  // Shared activate / deactivate handlers (pointer + touch)
  const activate = useCallback(() => setActive(true), []);
  const deactivate = useCallback(() => setActive(false), []);

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        transition: 'none', // Prevent gliding if global transitions exist
        zIndex: active ? 20 : 10,
        // Ensure tooltip isn't clipped by the parent's overflow
        overflow: 'visible',
      }}
      onMouseEnter={activate}
      onMouseLeave={deactivate}
      onTouchStart={activate}
      onTouchEnd={deactivate}
    >
      <div
        className={`
          relative w-full h-full
          bg-card border border-border backdrop-blur-md
          rounded-full flex items-center justify-center
          cursor-pointer select-none
          transition-transform duration-200
          ${active ? 'scale-125' : 'scale-100'}
        `}
        style={{
          padding: `${10 * scale}px`,
          ...(active ? { boxShadow: `0 0 24px ${iconColor}50, 0 0 48px ${iconColor}25` } : {})
        }}
      >
        <SkillIcon type={iconType} />
        {active && <Tooltip label={label} color={iconColor} />}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// ─── Glowing orbit ring ────────────────────────────────────────────────────────
const GlowingOrbitPath = memo(({ radius, animationDelay = 0, scale }) => {
  const d = radius * scale * 2;
  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{ width: `${d}px`, height: `${d}px` }}
    >
      <div
        className="absolute inset-0 rounded-full border border-border"
        style={{ boxShadow: `inset 0 0 20px rgba(22, 163, 74, 0.05)` }}
      />
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, transparent 30%, rgba(22,163,74,0.06) 70%, rgba(22,163,74,0.12) 100%)`,
          animation: `pulse 4s ease-in-out infinite`,
          animationDelay: `${animationDelay}s`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// ─── Main component ────────────────────────────────────────────────────────────
export default function OrbitingAccounts() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Measure the actual container width so the orbits always fit
  useEffect(() => {
    if (!containerRef.current) return;

    const MAX_ORBIT = 180;   // largest orbitRadius in skillsConfig
    const MAX_ICON_SIZE = 45; // largest icon size

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      // Filter out invalid or zero widths to prevent "reset" jumps to middle
      if (width <= 10) return;
      
      const halfW = width / 2;
      const buffer = 15; // Extra room to prevent triggering scrollbars
      const totalNeededRadius = MAX_ORBIT + (MAX_ICON_SIZE / 2) + buffer;
      
      // Clamp scale to a minimum (0.4) so orbits never "collapse" to the middle
      const newScale = Math.max(0.4, Math.min(1, halfW / totalNeededRadius));
      
      // Only update if change is meaningful to prevent jitter
      setScale(prev => Math.abs(prev - newScale) > 0.01 ? newScale : prev);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // rAF animation loop
  useEffect(() => {
    if (isPaused) return;
    let id;
    let last = performance.now();
    const tick = (now) => {
      setTime(t => t + (now - last) / 1000);
      last = now;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [isPaused]);

  // Pause on hover OR touch (whole container)
  const handleTouchStart = useCallback(() => setIsPaused(true), []);
  const handleTouchEnd = useCallback(() => setIsPaused(false), []);

  const orbitRings = [
    { radius: 100, delay: 0 },
    { radius: 180, delay: 1.5 },
  ];

  return (
    <div className="w-full flex items-center justify-center py-10 overflow-hidden relative">
      <div
        ref={containerRef}
        className="relative w-full max-w-[450px] aspect-square flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Centre hub */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-card border border-border rounded-full flex items-center justify-center z-10 relative shadow-2xl">
          <div className="absolute inset-0 rounded-full bg-[#16A34A]/20 blur-xl animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-[#c9922a]/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
          <ArrowRightLeft className="relative z-10 w-6 h-6 sm:w-8 sm:h-8 text-[#16A34A] dark:text-[#60d4aa]" />
        </div>

        {/* Orbit rings */}
        {orbitRings.map(r => (
          <GlowingOrbitPath key={r.radius} radius={r.radius} animationDelay={r.delay} scale={scale} />
        ))}

        {/* Icons */}
        {skillsConfig.map(cfg => (
          <OrbitingSkill
            key={cfg.id}
            config={cfg}
            angle={time * cfg.speed + cfg.phaseShift}
            scale={scale}
          />
        ))}
      </div>
    </div>
  );
}