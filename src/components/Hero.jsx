
export default function Hero({ onGetStarted }) {
  return (
    <section
      id="home"
      className="relative bg-bg overflow-hidden"
      style={{ paddingTop: 'clamp(7rem, 12vw, 11rem)', paddingBottom: 0 }}
    >
      {/* ── Centered copy ── */}
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="label mb-6 inline-flex text-accent border-accent/20">
          AI-powered personal finance
        </div>

        <h1
          className="hero-title"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 4.4rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          See Where Every{' '}
          <em className="text-accent not-italic">Cent Goes.</em>
          <br />Instantly.
        </h1>

        <p className="mt-5 text-base md:text-[1.05rem] leading-relaxed max-w-[500px] mx-auto text-text-muted">
          Connect your accounts once. PennyWise reads every transaction, flags every
          anomaly, and maps your next 30 days - automatically. Users save an average of{' '}
          <strong className="text-text">$156/month</strong> in their first 30 days.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-9 justify-center">
          <button
            onClick={onGetStarted}
            className="btn-primary inline-flex items-center justify-center gap-2 text-[0.9rem] py-3 px-7"
          >
            Start free — takes 2 min
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a
            href="#features"
            className="btn-ghost inline-flex items-center justify-center no-underline text-[0.9rem] py-3 px-7"
          >
            See how it works
          </a>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-5 mt-8 mb-14">
          <div className="flex items-center gap-2">
            <span className="text-[0.8rem] text-text-muted">
              <strong className="text-text font-semibold">14,000+</strong> users saving more every month
            </span>
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="flex items-center gap-1.5 text-[0.8rem] text-text-muted">
            <span className="text-yellow-500 text-sm">★★★★★</span>
            <strong className="text-text font-semibold">4.9</strong> on App Store
          </div>
          <div className="w-px h-4 bg-border hidden sm:block" />
          <div className="text-[0.8rem] text-text-muted">No credit card required</div>
        </div>
      </div>

      {/* ── Dashboard screenshot preview ── */}
      <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-16">
        {/* gradient fade to page bg */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, var(--bg) 100%)' }}
        />

        {/* preview frame */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--border)] p-2 shadow-2xl ring-1 ring-[var(--bg)]"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.06) inset, 0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)' }}
        >
          {/* light screenshot — hidden in dark mode */}
          <img
            src={`${import.meta.env.BASE_URL}dash-light.png`}
            alt="PennyWise dashboard — light mode"
            className="w-full rounded-xl block dark:hidden"
            draggable={false}
          />
          {/* dark screenshot — shown in dark mode only */}
          <img
            src={`${import.meta.env.BASE_URL}dash-dark.png`}
            alt="PennyWise dashboard — dark mode"
            className="w-full rounded-xl hidden dark:block"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
