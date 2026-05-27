import { useEffect, useRef, useState } from 'react';

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function StatCell({ target, decimals, prefix, suffix, label, sub }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const duration = 1800;
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            setCount(easeOutExpo(t) * target);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  const display = decimals > 0
    ? `${prefix}${count.toFixed(decimals)}${suffix}`
    : `${prefix}${Math.round(count).toLocaleString()}${suffix}`;

  return (
    <div ref={ref} className="reveal bg-bg px-8 py-10 text-center hover:bg-[var(--accent-dim)] transition-colors duration-200 cursor-default">
      <div className="stat-value text-2xl sm:text-4xl md:text-5xl">{display}</div>
      <div className="text-[0.85rem] font-semibold mt-2 text-text">{label}</div>
      <div className="text-[0.75rem] mt-1 text-text-muted">{sub}</div>
    </div>
  );
}

export default function Stats() {
  const stats = [
    { target: 14000, decimals: 0, prefix: '', suffix: '+', label: 'Active users', sub: 'and growing' },
    { target: 156, decimals: 0, prefix: '$', suffix: '', label: 'Avg monthly savings', sub: 'found per user' },
    { target: 2.8, decimals: 1, prefix: '$', suffix: 'B+', label: 'Tracked expenses', sub: 'across all accounts' },
    { target: 4.9, decimals: 1, prefix: '', suffix: '★', label: 'App Store rating', sub: '1,200+ reviews' },
  ];

  return (
    <section className="relative px-6 md:px-14 py-16 overflow-hidden" style={{ background: 'var(--bg-subtle)' }}>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden shadow-sm border border-border">
          {stats.map((s, i) => (
            <StatCell key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
