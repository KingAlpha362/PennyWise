import ShapeGrid from './ui/ShapeGrid';

export default function CTA({ onGetStarted }) {
  return (
    <section className="relative px-6 md:px-14 py-24 overflow-hidden">
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

      <div className="max-w-3xl mx-auto reveal relative z-10">
        <div className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden border border-border">
          <div className="orb" style={{ width: '450px', height: '450px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(22,163,74,0.06) 0%,transparent 65%)' }}></div>
          <div className="label mb-5 relative text-accent border-accent/20">Start Today — It's Free</div>
          <h2 className="hero-title relative text-text mb-4">
            Your money.<br />Your rules.
          </h2>
          <p className="text-text-muted text-[0.92rem] max-w-[400px] mx-auto mb-[30px] leading-[1.74] relative">
            Join thousands building smarter financial habits. Free forever, no credit card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10">
            <button onClick={onGetStarted} className="btn-primary inline-flex items-center gap-2">
              Get Started Free
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button onClick={onGetStarted} className="btn-secondary">See the Demo</button>
          </div>
          <p className="text-[0.68rem] text-text-muted mt-[14px] relative">
            No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; GDPR compliant
          </p>
        </div>
      </div>
    </section>
  );
}
