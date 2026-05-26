import { useEffect } from 'react';

export default function Hero({ onGetStarted }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const heroLine = document.getElementById('heroLine');
      const dotEnd = document.getElementById('dotEnd');
      const dotPulse = document.getElementById('dotPulse');
      if (heroLine) {
        heroLine.classList.add('drawn');
        setTimeout(() => {
          if (dotEnd) { dotEnd.style.opacity = '1'; dotEnd.style.transition = 'opacity 0.3s'; }
          if (dotPulse) { dotPulse.style.opacity = '1'; dotPulse.style.transition = 'opacity 0.3s'; }
        }, 2400);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-48 sm:pt-56 pb-16 overflow-hidden bg-bg">


      <div className="max-w-7xl mx-auto w-full px-6 md:px-14 grid md:grid-cols-2 gap-10 md:gap-14 items-center relative z-10">
        {/* Copy */}
        <div>
          <div className="label hero-t1 mb-6 text-accent border-accent/20">Personal Finance, Reimagined</div>

          <h1 className="hero-title hero-t2" style={{ fontSize: 'clamp(2.2rem, 10vw, 3.8rem)' }}>
            See Where Every<br />
            <em className="text-accent not-italic">Cent Goes.</em><br />
            Instantly.
          </h1>

          <p className="hero-t3 mt-5 text-base md:text-[1.05rem] leading-relaxed max-w-[440px] text-text-muted">
            Connect your accounts in 2 minutes. Penny AI finds the patterns you miss and shows you exactly where your money leaks. Users save an average of <strong className="text-text">$156/month</strong> in their first 30 days.
          </p>

          <div className="hero-t4 flex flex-col sm:flex-row gap-3 mt-9">
            <button onClick={onGetStarted} className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[0.9rem] py-3 px-6">
              Start free — takes 2 min
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <a href="#features" className="btn-ghost w-full sm:w-auto flex items-center justify-center no-underline text-[0.9rem] py-3 px-6">See how it works</a>
          </div>

          {/* Social proof row */}
          <div className="hero-t5 flex flex-wrap items-center gap-5 mt-8">
            <div className="flex items-center gap-3">
              <div className="flex">
                {['AL','JM','RK','SK'].map((i, idx) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-accent-dim border-2 border-bg flex items-center justify-center text-[0.55rem] font-bold text-accent" style={{ marginLeft: idx > 0 ? '-7px' : 0, zIndex: 4 - idx }}>{i}</div>
                ))}
              </div>
              <span className="text-[0.8rem] text-text-muted"><strong className="text-text font-semibold">14,000+</strong> users</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block"/>
            <div className="flex items-center gap-1.5 text-[0.8rem] text-text-muted">
              <span className="text-yellow-500 text-sm">★★★★★</span>
              <strong className="text-text font-semibold">4.9</strong> on App Store
            </div>
            <div className="w-px h-4 bg-border hidden sm:block"/>
            <div className="text-[0.8rem] text-text-muted">No credit card required</div>
          </div>
        </div>

        {/* Dashboard visual */}
        <div className="hero-vis relative flex justify-center mt-12 md:mt-0">
          <div className="float-card relative w-full max-w-[440px] scale-[0.85] sm:scale-100" role="img" aria-label="Interactive dashboard visualization showing net balance, chart, and spending breakdown">
            {/* Main card */}
            <div className="glass-card rounded-3xl p-6 hero-mockup">
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-[0.65rem] text-text-muted tracking-[0.14em] uppercase">Net Balance</p>
                  <p className="font-display text-[2.1rem] tracking-[-0.04em] mt-[3px] text-green-400">$24,850<span className="text-[1rem] text-green-400">.00</span></p>
                </div>
                <div className="bg-[rgba(201,185,154,0.1)] border border-[rgba(201,185,154,0.22)] py-1.5 px-3.5 rounded-full text-[0.72rem] text-accent font-bold">↑ 4.2%</div>
              </div>

              {/* Chart */}
              <div className="relative h-[110px] mb-3">
                <svg viewBox="0 0 420 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <defs>
                    <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(22,163,74,0.15)" />
                      <stop offset="100%" stopColor="rgba(22,163,74,0)" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="27" x2="420" y2="27" stroke="rgba(15,23,42,0.05)" strokeWidth="1" />
                  <line x1="0" y1="55" x2="420" y2="55" stroke="rgba(15,23,42,0.05)" strokeWidth="1" />
                  <line x1="0" y1="82" x2="420" y2="82" stroke="rgba(15,23,42,0.05)" strokeWidth="1" />
                  <path d="M0,88 C50,76 80,58 120,52 S175,38 210,28 S285,18 325,22 S385,30 420,16 L420,110 L0,110 Z" fill="url(#aG)" />
                  <path className="cline" id="heroLine" d="M0,88 C50,76 80,58 120,52 S175,38 210,28 S285,18 325,22 S385,30 420,16" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
                  <circle id="dotEnd" cx="420" cy="16" r="4" fill="var(--accent)" opacity="0" />
                  <circle id="dotPulse" cx="420" cy="16" r="9" fill="rgba(201,185,154,0.2)" opacity="0" />
                </svg>
              </div>
              <div className="flex justify-between mb-4 text-[0.62rem] text-text-muted px-0.5">
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>

              {/* Spending breakdown */}
              <div className="border-t border-border pt-3.5">
                <div className="flex justify-between mb-3 text-[0.72rem]">
                  <span className="text-text-muted">Spending breakdown</span>
                  <span className="text-accent">This month</span>
                </div>
                <div className="flex flex-col gap-2.5">
                  <div>
                    <div className="flex justify-between text-[0.74rem] mb-1"><span>Housing</span><span className="text-green-400">$1,400</span></div>
                    <div className="prog-track"><div className="prog-fill" style={{ width: '65%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[0.74rem] mb-1"><span>Food &amp; Dining</span><span className="text-green-400">$620</span></div>
                    <div className="prog-track"><div className="prog-fill" style={{ width: '38%' }}></div></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[0.74rem] mb-1"><span>Transport</span><span className="text-green-400">$240</span></div>
                    <div className="prog-track"><div className="prog-fill" style={{ width: '22%' }}></div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card: savings */}
            <div className="glass-card rounded-2xl p-4 absolute -bottom-[18px] -right-[5px] sm:-right-[22px] w-[140px] sm:w-[158px] z-20" style={{ animation: 'floatY 5s ease-in-out 1.2s infinite' }}>
              <div className="text-[0.62rem] text-text-muted mb-[3px]">Savings Goal</div>
              <div className="text-[1.05rem] font-bold tracking-[-0.03em]">72% done</div>
              <div className="prog-track mt-[7px]"><div className="h-full w-[72%] bg-gradient-to-r from-accent to-text rounded-sm"></div></div>
            </div>

            {/* Floating card: alert */}
            <div className="glass-card rounded-2xl p-4 absolute -top-[14px] -left-[5px] sm:-left-[20px] w-[150px] sm:w-[168px] z-20" style={{ animation: 'floatY 7s ease-in-out 0.5s infinite' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] block" style={{ animation: 'pulse 2s ease infinite' }}></span>
                <span className="text-[0.62rem] text-text-muted">Smart Alert</span>
              </div>
              <div className="text-[0.76rem] font-semibold leading-snug">Budget on track! 🎯</div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}
