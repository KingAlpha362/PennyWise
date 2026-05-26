import ShapeGrid from './ui/ShapeGrid';

export default function CTA({ onGetStarted }) {
  return (
    <section className="relative px-6 md:px-14 py-20 md:py-28 overflow-hidden bg-bg">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <ShapeGrid speed={0.3} squareSize={40} direction="diagonal" shape="square" hoverTrailAmount={5} />
      </div>

      <div className="max-w-3xl mx-auto reveal relative z-10">
        <div className="relative rounded-3xl overflow-hidden border border-accent-border bg-white shadow-xl" style={{ boxShadow: '0 24px 80px rgba(22,163,74,0.10), 0 4px 16px rgba(0,0,0,0.06)' }}>
          {/* Green top gradient band */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60 pointer-events-none"/>
          <div className="orb" style={{ width: '500px', height: '500px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(22,163,74,0.06) 0%,transparent 65%)' }}/>

          <div className="relative z-10 p-10 sm:p-16 text-center">
            <div className="label mb-5">Start Today — It&apos;s Free</div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-text mb-4 leading-[1.1]">
              The last finance app<br/>you&apos;ll ever need.
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
