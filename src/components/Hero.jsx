import { useEffect, useState } from 'react';
import Grainient from './ui/Grainient';

export default function Hero({ onGetStarted }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));

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
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-14 overflow-hidden bg-bg dark:bg-[#1b1511]">
      {/* Background WebGL Grainient */}
      <div className="absolute inset-0 z-0 opacity-100">
        <Grainient 
          color1={isDark ? "#1b1511" : "#ffffff"} 
          color2={isDark ? "#c28d6c" : "#f5f5f5"} 
          color3={isDark ? "#3c2f25" : "#eaeaea"}
          timeSpeed={isDark ? 0.1 : 0.05}
          warpAmplitude={isDark ? 30.0 : 15.0}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-14 items-center relative z-10">
        {/* Copy */}
        <div>
          <div className="label hero-t1 mb-6 text-accent border-accent/20">Personal Finance, Reimagined</div>

          <h1 className="hero-title hero-t2">
            See Where Every<br />
            <em className="text-accent not-italic">Cent Goes.</em><br />
            Instantly.
          </h1>

          <p className="hero-t3 mt-6 text-base md:text-lg leading-relaxed max-w-[420px]" style={{ color: isDark ? 'rgba(255,255,255,0.8)' : '#444444' }}>
            Build wealth without thinking about it. PennyWise uses subtle AI to organize your finances, giving you absolute clarity over every dollar.
          </p>

          <div className="hero-t4 flex flex-wrap gap-3 mt-10">
            <button onClick={onGetStarted} className="btn-primary inline-flex items-center gap-2">
              Get Started Free
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <a href="#features" className="btn-secondary flex items-center justify-center no-underline">Learn More</a>
          </div>

          {/* Social proof */}
          <div className="hero-t5 flex items-center gap-4 mt-10">
            <div className="flex" style={{ marginRight: '4px' }}>
              <div className="w-[30px] h-[30px] rounded-full bg-[rgba(17,17,17,0.08)] dark:bg-white/10 border-2 border-bg dark:border-[#1b1511] flex items-center justify-center text-[0.6rem] font-bold z-30" style={{ color: isDark ? '#ffffff' : '#111111' }}>AL</div>
              <div className="w-[30px] h-[30px] rounded-full bg-[rgba(17,17,17,0.04)] dark:bg-white/5 border-2 border-bg dark:border-[#1b1511] flex items-center justify-center text-[0.6rem] font-bold -ml-2 z-20" style={{ color: isDark ? '#ffffff' : '#111111' }}>JM</div>
              <div className="w-[30px] h-[30px] rounded-full bg-[rgba(17,17,17,0.06)] dark:bg-white/8 border-2 border-bg dark:border-[#1b1511] flex items-center justify-center text-[0.6rem] font-bold -ml-2 z-10" style={{ color: isDark ? '#ffffff' : '#111111' }}>RK</div>
              <div className="w-[30px] h-[30px] rounded-full bg-[rgba(17,17,17,0.02)] dark:bg-white/5 border-2 border-bg dark:border-[#1b1511] flex items-center justify-center text-[0.65rem] -ml-2 z-0" style={{ color: isDark ? '#ffffff' : '#111111' }}>+</div>
            </div>
            <span className="text-[0.78rem]" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#555555' }}>Trusted by <strong style={{ color: isDark ? '#ffffff' : '#111111' }}>12,000+</strong> users worldwide</span>
          </div>
        </div>

        {/* Dashboard visual */}
        <div className="hero-vis relative flex justify-center">
          <div className="float-card relative w-full max-w-[440px]" role="img" aria-label="Interactive dashboard visualization showing net balance, chart, and spending breakdown">
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
                      <stop offset="0%" stopColor="rgba(201,185,154,0.18)" />
                      <stop offset="100%" stopColor="rgba(201,185,154,0)" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="27" x2="420" y2="27" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <line x1="0" y1="55" x2="420" y2="55" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <line x1="0" y1="82" x2="420" y2="82" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
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
            <div className="glass-card rounded-2xl p-4 absolute -bottom-[18px] -right-[22px] w-[158px] shadow-[0_20px_50px_rgba(0,0,0,0.55)]" style={{ animation: 'floatY 5s ease-in-out 1.2s infinite' }}>
              <div className="text-[0.62rem] text-text-muted mb-[3px]">Savings Goal</div>
              <div className="text-[1.05rem] font-bold tracking-[-0.03em]">72% done</div>
              <div className="prog-track mt-[7px]"><div className="h-full w-[72%] bg-gradient-to-r from-accent to-text rounded-sm"></div></div>
            </div>

            {/* Floating card: alert */}
            <div className="glass-card rounded-2xl p-4 absolute -top-[14px] -left-[20px] w-[168px] shadow-[0_20px_50px_rgba(0,0,0,0.55)]" style={{ animation: 'floatY 7s ease-in-out 0.5s infinite' }}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] block" style={{ animation: 'pulse 2s ease infinite' }}></span>
                <span className="text-[0.62rem] text-text-muted">Smart Alert</span>
              </div>
              <div className="text-[0.76rem] font-semibold leading-snug">Budget on track this week 🎯</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" style={{ animation: 'fadeIn 1s 1.6s both' }}>
        <span className="text-[0.6rem] tracking-[0.22em] uppercase text-text-muted">Scroll</span>
        <div className="w-px h-[38px] bg-gradient-to-b from-accent to-transparent"></div>
      </div>
    </section>
  );
}
