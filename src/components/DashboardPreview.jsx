import { useEffect } from 'react';
import ShapeGrid from './ui/ShapeGrid';

export default function DashboardPreview() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            document.getElementById('iLine')?.classList.add('drawn');
            document.getElementById('eLine')?.classList.add('drawn');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    const dashWrap = document.getElementById('dashWrap');
    if (dashWrap) observer.observe(dashWrap);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative px-6 md:px-14 py-20 overflow-hidden">
      {/* ShapeGrid Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <ShapeGrid 
          speed={0.3} 
          squareSize={40}
          direction="diagonal"
          shape="square"
          hoverTrailAmount={5}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 reveal">
          <div className="label mb-4">Live Preview</div>
          <h2 className="font-display" style={{ fontSize: 'clamp(2rem,4vw,3.4rem)', lineHeight: '1.08', letterSpacing: '-0.03em' }}>
            Intelligence meets<br /><em className="text-accent">simplicity.</em>
          </h2>
          <p className="text-text-muted mt-[10px] text-[0.88rem]">Your finances at a glance. Always clear, always actionable.</p>
        </div>

        <div id="dashWrap" className="glass-card rounded-2xl overflow-hidden reveal border border-border" style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.08)' }} role="img" aria-label="Interactive dashboard preview showing total balance, monthly spend, and a cash flow chart">
          {/* Browser chrome */}
          <div className="bg-[rgba(255,255,255,0.03)] border-b border-border py-3 px-[22px] flex items-center gap-[7px]">
            <div className="w-[9px] h-[9px] rounded-full bg-[rgba(255,255,255,0.14)]"></div>
            <div className="w-[9px] h-[9px] rounded-full bg-[rgba(255,255,255,0.09)]"></div>
            <div className="w-[9px] h-[9px] rounded-full bg-[rgba(255,255,255,0.06)]"></div>
            <div className="flex-1 text-center text-[0.65rem] text-text-muted">pennywise.app/dashboard</div>
          </div>

          {/* KPI + chart */}
          <div className="p-7">
            {/* KPI row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-3.5">
              <div className="bg-[rgba(255,255,255,0.03)] border border-border rounded-[14px] p-[18px]">
                <div className="text-[0.62rem] text-text-muted uppercase tracking-[0.12em] mb-1.5">Total Balance</div>
                <div className="font-display text-[1.7rem] tracking-[-0.04em]">$24,850</div>
                <div className="text-[0.7rem] text-accent mt-[3px]">↑ +4.2% this month</div>
              </div>
              <div className="bg-[rgba(255,255,255,0.03)] border border-border rounded-[14px] p-[18px]">
                <div className="text-[0.62rem] text-text-muted uppercase tracking-[0.12em] mb-1.5">Monthly Spend</div>
                <div className="font-display text-[1.7rem] tracking-[-0.04em]">$2,614</div>
                <div className="text-[0.7rem] text-[rgba(255,255,255,0.28)] mt-[3px]">↓ −8% vs last month</div>
              </div>
              <div className="bg-[rgba(201,185,154,0.06)] border border-[rgba(201,185,154,0.2)] rounded-[14px] p-[18px]">
                <div className="text-[0.62rem] text-text-muted uppercase tracking-[0.12em] mb-1.5">Saved this month</div>
                <div className="font-display text-[1.7rem] tracking-[-0.04em] text-accent">$586</div>
                <div className="text-[0.7rem] text-accent mt-[3px]">✓ Goal achieved!</div>
              </div>
            </div>

            {/* Cash flow chart */}
            <div className="bg-[rgba(255,255,255,0.02)] border border-border rounded-[14px] p-[22px] sm:col-span-3">
              <div className="flex justify-between items-center mb-4">
                <div className="text-[0.8rem] font-semibold">Cash Flow — December 2024</div>
                <div className="flex gap-5 text-[0.68rem] text-text-muted">
                  <span><span className="text-accent">●</span> Income</span>
                  <span><span className="text-[rgba(255,255,255,0.28)]">●</span> Expenses</span>
                </div>
              </div>
              <svg id="dashChart" viewBox="0 0 800 160" className="w-full h-auto">
                <defs>
                  <linearGradient id="iG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(201,185,154,0.14)" /><stop offset="100%" stopColor="rgba(201,185,154,0)" />
                  </linearGradient>
                  <linearGradient id="eG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.05)" /><stop offset="100%" stopColor="rgba(255,255,255,0)" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                {/* expense area */}
                <path d="M0,100 C70,94 130,104 175,90 S260,82 305,96 S390,99 435,84 S515,80 562,90 S648,95 715,85 L800,80 L800,160 L0,160 Z" fill="url(#eG)" />
                <path id="eLine" className="cline cline-slow" d="M0,100 C70,94 130,104 175,90 S260,82 305,96 S390,99 435,84 S515,80 562,90 S648,95 715,85 L800,80" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                {/* income area */}
                <path d="M0,72 C70,56 130,44 175,38 S260,28 305,33 S390,22 435,18 S515,28 562,22 S648,17 715,13 L800,9 L800,160 L0,160 Z" fill="url(#iG)" />
                <path id="iLine" className="cline" d="M0,72 C70,56 130,44 175,38 S260,28 305,33 S390,22 435,18 S515,28 562,22 S648,17 715,13 L800,9" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
              <div className="flex justify-between mt-2 text-[0.62rem] text-text-muted px-1">
                <span>Dec 1</span><span>Dec 5</span><span>Dec 10</span><span>Dec 15</span><span>Dec 20</span><span>Dec 25</span><span>Dec 31</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
