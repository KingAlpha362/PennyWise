import React from 'react';

export default function Features() {
  const cards = [
    {
      id: 1,
      colSpan: 'lg:col-span-8 lg:row-span-2 flex flex-col justify-between',
      title: 'Expense Tracking',
      subtitle: 'Automatically categorize every transaction the moment it happens. From coffee to rent — nothing slips through the cracks.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 6.5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </div>
      ),
      content: (
        <div className="flex flex-col gap-2 mt-6">
          <div className="flex items-center justify-between bg-[rgba(255,255,255,0.04)] rounded-xl py-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(201,185,154,0.1)] flex items-center justify-center text-[1.1rem]">🛒</div>
              <div><div className="text-[0.85rem] font-semibold">Grocery Store</div><div className="text-[0.7rem] text-text-muted mt-0.5">Today, 10:24 AM</div></div>
            </div>
            <span className="text-[0.9rem] font-bold text-text">−$64.20</span>
          </div>
          <div className="flex items-center justify-between bg-[rgba(255,255,255,0.04)] rounded-xl py-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(201,185,154,0.1)] flex items-center justify-center text-[1.1rem]">☕</div>
              <div><div className="text-[0.85rem] font-semibold">Blue Bottle Coffee</div><div className="text-[0.7rem] text-text-muted mt-0.5">Yesterday, 8:05 AM</div></div>
            </div>
            <span className="text-[0.9rem] font-bold text-text">−$6.50</span>
          </div>
          <div className="flex items-center justify-between bg-[rgba(255,255,255,0.04)] rounded-xl py-3 px-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[rgba(74,222,128,0.1)] flex items-center justify-center text-[1.1rem]">💰</div>
              <div><div className="text-[0.85rem] font-semibold">Salary Deposit</div><div className="text-[0.7rem] text-text-muted mt-0.5">Dec 1, 9:00 AM</div></div>
            </div>
            <span className="text-[0.9rem] font-bold text-[#4ade80]">+$3,200</span>
          </div>
        </div>
      )
    },
    {
      id: 2,
      colSpan: 'lg:col-span-4 lg:row-span-1',
      title: 'Smart Budgeting',
      subtitle: 'AI-powered budget recommendations that adapt to your lifestyle.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" /><path d="M2.5 8h15" stroke="currentColor" strokeWidth="1.4" /><path d="M6 12h2M12 12h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
        </div>
      ),
      content: (
        <div className="flex items-center gap-4 mt-6">
          <svg width="62" height="62" viewBox="0 0 62 62">
            <circle cx="31" cy="31" r="24" stroke="rgba(255,255,255,0.07)" strokeWidth="5" fill="none" />
            <circle cx="31" cy="31" r="24" stroke="var(--accent)" strokeWidth="5" fill="none"
              strokeDasharray="105.6 45.2" strokeDashoffset="0" strokeLinecap="round"
              transform="rotate(-90 31 31)" style={{ transition: 'stroke-dasharray 1.4s ease' }} />
            <text x="31" y="35" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="var(--text)" fontFamily="Syne,sans-serif">70%</text>
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
        <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 16l4-5.5 3.5 2.5 4-7 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      ),
      content: (
        <div className="flex items-end gap-2 mt-8 h-[60px]">
          <div className="flex-1 h-[36%] bg-[rgba(201,185,154,0.25)] rounded-t-sm"></div>
          <div className="flex-1 h-[55%] bg-[rgba(201,185,154,0.32)] rounded-t-sm"></div>
          <div className="flex-1 h-[45%] bg-[rgba(201,185,154,0.28)] rounded-t-sm"></div>
          <div className="flex-1 h-[78%] bg-[rgba(201,185,154,0.45)] rounded-t-sm"></div>
          <div className="flex-1 h-[62%] bg-[rgba(201,185,154,0.38)] rounded-t-sm"></div>
          <div className="flex-1 h-[92%] bg-[rgba(201,185,154,0.55)] rounded-t-sm"></div>
          <div className="flex-1 h-full bg-accent rounded-t-sm shadow-[0_0_12px_rgba(201,185,154,0.4)]"></div>
        </div>
      )
    },
    {
      id: 4,
      colSpan: 'lg:col-span-12 lg:row-span-1',
      title: 'Goal Setting',
      subtitle: 'Set savings milestones and celebrate achievements. PennyWise keeps you on course.',
      icon: (
        <div className="w-8 h-8 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-text">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" /><circle cx="10" cy="10" r="1.2" fill="currentColor" /></svg>
        </div>
      ),
      content: (
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5 border border-[rgba(255,255,255,0.02)]">
            <div className="text-[0.7rem] text-text-muted mb-[4px] uppercase tracking-wider font-semibold">Vacation</div>
            <div className="text-[1.1rem] font-bold mb-[10px] text-text">$4,200</div>
            <div className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden"><div className="h-full bg-accent" style={{width: '84%'}}></div></div>
            <div className="text-[0.7rem] text-accent mt-[6px] font-medium">84% saved</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5 border border-[rgba(255,255,255,0.02)]">
            <div className="text-[0.7rem] text-text-muted mb-[4px] uppercase tracking-wider font-semibold">Emergency</div>
            <div className="text-[1.1rem] font-bold mb-[10px] text-text">$8,000</div>
            <div className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden"><div className="h-full bg-accent" style={{width: '60%'}}></div></div>
            <div className="text-[0.7rem] text-accent mt-[6px] font-medium">60% saved</div>
          </div>
          <div className="bg-[rgba(255,255,255,0.04)] rounded-xl p-5 border border-[rgba(255,255,255,0.02)]">
            <div className="text-[0.7rem] text-text-muted mb-[4px] uppercase tracking-wider font-semibold">New Car</div>
            <div className="text-[1.1rem] font-bold mb-[10px] text-text">$25,000</div>
            <div className="w-full h-1.5 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden"><div className="h-full bg-accent" style={{width: '30%'}}></div></div>
            <div className="text-[0.7rem] text-accent mt-[6px] font-medium">30% saved</div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="features" className="py-24 lg:py-32 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-14">
        {/* Section header */}
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
            Four precision instruments, working in concert to give you complete financial clarity.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`reveal ${card.colSpan} glass-card benefit rounded-3xl p-6 lg:p-8 border border-[rgba(255,255,255,0.06)] bg-card shadow-sm`}
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
