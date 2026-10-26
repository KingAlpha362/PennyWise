import BrowserChrome from './ui/browser-chrome';

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
          Personal finance demo
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
          Explore sample transactions, budgets, and savings goals in one dashboard. Try the product without connecting a bank or creating an account.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mt-9 justify-center">
          <button
            onClick={onGetStarted}
            className="btn-primary inline-flex items-center justify-center gap-2 text-[0.9rem] py-3 px-7"
          >
            Explore the demo
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 6.5h10M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a
            href="#how-it-works"
            className="btn-ghost inline-flex items-center justify-center no-underline text-[0.9rem] py-3 px-7"
          >
            See how it works
          </a>
        </div>

        <p className="text-sm text-text-muted mt-8 mb-14">Fictional data. No credentials required. No money moves.</p>
      </div>

      {/* ── Dashboard screenshot preview ── */}
      <div className="relative mt-8 overflow-hidden px-2 sm:mt-12 md:mt-16">
        {/* gradient fade to page bg */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 30%, var(--bg) 100%)' }}
        />

        {/* preview frame */}
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[var(--border)]"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.06) inset, 0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.10)' }}
        >
          <BrowserChrome url="pennywise.app/dashboard" />
          {/* light screenshot — hidden in dark mode */}
          <img
            src={`${import.meta.env.BASE_URL}dash-light.png`}
            alt="PennyWise dashboard — light mode"
            width="1440" height="900" className="w-full block dark:hidden"
            draggable={false}
          />
          {/* dark screenshot — shown in dark mode only */}
          <img
            src={`${import.meta.env.BASE_URL}dash-dark.png`}
            alt="PennyWise dashboard — dark mode"
            width="1440" height="900" className="w-full hidden dark:block"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
