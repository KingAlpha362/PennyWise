import { ShoppingCart, Coffee, Wallet } from 'lucide-react';

export default function Features() {
  const cards = [
    {
      id: 1,
      colSpan: 'lg:col-span-8 lg:row-span-2 flex flex-col justify-between',
      title: 'Expense Tracking',
      subtitle: 'Automatically categorize every transaction the moment it happens. From coffee to rent, nothing slips through the cracks.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 6.5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </div>
      ),
      content: (
        <div className="flex flex-col gap-2 mt-6">
          {[
            { icon: <ShoppingCart size={16} className="text-accent" />, label: 'Grocery Store', time: 'Today, 10:24 AM', amount: '-$64.20', positive: false },
            { icon: <Coffee size={16} className="text-accent" />, label: 'Blue Bottle Coffee', time: 'Yesterday, 8:05 AM', amount: '-$6.50', positive: false },
            { icon: <Wallet size={16} className="text-accent" />, label: 'Salary Deposit', time: 'Dec 1, 9:00 AM', amount: '+$3,200', positive: true },
          ].map((tx) => (
            <div key={tx.label} className="flex items-center justify-between bg-[var(--bg-subtle)] rounded-xl py-3 px-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center">
                  {tx.icon}
                </div>
                <div>
                  <div className="text-[0.85rem] font-semibold text-text">{tx.label}</div>
                  <div className="text-[0.7rem] text-text-muted mt-0.5">{tx.time}</div>
                </div>
              </div>
              <span className={`text-[0.9rem] font-bold ${tx.positive ? 'text-accent' : 'text-text'}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 2,
      colSpan: 'lg:col-span-4 lg:row-span-1',
      title: 'Smart Budgeting',
      subtitle: 'AI-powered budget recommendations that adapt to your lifestyle.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2.5 8h15" stroke="currentColor" strokeWidth="1.4" /><path d="M6 12h2M12 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </div>
      ),
      content: (
        <div className="flex items-center gap-4 mt-6">
          <svg width="62" height="62" viewBox="0 0 62 62">
            <circle cx="31" cy="31" r="24" stroke="var(--border)" strokeWidth="5" fill="none" />
            <circle cx="31" cy="31" r="24" stroke="var(--accent)" strokeWidth="5" fill="none"
              strokeDasharray="105.6 45.2" strokeDashoffset="0" strokeLinecap="round"
              transform="rotate(-90 31 31)" style={{ transition: 'stroke-dasharray 1.4s ease' }} />
            <text x="31" y="35" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--text)">70%</text>
          </svg>
          <div className="text-[0.8rem] text-text-muted leading-[1.6]">Monthly budget<br /><strong className="text-text font-bold">$2,100</strong> of $3,000</div>
        </div>
      )
    },
    {
      id: 3,
      colSpan: 'lg:col-span-4 lg:row-span-1 flex flex-col justify-between',
      title: 'Financial Insights',
      subtitle: 'Understand spending patterns through actionable visualizations.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 16l4-5.5 3.5 2.5 4-7 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      ),
      content: (
        <div className="flex items-end gap-2 mt-8 h-[60px]">
          {[36, 55, 45, 78, 62, 92].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm bg-[var(--accent-dim)]" style={{ height: `${h}%` }} />
          ))}
          <div className="flex-1 h-full bg-accent rounded-t-sm" />
        </div>
      )
    },
    {
      id: 4,
      colSpan: 'lg:col-span-12 lg:row-span-1',
      title: 'Goal Setting',
      subtitle: 'Set savings milestones and celebrate achievements. PennyWise keeps you on course.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="1.2" fill="currentColor" /></svg>
        </div>
      ),
      content: (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          {[
            { label: 'Vacation', amount: '$4,200', pct: 84 },
            { label: 'Emergency', amount: '$8,000', pct: 60 },
            { label: 'New Car', amount: '$25,000', pct: 30 },
          ].map((goal) => (
            <div key={goal.label} className="bg-[var(--bg-subtle)] rounded-xl p-5 border border-[var(--border-card)]">
              <div className="text-[0.7rem] text-text-muted mb-[4px] uppercase tracking-wider font-semibold">{goal.label}</div>
              <div className="text-[1.1rem] font-bold mb-[10px] text-text">{goal.amount}</div>
              <div className="w-full h-1.5 bg-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full bg-accent" style={{ width: `${goal.pct}%` }} />
              </div>
              <div className="text-[0.7rem] text-accent mt-[6px] font-medium">{goal.pct}% saved</div>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-px h-8 bg-accent" />
              <span className="text-[0.8rem] text-text-muted font-bold tracking-[0.15em] uppercase">What PennyWise Does</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] text-text leading-[1.05] tracking-[-0.03em] max-w-xl">
              Built for the way<br />you think about money
            </h2>
          </div>
          <p className="text-text-muted text-[1.05rem] leading-[1.7] max-w-xs lg:max-w-sm mb-2">
            Four instruments, working together to give you complete financial clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {cards.map((card) => (
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
