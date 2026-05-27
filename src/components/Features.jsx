import { Zap, TrendingUp, ShieldAlert, SlidersHorizontal, Target, MessageSquare } from 'lucide-react';
import { FeatureCard, AnimatedContainer } from './ui/grid-feature-cards';

const featureCards = [
  {
    icon: Zap,
    title: 'Instant Categorization',
    description: 'Zero sorting, ever. Every transaction is tagged, labeled, and filed the moment it hits your account.',
  },
  {
    icon: TrendingUp,
    title: '30-Day Cash Forecast',
    description: 'Know your balance three weeks from now. Paydays, bills, and surprises — mapped before they happen.',
  },
  {
    icon: ShieldAlert,
    title: 'Anomaly Detection',
    description: "Spotted a charge you don't recognize? PennyWise flags it before your bank does.",
  },
  {
    icon: SlidersHorizontal,
    title: 'Living Budgets',
    description: 'Not a spreadsheet. Budgets that update when your life does — raises, moves, new subscriptions.',
  },
  {
    icon: Target,
    title: 'Goal Pathfinding',
    description: 'Tell it what you want. It calculates exactly how fast you can get there and reroutes when plans shift.',
  },
  {
    icon: MessageSquare,
    title: 'Talk to Your Money',
    description: "Ask anything. 'How much did I spend on food in March?' Get an answer instantly, no dashboards.",
  },
];

const ScreenShot = ({ name, alt }) => (
  <>
    <img
      src={`${import.meta.env.BASE_URL}${name}-light.png`}
      alt={alt}
      className="block w-full h-auto dark:hidden"
      draggable={false}
    />
    <img
      src={`${import.meta.env.BASE_URL}${name}-dark.png`}
      alt={alt}
      className="hidden dark:block w-full h-auto"
      draggable={false}
    />
  </>
);

const bentoCards = [
  {
    id: 1,
    title: 'Expense Tracking',
    subtitle: 'Every transaction categorized the moment it happens — nothing slips through.',
    badge: 'Most used',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text shrink-0">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 6.5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </div>
    ),
    screenshot: 'feat-transactions',
    screenshotAlt: 'Transactions screen',
  },
  {
    id: 2,
    title: 'Smart Budgeting',
    subtitle: 'AI-powered budget recommendations that adapt to your lifestyle.',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text shrink-0">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2.5 8h15" stroke="currentColor" strokeWidth="1.4" /><path d="M6 12h2M12 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </div>
    ),
    screenshot: 'feat-budgets',
    screenshotAlt: 'Budgets screen',
  },
  {
    id: 3,
    title: 'Financial Insights',
    subtitle: 'Understand spending patterns through actionable visualizations.',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text shrink-0">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 16l4-5.5 3.5 2.5 4-7 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    ),
    screenshot: 'feat-insights',
    screenshotAlt: 'Insights screen',
  },
  {
    id: 4,
    title: 'Goal Setting',
    subtitle: 'Set savings milestones and celebrate every achievement, week by week.',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text shrink-0">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="1.2" fill="currentColor" /></svg>
      </div>
    ),
    screenshot: 'feat-goals',
    screenshotAlt: 'Goals screen',
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[var(--bg-subtle)] py-16 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">

        {/* Part A: AI capabilities overview */}
        <AnimatedContainer className="mb-14 max-w-2xl">
          <p className="text-[var(--accent)] text-sm font-semibold tracking-widest uppercase mb-3">Capabilities</p>
          <h2 className="font-display font-black text-[clamp(2.2rem,5vw,3.8rem)] text-text leading-[1.05] tracking-[-0.03em] mb-4">
            Six ways PennyWise<br/>thinks so you don&apos;t have to
          </h2>
          <p className="text-text-muted text-[1.05rem] leading-[1.7]">
            An AI engine running 24/7 on your finances. Categorizing, forecasting, protecting, optimizing.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-28">
          {featureCards.map((card, i) => (
            <FeatureCard key={card.title} {...card} delay={i * 0.08} />
          ))}
        </div>

        {/* Part B: Product widget showcase */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <p className="text-[var(--accent)] text-sm font-semibold tracking-widest uppercase mb-3">Product</p>
            <h2 className="font-display font-black text-[clamp(2.2rem,5vw,3.8rem)] text-text leading-[1.05] tracking-[-0.03em] max-w-xl">
              The instruments under the hood
            </h2>
          </div>
          <p className="text-text-muted text-[1.05rem] leading-[1.7] max-w-xs lg:max-w-sm mb-2">
            Four purpose-built screens, working together to give you complete financial clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6 sm:gap-y-12">
          {bentoCards.map((card) => (
            <div key={card.id} className="reveal flex flex-col gap-4">
              <div className="flex items-start gap-3 md:min-h-[60px]">
                {card.icon}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-[1.1rem] text-text tracking-[-0.02em]">{card.title}</h3>
                    {card.badge && (
                      <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-[var(--accent-dim)] text-[var(--accent)]">
                        {card.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[0.83rem] text-text-muted leading-[1.6] mt-0.5">{card.subtitle}</p>
                </div>
              </div>

              {/* Linear-style floating screenshot panel */}
              <div className="relative">
                <div
                  aria-hidden
                  className={`hidden sm:block absolute -inset-5 -z-10 rounded-[32px] blur-2xl opacity-70 ${
                    card.badge
                      ? 'bg-[radial-gradient(closest-side,var(--accent-dim),transparent)]'
                      : 'bg-[radial-gradient(closest-side,rgba(15,23,42,0.10),transparent)]'
                  }`}
                />
                <div className="rounded-2xl overflow-hidden bg-[var(--bg-card)] ring-1 ring-black/[0.06] dark:ring-white/[0.08] shadow-[0_2px_10px_-3px_rgba(15,23,42,0.14)] sm:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.30),0_8px_24px_-12px_rgba(15,23,42,0.16)] dark:sm:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7),0_8px_24px_-12px_rgba(0,0,0,0.5)] transition-[transform,box-shadow] duration-300 ease-out motion-safe:sm:hover:-translate-y-1.5 sm:hover:shadow-[0_40px_90px_-28px_rgba(15,23,42,0.38),0_12px_28px_-12px_rgba(15,23,42,0.18)]">
                  <div className="relative">
                    <div aria-hidden className="absolute inset-x-0 top-0 h-px z-10 bg-white/70 dark:bg-white/10" />
                    <ScreenShot name={card.screenshot} alt={card.screenshotAlt} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
