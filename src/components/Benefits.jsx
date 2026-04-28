export default function Benefits() {
  return (
    <section id="benefits" className="px-6 md:px-14 py-20 relative overflow-hidden">
      <div className="orb" style={{ width: '700px', height: '700px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(231,111,81,0.06) 0%,transparent 65%)' }}></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="mb-12 reveal text-center">
          <div className="label mb-4">What PennyWise Accomplishes</div>
          <h2 className="font-display text-text" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
            Real outcomes.<br /><em className="text-accent">Real freedom.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Benefit 1: Wide Card */}
          <div className="md:col-span-8 glass-card benefit rounded-3xl p-8 reveal relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="flex-1 flex flex-col gap-5">
              <div className="text-[2.4rem] leading-none">👁️</div>
              <div>
                <h3 className="text-[1.3rem] font-bold tracking-[-0.03em] mb-[7px] text-text">See where your money goes</h3>
                <p className="text-text-muted text-[0.9rem] leading-[1.7] max-w-[340px]">Complete transparency across every category, every month. No more financial blind spots holding you back.</p>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center lg:justify-end gap-6 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8 w-full md:w-auto">
              <svg width="84" height="84" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="25" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="none" />
                <circle cx="32" cy="32" r="25" stroke="var(--accent)" strokeWidth="8" fill="none" strokeDasharray="50 107" strokeDashoffset="0" transform="rotate(-90 32 32)" />
                <circle cx="32" cy="32" r="25" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" strokeDasharray="36 121" strokeDashoffset="-50" transform="rotate(-90 32 32)" />
                <circle cx="32" cy="32" r="25" stroke="var(--accent-dim)" strokeWidth="8" fill="none" strokeDasharray="22 135" strokeDashoffset="-86" transform="rotate(-90 32 32)" />
              </svg>
              <div className="text-[0.75rem] text-text-muted flex flex-col gap-2 font-semibold tracking-wide">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-accent"></div> Housing 32%</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[rgba(255,255,255,0.3)]"></div> Food 23%</div>
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[rgba(231,111,81,0.25)]"></div> Other 14%</div>
              </div>
            </div>
          </div>

          {/* Benefit 2: Tall Card */}
          <div className="md:col-span-4 glass-card benefit rounded-3xl p-8 reveal relative overflow-hidden flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="text-[2.4rem] leading-none">⚡</div>
              <div>
                <h3 className="text-[1.15rem] font-bold tracking-[-0.03em] mb-[7px] text-text">Stay within budget effortlessly</h3>
                <p className="text-text-muted text-[0.85rem] leading-[1.65]">Smart alerts and real-time tracking ensure you never overspend — without the guilt trips.</p>
              </div>
            </div>
            <div className="mt-auto pt-5 border-t border-border">
              <div className="bg-[rgba(231,111,81,0.06)] border border-[rgba(231,111,81,0.15)] rounded-2xl py-3 px-4 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_var(--accent)]" style={{ animation: 'pulse 2s ease infinite' }}></div>
                <div className="text-[0.8rem] leading-[1.4] text-text"><strong>Dining budget:</strong> 85% used<br /><span className="text-text-muted text-[0.7rem]">$42 remaining this week</span></div>
              </div>
            </div>
          </div>

          {/* Benefit 3: Full Width Bottom Card */}
          <div className="md:col-span-12 glass-card benefit rounded-3xl p-8 reveal relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-4 mb-1">
                <div className="text-[2.4rem] leading-none">🌱</div>
                <h3 className="text-[1.3rem] font-bold tracking-[-0.03em] text-text">Build better financial habits</h3>
              </div>
              <p className="text-text-muted text-[0.9rem] leading-[1.7] max-w-[480px]">Weekly check-ins, habit streaks, and personalized coaching help you improve consistently over time. The more you engage, the smarter it gets.</p>
            </div>
            <div className="flex-1 flex flex-col md:items-end w-full md:w-auto border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-8">
              <div className="text-[0.7rem] text-text-muted mb-[10px] uppercase tracking-[0.15em] font-bold">Weekly streak</div>
              <div className="flex gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-accent opacity-90 shadow-[0_0_12px_rgba(231,111,81,0.3)]"></div>
                <div className="w-8 h-8 rounded-lg bg-accent opacity-75"></div>
                <div className="w-8 h-8 rounded-lg bg-accent opacity-[0.88]"></div>
                <div className="w-8 h-8 rounded-lg bg-accent opacity-[0.72]"></div>
                <div className="w-8 h-8 rounded-lg bg-accent"></div>
                <div className="w-8 h-8 rounded-lg bg-[rgba(231,111,81,0.12)] border border-dashed border-[rgba(231,111,81,0.3)]"></div>
                <div className="w-8 h-8 rounded-lg bg-[rgba(231,111,81,0.12)] border border-dashed border-[rgba(231,111,81,0.3)]"></div>
              </div>
              <p className="text-[0.85rem] text-accent mt-[6px] font-bold">5 days strong! 🔥</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
