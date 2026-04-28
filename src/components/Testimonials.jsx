import React from 'react';
import ShapeGrid from './ui/ShapeGrid';

export default function Testimonials() {
  const testimonialsTop = [
    {
      text: "PennyWise replaced three different apps for me. The subtle AI budget recommendations are eerily accurate.",
      author: "Sarah Jenkins", role: "Product Designer", color: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      text: "I've always hated tracking expenses. The automated categorization and beautiful insights make checking my finances something I actually look forward to.",
      author: "Marcus Chen", role: "Software Engineer", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    },
    {
      text: "The most elegant finance tool I've used. It doesn't lecture you—it just gives you the exact data you need to make better decisions.",
      author: "Elena Rodriguez", role: "Freelancer", color: "bg-purple-500/10 text-purple-400 border-purple-500/20"
    },
    {
      text: "The cash flow forecasting is unmatched. I can see exactly when to invest in new inventory without stressing over next month's payroll.",
      author: "David Kim", role: "Small Business Owner", color: "bg-amber-500/10 text-amber-400 border-amber-500/20"
    }
  ];

  const testimonialsBottom = [
    {
      text: "Between student loans and crazy hours, my finances were a mess. PennyWise organizes everything automatically. The debt payoff planner is brilliant.",
      author: "Aisha Patel", role: "Medical Resident", color: "bg-rose-500/10 text-rose-400 border-rose-500/20"
    },
    {
      text: "I've tried every budget tool on the market. PennyWise is the only one that actually feels built for the modern era. Fast, beautiful, and incredibly sharp.",
      author: "James Wilson", role: "Marketing Director", color: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      text: "Setting up joint accounts used to be a nightmare. PennyWise made it seamless to track shared expenses while keeping personal spending private.",
      author: "Taylor Reed", role: "Architect", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    },
    {
      text: "The interface is so clean it actually calms my financial anxiety. For the first time, I have total clarity on my net worth progression.",
      author: "Michael Chang", role: "UX Researcher", color: "bg-orange-500/10 text-orange-400 border-orange-500/20"
    }
  ];

  const renderCard = (item, i) => (
    <div key={i} className="glass-card rounded-2xl p-8 border border-border bg-bg-card shadow-sm flex flex-col justify-between h-[260px] w-[350px] shrink-0 hover:scale-[1.02] transition-transform duration-300">
      <div className="mb-6">
        <div className="flex gap-1 mb-4 text-[#FBBC05]">
          {[...Array(5)].map((_, idx) => (
            <svg key={idx} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          ))}
        </div>
        <p className="text-[0.95rem] text-text-muted leading-[1.6] italic font-medium line-clamp-4">"{item.text}"</p>
      </div>
      <div className="flex items-center gap-4 border-t border-[rgba(255,255,255,0.06)] pt-5 mt-auto">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[0.85rem] font-bold tracking-wider border shadow-sm ${item.color}`}>
          {item.author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-bold text-[0.9rem] text-text tracking-tight">{item.author}</div>
          <div className="text-[0.75rem] text-text-muted">{item.role}</div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-24 overflow-hidden relative">
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

      <div className="max-w-7xl mx-auto px-6 md:px-14 mb-16 relative z-10">
        <div className="text-center reveal">
          <div className="label mb-4">Wall of Love</div>
          <h2 className="font-display font-black text-[clamp(2.5rem,5vw,4rem)] text-text leading-[1.05] tracking-[-0.03em]">
            People who <em className="text-accent">took control.</em>
          </h2>
        </div>
      </div>
      
      {/* Top Marquee */}
      <div className="flex overflow-hidden group w-full mb-6 reveal relative z-10" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex shrink-0 gap-6 pr-6 animate-marquee group-hover:[animation-play-state:paused] w-max">
          {[...testimonialsTop, ...testimonialsTop].map((item, i) => renderCard(item, i))}
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="flex overflow-hidden group w-full reveal relative z-10" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex shrink-0 gap-6 pr-6 animate-marquee-reverse group-hover:[animation-play-state:paused] w-max">
          {[...testimonialsBottom, ...testimonialsBottom].map((item, i) => renderCard(item, i))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-14">
        {/* Rating badges */}
        <div className="mt-20 pt-12 border-t border-[rgba(255,255,255,0.04)] flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 reveal">
          <div className="flex items-center gap-5">
            <div className="font-bold text-[1.3rem] tracking-tight text-text">Trustpilot</div>
            <div className="flex flex-col">
              <div className="flex gap-[3px] mb-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-[18px] h-[18px] bg-[#00b67a] flex items-center justify-center text-bg">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  </div>
                ))}
              </div>
              <div className="text-[0.7rem] text-text-muted font-semibold tracking-wider uppercase">TrustScore 4.9 • 2,400+ reviews</div>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-10 bg-border"></div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-0.5 font-sans text-[1.4rem] font-bold tracking-tight">
              <span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-[2px] mb-1 text-[#FBBC05]">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ))}
              </div>
              <div className="text-[0.7rem] text-text-muted font-semibold tracking-wider uppercase">4.9/5.0 Rating • 1,800+ reviews</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
