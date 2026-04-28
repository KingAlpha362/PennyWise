import { useEffect, useState } from 'react';

export default function Stats() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);
      
  return (
    <section className="relative px-6 md:px-14 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-white/[0.03] dark:bg-white/[0.03] backdrop-blur-md py-12 px-6 rounded-2xl border border-border dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="reveal">
              <div className="stat-n font-bold text-4xl md:text-5xl" style={{ color: isDark ? '#ffffff' : '#111111' }}>12,000+</div>
              <div className="text-[0.78rem] mt-[5px] font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#555555' }}>Active users</div>
            </div>
            <div className="reveal reveal-d1">
              <div className="stat-n font-bold text-4xl md:text-5xl text-green-600 dark:text-green-400">$2.4B</div>
              <div className="text-[0.78rem] mt-[5px] font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#555555' }}>Tracked expenses</div>
            </div>
            <div className="reveal reveal-d2">
              <div className="stat-n font-bold text-4xl md:text-5xl" style={{ color: isDark ? '#ffffff' : '#111111' }}>98%</div>
              <div className="text-[0.78rem] mt-[5px] font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#555555' }}>User satisfaction</div>
            </div>
            <div className="reveal reveal-d3">
              <div className="stat-n font-bold text-4xl md:text-5xl" style={{ color: isDark ? '#ffffff' : '#111111' }}>4.9★</div>
              <div className="text-[0.78rem] mt-[5px] font-semibold" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : '#555555' }}>App store rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
