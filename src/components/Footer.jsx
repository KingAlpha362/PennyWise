import { useEffect, useState } from 'react';

export default function Footer() {
  const [isDark, setIsDark] = useState(() => typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <footer id="contact" className="relative border-t border-border pt-16 sm:pt-20 pb-10 bg-[var(--bg-subtle)] text-text overflow-hidden">
      {/* Soft fade from previous section */}
      {/* Soft fade from previous section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-bg z-[5] pointer-events-none" />



      <div className="max-w-7xl mx-auto px-6 md:px-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 mb-20">

          {/* Left Column - Brand & Newsletter */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              {isDark ? (
                <img
                  src={`${import.meta.env.BASE_URL}PennyWhite.png`}
                  alt="PennyWise Logo"
                  className="h-12 w-auto object-contain transition-all"
                />
              ) : (
                <img
                  src={`${import.meta.env.BASE_URL}PennyDark.png`}
                  alt="PennyWise Logo"
                  className="h-12 w-auto object-contain transition-all"
                />
              )}
            </div>
            <p className="text-[0.85rem] leading-[1.6] max-w-[300px] mb-6">
              The hub of your financial life. Track, save, and grow your wealth alongside intelligent AI recommendations.
            </p>

            <div className="flex gap-4 mb-10">
              {/* X / Twitter */}
              <a href="#" className="hover:text-text transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.766l7.65-8.724L2.25 2.25h6.775l4.26 5.631 5.96-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="hover:text-text transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.083 0 12 0 12s0 3.917.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.917 24 12 24 12s0-3.917-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="hover:text-text transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>
              </a>
              {/* TikTok */}
              <a href="#" className="hover:text-text transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.32 6.32 6.32 0 0 0 6.22-6.22V10a8.27 8.27 0 0 0 4.1 1.15V7.63a5.05 5.05 0 0 1-2-1.04z" /></svg>
              </a>
              {/* Discord */}
              <a href="#" className="hover:text-text transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" /></svg>
              </a>
            </div>

            <div className="mb-2 text-text font-bold text-[0.8rem] tracking-wide">Subscribe & Get 50% Off</div>
            <p className="text-[0.75rem] leading-[1.6] max-w-[280px] mb-4">
              Join the newsletter and get a unique 50% off code for your first 3 months on Basic or Pro.
            </p>

            <form className="flex w-full max-w-[300px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[rgba(255,255,255,0.03)] border border-border border-r-0 rounded-l-md px-4 py-2 text-sm text-text focus:outline-none focus:border-[rgba(255,255,255,0.2)] w-full placeholder:text-text-muted transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-text text-bg px-4 py-2 rounded-r-md flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </form>
          </div>

          {/* Right Columns - Links */}
          <div className="md:col-span-12 lg:col-span-8 grid grid-cols-2 md:grid-cols-5 gap-8">

            <div>
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-5 text-text-muted">Product</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Features</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Spend Analytics</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Debt Payoff</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Shared Accounts</a>
              </div>
            </div>

            <div>
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-5 text-text-muted">Explore</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Docs <span className="ml-1 opacity-50">↗</span></a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Open Source</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Blog</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Careers</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Merch</a>
              </div>
            </div>

            <div>
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-5 text-text-muted">Learn</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Investing 101</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">What is Fire?</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Debt Snowball</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Pricing</a>
              </div>
            </div>

            <div>
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-5 text-text-muted">Company</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">About Us</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Changelog</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Roadmap</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Media Assets</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Contact Us</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Bug Bounty</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Sitemap</a>
              </div>
            </div>

            <div>
              <div className="text-[0.7rem] font-bold tracking-[0.14em] uppercase mb-5 text-text-muted">Community</div>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Discord</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">Events</a>
                <a href="#" className="text-[0.8rem] hover:text-text transition-colors">ViewCreator <span className="ml-1 opacity-50">↗</span></a>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.75rem]">© 2026 PennyWise AI. All rights reserved.</p>
          <div className="flex gap-8 text-[0.75rem]">
            <a href="#" className="hover:text-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-text transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
