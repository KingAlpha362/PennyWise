import { Eye, Zap, Leaf } from 'lucide-react';

export default function Benefits() {
  return (
    <section id="benefits" className="relative px-6 md:px-14 py-16 md:py-24 overflow-hidden bg-bg text-text">
      {/* Top Fade (transition from light section) */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-bg to-transparent z-[5] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 reveal text-center">
          <div className="label mb-4">What PennyWise Accomplishes</div>
          <h2 className="font-display text-text" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
            Real outcomes.<br /><em className="text-accent">Real freedom.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Benefit 1: Wide Card */}
          <div className="md:col-span-8 glass-card benefit p-6 sm:p-8 reveal flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 flex flex-col gap-5">
              <div className="w-12 h-12 bg-[var(--accent-dim)] rounded-2xl flex items-center justify-center">
                <Eye size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-[1.15rem] font-bold tracking-[-0.03em] mb-[7px] text-text">See where every single penny goes</h3>
                <p className="text-text-muted text-[0.85rem] leading-[1.65]">Categorize automatically. View deep visual breakdowns of your daily cash flow effortlessly.</p>
              </div>
            </div>

            <div className="flex items-center gap-5 shrink-0 bg-[var(--bg-subtle)] p-5 rounded-xl border border-[var(--border)]">
              <svg className="w-[64px] h-[64px]">
                <circle cx="32" cy="32" r="25" stroke="rgba(22,163,74,0.1)" strokeWidth="8" fill="none" />
                <circle cx="32" cy="32" r="25" stroke="var(--accent)" strokeWidth="8" fill="none" strokeDasharray="36 121" strokeDashoffset="-50" transform="rotate(-90 32 32)" />
                <circle cx="32" cy="32" r="25" stroke="var(--accent-dim)" strokeWidth="8" fill="none" strokeDasharray="22 135" strokeDashoffset="-86" transform="rotate(-90 32 32)" />
              </svg>
              <div className="text-[0.75rem] text-text-muted flex flex-col gap-2 font-semibold tracking-wide">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-accent"></div> Housing 32%</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[rgba(22,163,74,0.3)]"></div> Food 23%</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[rgba(22,163,74,0.1)]"></div> Other 14%</div>
              </div>
            </div>
          </div>

          {/* Benefit 2: Tall Card */}
          <div className="md:col-span-4 glass-card benefit p-6 sm:p-8 reveal flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-12 h-12 bg-[var(--accent-dim)] rounded-2xl flex items-center justify-center">
                <Zap size={24} className="text-accent" />
              </div>
              <div>
                <h3 className="text-[1.15rem] font-bold tracking-[-0.03em] mb-[7px] text-text">Stay within budget effortlessly</h3>
                <p className="text-text-muted text-[0.85rem] leading-[1.65]">Smart alerts and real-time tracking ensure you never overspend — without the guilt trips.</p>
              </div>
            </div>
            <div className="mt-auto">
              <div className="w-full h-2 rounded-full bg-bg border border-border overflow-hidden">
                <div className="h-full bg-accent" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-[0.7rem] font-bold text-accent"><span>78% spent</span><span className="text-green-600 dark:text-green-400">$214 left</span></div>
            </div>
          </div>

          {/* Benefit 3: Full Width Bottom Card */}
          <div className="md:col-span-12 glass-card benefit p-6 sm:p-8 reveal flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-1">
                <div className="w-12 h-12 bg-[var(--accent-dim)] rounded-2xl flex items-center justify-center">
                  <Leaf size={24} className="text-accent" />
                </div>
                <h3 className="text-[1.3rem] font-bold tracking-[-0.03em] text-text">Build better financial habits</h3>
              </div>
              <p className="text-text-muted text-[0.9rem] leading-[1.7] max-w-[480px]">Weekly check-ins, habit streaks, and personalized coaching help you improve consistently over time. The more you engage, the smarter it gets.</p>
            </div>
            <div className="flex-1 flex flex-col md:items-end w-full md:w-auto pt-6 md:pt-0 md:pl-8">
              <div className="text-[0.7rem] text-text-muted mb-[10px] uppercase tracking-[0.15em] font-bold">Weekly streak</div>
              <div className="flex gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-accent opacity-90 shadow-[0_0_12px_rgba(22,163,74,0.3)]"></div>
                <div className="w-8 h-8 rounded-lg bg-accent opacity-75"></div>
                <div className="w-8 h-8 rounded-lg bg-accent opacity-[0.88]"></div>
                <div className="w-8 h-8 rounded-lg bg-accent opacity-[0.72]"></div>
                <div className="w-8 h-8 rounded-lg bg-accent"></div>
                <div className="w-8 h-8 rounded-lg bg-[rgba(22,163,74,0.12)] border border-dashed border-[rgba(22,163,74,0.3)]"></div>
                <div className="w-8 h-8 rounded-lg bg-[rgba(22,163,74,0.12)] border border-dashed border-[rgba(22,163,74,0.3)]"></div>
              </div>
              <p className="text-[0.85rem] text-accent mt-[6px] font-bold">5 days strong!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
