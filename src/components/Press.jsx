import React from 'react';

export default function Press() {
  const logos = [
    {
      id: 'forbes',
      content: <span className="font-serif font-bold text-[1.8rem] text-text">Forbes</span>
    },
    {
      id: 'techcrunch',
      content: (
        <div className="flex items-center gap-1.5">
          <div className="bg-[#00A562] text-white font-black text-[1rem] px-1.5 py-0.5 rounded-sm tracking-tighter">TC</div>
          <span className="font-bold text-[1.4rem] tracking-tight text-[#00A562]">TechCrunch</span>
        </div>
      )
    },
    {
      id: 'theverge',
      content: (
        <div className="flex items-center gap-1.5">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2z" fill="#fa4b4b" />
            <path d="M12 8.5L7 19h10L12 8.5z" fill="var(--bg)" />
          </svg>
          <span className="font-display font-bold text-[1.5rem] tracking-tight text-[#fa4b4b]">The Verge</span>
        </div>
      )
    },
    {
      id: 'wired',
      content: <span className="font-sans font-black tracking-tighter text-[1.5rem] uppercase text-text">WIRED</span>
    },
    {
      id: 'cnbc',
      content: (
        <div className="flex items-center gap-2">
          <div className="flex items-end h-[24px]">
            <div className="w-[5px] h-[16px] bg-[#0089D0] rounded-t-full transform -rotate-[40deg] origin-bottom-right"></div>
            <div className="w-[5px] h-[20px] bg-[#E31837] rounded-t-full transform -rotate-[15deg] origin-bottom-right -ml-[2px]"></div>
            <div className="w-[5px] h-[24px] bg-[#FFB81C] rounded-t-full -ml-[1px]"></div>
            <div className="w-[5px] h-[20px] bg-[#00A650] rounded-t-full transform rotate-[15deg] origin-bottom-left -ml-[1px]"></div>
            <div className="w-[5px] h-[16px] bg-[#662483] rounded-t-full transform rotate-[40deg] origin-bottom-left -ml-[2px]"></div>
          </div>
          <span className="font-sans font-black tracking-tighter text-[1.6rem] uppercase text-text">CNBC</span>
        </div>
      )
    },
    {
      id: 'bloomberg',
      content: <span className="font-sans font-bold tracking-tight text-[1.5rem] text-text">Bloomberg</span>
    },
    {
      id: 'fastcompany',
      content: (
        <span className="font-sans text-[1.5rem] tracking-tight text-[#D8262C]">
          <span className="italic font-bold">FAST</span>
          <span className="font-black">COMPANY</span>
        </span>
      )
    },
    {
      id: 'wsj',
      content: (
        <div className="flex flex-col leading-[1.1] font-serif font-black text-text text-[0.65rem] uppercase tracking-widest border-l-2 border-text pl-2">
          <span>The Wall</span>
          <span>Street</span>
          <span>Journal.</span>
        </div>
      )
    },
    {
      id: 'nyt',
      content: <span className="font-serif font-black tracking-tight text-[1.6rem] text-text">The New York Times</span>
    },
    {
      id: 'bi',
      content: <span className="font-sans font-black tracking-tighter text-[1.4rem] uppercase text-text">Business Insider</span>
    }
  ];

  return (
    <section className="py-10 md:py-16 border-b border-border/50 bg-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <p className="text-[0.65rem] md:text-[0.75rem] font-bold tracking-[0.2em] text-text-muted uppercase mb-10 md:mb-12 reveal">
          As Featured In
        </p>
      </div>
      
      {/* Marquee Container */}
      <div className="flex overflow-hidden group w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex shrink-0 gap-16 md:gap-24 pr-16 md:pr-24 animate-marquee group-hover:[animation-play-state:paused] w-max">
          {logos.map((logo) => (
            <div key={logo.id} className="flex items-center justify-center cursor-default">
              {logo.content}
            </div>
          ))}
        </div>
        <div className="flex shrink-0 gap-16 md:gap-24 pr-16 md:pr-24 animate-marquee group-hover:[animation-play-state:paused] w-max" aria-hidden="true">
          {logos.map((logo) => (
            <div key={`${logo.id}-copy`} className="flex items-center justify-center cursor-default">
              {logo.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
