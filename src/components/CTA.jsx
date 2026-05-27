import ShapeGrid from './ui/ShapeGrid';

export default function CTA({ onGetStarted }) {
  return (
    <section className="relative px-6 md:px-14 py-20 md:py-28 overflow-hidden bg-[var(--bg-subtle)]">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <ShapeGrid speed={0.3} squareSize={40} direction="diagonal" shape="square" hoverTrailAmount={5} />
      </div>

      {/* Destination halo — soft green glow blooming behind the card */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[min(900px,95vw)] h-[600px]"
        style={{ background: 'radial-gradient(ellipse at center, rgba(22,163,74,0.16) 0%, rgba(22,163,74,0.05) 38%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto reveal relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-accent-border bg-[var(--bg-card)] shadow-xl" style={{ boxShadow: '0 24px 80px rgba(22,163,74,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}>
          {/* Green top gradient band */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 pointer-events-none"/>
          <div className="orb" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(22,163,74,0.06) 0%,transparent 65%)' }}/>

          {/* Faint growth line rising across the bottom */}
          <svg className="absolute bottom-0 left-0 w-full h-28 pointer-events-none" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="ctaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(22,163,74,0.10)" />
                <stop offset="100%" stopColor="rgba(22,163,74,0)" />
              </linearGradient>
            </defs>
            <path d="M0,110 C90,100 150,86 240,74 S400,40 480,30 600,12 600,12 L600,120 L0,120 Z" fill="url(#ctaFill)" />
            <path d="M0,110 C90,100 150,86 240,74 S400,40 480,30 600,12 600,12" fill="none" stroke="rgba(22,163,74,0.28)" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <div className="relative z-10 p-10 sm:p-16 text-center">
            <div className="label mb-5">Join 14,000+ people who stopped guessing</div>
            <h2 className="font-display text-5xl md:text-6xl font-extrabold tracking-[-0.03em] text-text mb-4 leading-[1.05]">
              Your finances, finally<br/>on autopilot.
            </h2>
            <p className="text-text-muted text-base max-w-[420px] mx-auto mb-8 leading-relaxed">
              Join 14,000+ users who found an average of <strong className="text-text">$156/month</strong> in hidden savings. 2 minutes to set up, no credit card required.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={onGetStarted} className="btn-primary inline-flex items-center gap-2 text-[0.9rem] py-3 px-7">
                Get Started Free
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <a href="#pricing" className="btn-ghost inline-flex items-center gap-2 text-[0.9rem] py-3 px-7 no-underline">
                View pricing
              </a>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-[0.73rem] text-text-muted flex-wrap">
              <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="m5 12 5 5L20 7"/></svg>No credit card</span>
              <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="m5 12 5 5L20 7"/></svg>Cancel anytime</span>
              <span className="flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="m5 12 5 5L20 7"/></svg>SOC 2 + GDPR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
