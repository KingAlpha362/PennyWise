import React from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

export function Header({ onSignIn }) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Benefits', href: '#benefits' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const [isDark, setIsDark] = React.useState(false);

  // Sync dark-mode state
  React.useEffect(() => {
    const update = () =>
      setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    update();
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close menu on scroll (user swiped up to reveal page)
  React.useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const toggleTheme = () => document.documentElement.classList.toggle('dark');
  const close = () => setOpen(false);

  return (
    // The header is the single stacking context; everything lives inside it.
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full border-b border-black/10 transition-all ease-out duration-300',
        scrolled && !open &&
        'bg-bg/80 supports-[backdrop-filter]:bg-bg/60 border-black/20 backdrop-blur-xl md:top-4 md:mx-auto md:rounded-2xl md:border md:max-w-5xl md:shadow-[0_24px_64px_rgba(0,0,0,0.4)]',
        open && 'bg-bg/95 backdrop-blur-xl',
        !scrolled && !open && 'bg-transparent',
      )}
    >
      {/* ── Top bar ── */}
      <nav
        className={cn(
          'mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-14',
          'h-16 sm:h-20 md:h-24 transition-[height] ease-out duration-300',
          scrolled && 'md:h-16',
        )}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={close}
          className="flex items-center gap-2.5 no-underline text-inherit shrink-0"
          aria-label="PennyWise home"
        >
          {/* Single <img> toggled via CSS avoids a flash on re-render */}
          <img
            src={`${import.meta.env.BASE_URL}${isDark ? 'PennyWhite.png' : 'PennyDark.png'}`}
            alt="PennyWise"
            className={cn(
              "w-auto object-contain transition-all duration-300",
              scrolled ? "h-8 sm:h-9 md:h-11" : "h-10 sm:h-12 md:h-17"
            )}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a key={i} className={buttonVariants({ variant: 'ghost' })} href={link.href}>
              {link.label}
            </a>
          ))}
          <Button
            variant="ghost"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-2 px-3"
          >
            🌓
          </Button>
          <button className="btn-secondary ml-2" onClick={onSignIn}>Sign In</button>
          <button className="btn-primary" onClick={onSignIn}>Get Started</button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Toggle theme">
            🌓
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </Button>
        </div>
      </nav>

      {/* ── Mobile slide-down drawer ──────────────────────────────────────────
          Lives INSIDE <header> so it shares the same z-index context.
          Height is animated via grid-template-rows (no JS height math needed). */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={cn(
          'md:hidden overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out',
          'grid',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        {/* Inner wrapper: min-h-0 lets grid collapse this to 0 */}
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col justify-between gap-6 px-5 sm:px-8 pb-8 pt-4 border-t border-border">

            {/* Nav links — each at least 44 px tall for touch */}
            <nav className="flex flex-col divide-y divide-border/50">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={close}
                  className={cn(
                    'flex items-center text-xl font-semibold text-text no-underline',
                    'min-h-[52px] py-2',                       // ≥ 44 px touch target
                    'transition-colors hover:text-primary active:opacity-70',
                  )}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3">
              <button
                className="btn-secondary w-full py-4 text-base rounded-xl"
                onClick={() => { close(); onSignIn(); }}
              >
                Sign In
              </button>
              <button
                className="btn-primary w-full py-4 text-base rounded-xl"
                onClick={() => { close(); onSignIn(); }}
              >
                Get Started
              </button>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
