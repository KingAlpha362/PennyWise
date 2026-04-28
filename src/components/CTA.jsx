import ShapeGrid from './ui/ShapeGrid';

export default function CTA() {
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
          <h2 className="font-display relative text-text tracking-tight font-extrabold" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: '1.04', marginBottom: '14px' }}>
            Your money.<br />Your rules.
          </h2>
          <p className="text-text-muted text-[0.92rem] max-w-[400px] mx-auto mb-[30px] leading-[1.74] relative">
            Join thousands building smarter financial habits. Free forever, no credit card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative z-10">
            <a href="#" className="px-8 py-4 bg-[#16A34A] text-white hover:bg-[#15803D] rounded-2xl font-semibold text-sm inline-flex items-center gap-2 no-underline shadow-md shadow-green-600/10 hover:scale-[1.02] transition-all duration-200">
              Get Started Free
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#" className="px-8 py-4 bg-white text-[#111111] border border-border hover:bg-gray-50 rounded-2xl font-semibold text-sm no-underline shadow-sm hover:scale-[1.02] transition-all duration-200">See the Demo</a>
          </div>
          <p className="text-[0.68rem] text-text-muted mt-[14px] relative">
            No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; GDPR compliant
          </p>
        </div>
      </div>
    </section>
  );
}
