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
    description: 'Know your balance three weeks from now. Paydays, bills, and surprises - mapped before they happen.',
  },
  {
    icon: ShieldAlert,
    title: 'Anomaly Detection',
    description: "Spotted a charge you don't recognize? PennyWise flags it before your bank does.",
  },
  {
    icon: SlidersHorizontal,
    title: 'Living Budgets',
    description: 'Not a spreadsheet. Budgets that update when your life does - raises, moves, new subscriptions.',
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

const ScreenShot = ({ name, alt, className = '', style }) => (
  <>
    <img
      src={`${import.meta.env.BASE_URL}${name}-light.png`}
      alt={alt}
      className={`w-full block dark:hidden ${className}`}
      style={style}
      draggable={false}
    />
    <img
      src={`${import.meta.env.BASE_URL}${name}-dark.png`}
      alt={alt}
      className={`w-full hidden dark:block ${className}`}
      style={style}
      draggable={false}
    />
  </>
);

const bentoCards = [
  {
    id: 1,
    colSpan: 'lg:col-span-8 lg:row-span-2 flex flex-col',
    title: 'Expense Tracking',
    subtitle: 'Automatically categorize every transaction the moment it happens. From coffee to rent, nothing slips through the cracks.',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 6.5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </div>
    ),
    content: (
      <div className="mt-5 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 overflow-hidden rounded-b-2xl flex-1 min-h-[200px]">
        <ScreenShot name="feat-transactions" alt="Transactions screen" className="object-cover h-full w-full [object-position:40%_0]" />
      </div>
    ),
  },
  {
    id: 2,
    colSpan: 'lg:col-span-4 lg:row-span-1 flex flex-col',
    title: 'Smart Budgeting',
    subtitle: 'AI-powered budget recommendations that adapt to your lifestyle.',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2.5 8h15" stroke="currentColor" strokeWidth="1.4" /><path d="M6 12h2M12 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
      </div>
    ),
    content: (
      <div className="mt-4 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 overflow-hidden rounded-b-2xl" style={{ height: 180 }}>
        <ScreenShot name="feat-budgets" alt="Budgets screen" className="object-cover h-full w-full [object-position:40%_0]" />
      </div>
    ),
  },
  {
    id: 3,
    colSpan: 'lg:col-span-4 lg:row-span-1 flex flex-col',
    title: 'Financial Insights',
    subtitle: 'Understand spending patterns through actionable visualizations.',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 16l4-5.5 3.5 2.5 4-7 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
    ),
    content: (
      <div className="mt-4 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 overflow-hidden rounded-b-2xl" style={{ height: 180 }}>
        <ScreenShot name="feat-insights" alt="Insights screen" className="object-cover h-full w-full [object-position:40%_0]" />
      </div>
    ),
  },
  {
    id: 4,
    colSpan: 'lg:col-span-12 lg:row-span-1 flex flex-col',
    title: 'Goal Setting',
    subtitle: 'Set savings milestones and celebrate achievements. PennyWise keeps you on course.',
    icon: (
      <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="1.2" fill="currentColor" /></svg>
      </div>
    ),
    content: (
      <div className="mt-4 -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 overflow-hidden rounded-b-2xl" style={{ height: 220 }}>
        <ScreenShot name="feat-goals" alt="Goals screen" className="object-cover h-full w-full [object-position:40%_0]" />
      </div>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">

        {/* Part A: AI capabilities overview */}
        <AnimatedContainer className="mb-14 max-w-2xl">
          <h2 className="font-display font-black text-[clamp(2.2rem,5vw,3.8rem)] text-text leading-[1.05] tracking-[-0.03em] mb-4">
            Six ways PennyWise thinks so you don&apos;t have to
          </h2>
          <p className="text-text-muted text-[1.05rem] leading-[1.7]">
            An AI engine running 24/7 on your finances. Categorizing, forecasting, protecting, optimizing.
          </p>
        </AnimatedContainer>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 divide-x divide-y divide-dashed border border-dashed border-[var(--border)] rounded-2xl overflow-hidden mb-28">
          {featureCards.map((card, i) => (
            <FeatureCard key={card.title} {...card} delay={i * 0.08} />
          ))}
        </div>

        {/* Part B: Product widget showcase */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display font-black text-[clamp(2.2rem,5vw,3.8rem)] text-text leading-[1.05] tracking-[-0.03em] max-w-xl">
              The instruments under the hood
            </h2>
          </div>
          <p className="text-text-muted text-[1.05rem] leading-[1.7] max-w-xs lg:max-w-sm mb-2">
            Four purpose-built widgets, working together to give you complete financial clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {bentoCards.map((card) => (
            <div
              key={card.id}
              className={`reveal ${card.colSpan} glass-card benefit p-5 sm:p-8`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    {card.icon}
                    <h3 className="font-bold text-[1.2rem] text-text tracking-[-0.02em]">{card.title}</h3>
                  </div>
                  <p className="text-[0.85rem] text-text-muted leading-[1.6] max-w-[90%]">{card.subtitle}</p>
                </div>
              </div>
              {card.content}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
