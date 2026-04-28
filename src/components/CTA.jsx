export default function CTA() {
  return (
    <section className="px-6 md:px-14 py-24">
      <div className="max-w-3xl mx-auto reveal">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden" style={{ borderColor: 'rgba(201,185,154,0.14)' }}>
          <div className="orb" style={{ width: '450px', height: '450px', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'radial-gradient(circle,rgba(201,185,154,0.08) 0%,transparent 65%)' }}></div>
          <div className="label mb-5 relative">Start Today — It's Free</div>
          <h2 className="font-display relative" style={{ fontSize: 'clamp(2.2rem,5vw,4rem)', lineHeight: '1.04', letterSpacing: '-0.035em', marginBottom: '14px' }}>
            Your money.<br />Your rules.
          </h2>
          <p className="text-text-muted text-[0.92rem] max-w-[400px] mx-auto mb-[30px] leading-[1.74] relative">
            Join thousands building smarter financial habits. Free forever, no credit card required.
          </p>
          <div className="flex flex-wrap gap-3 justify-center relative">
            <a href="#" className="btn-primary px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2 no-underline">
              Get Started Free
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a href="#" className="btn-ghost px-8 py-4 rounded-full font-semibold text-sm no-underline text-inherit">See the Demo</a>
          </div>
          <p className="text-[0.68rem] text-text-muted mt-[14px] relative">
            No credit card required &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; GDPR compliant
          </p>
        </div>
      </div>
    </section>
  );
}
