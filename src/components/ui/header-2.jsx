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

  React.useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    setIsDark(document.documentElement.classList.contains('dark'));
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header
      className={cn(
        'navbar fixed top-0 left-0 right-0 z-50 w-full border-b border-transparent md:transition-all md:ease-out',
        {
          'scrolled': scrolled,
          'bg-bg/80 supports-[backdrop-filter]:bg-bg/60 border-border backdrop-blur-xl md:top-4 md:mx-auto md:rounded-2xl md:border md:max-w-5xl md:shadow-[0_24px_64px_rgba(0,0,0,0.4)] px-6 md:px-8':
            scrolled && !open,
          'bg-bg/95 backdrop-blur-xl px-6 md:px-14': open,
          'px-6 md:px-14': !scrolled && !open,
        }
      )}
    >
      <nav
        className={cn(
          'mx-auto flex h-20 w-full max-w-7xl items-center justify-between md:h-24 md:transition-all md:ease-out',
          {
            'md:h-16': scrolled,
          }
        )}
      >
        <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-2.5 no-underline text-inherit">
          {isDark ? (
            <img 
              src={`${import.meta.env.BASE_URL}PennyWhite.png`} 
              alt="PennyWise Logo" 
              className="h-14 md:h-20 w-auto object-contain transition-all" 
            />
          ) : (
            <img 
              src={`${import.meta.env.BASE_URL}PennyDark.png`} 
              alt="PennyWise Logo" 
              className="h-14 md:h-20 w-auto object-contain transition-all" 
            />
          )}
        </a>
        
        <div className="hidden items-center gap-2 md:flex">
          {links.map((link, i) => (
            <a key={i} className={buttonVariants({ variant: 'ghost' })} href={link.href}>
              {link.label}
            </a>
          ))}
          <Button variant="ghost" onClick={toggleTheme} aria-label="Toggle Theme" className="ml-2 px-3">
            🌓
          </Button>
          <button className="btn-secondary ml-2" onClick={onSignIn}>Sign In</button>
          <button className="btn-primary" onClick={onSignIn}>Get Started</button>
        </div>
        
        <div className="flex items-center gap-2 md:hidden">
          <Button size="icon" variant="ghost" onClick={toggleTheme} aria-label="Toggle Theme">
            🌓
          </Button>
          <Button size="icon" variant="ghost" onClick={() => setOpen(!open)}>
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          'bg-white dark:bg-zinc-950 fixed top-20 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t border-border md:hidden',
          open ? 'block' : 'hidden'
        )}
      >
        <div
          data-slot={open ? 'open' : 'closed'}
          className={cn(
            'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
            'flex h-full w-full flex-col justify-between gap-y-2 p-6'
          )}
        >
          <div className="grid gap-y-4 mt-8">
            {links.map((link) => (
              <a
                key={link.label}
                className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 no-underline"
                href={link.href}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-4 mb-12">
            <button className="btn-secondary w-full py-6 text-lg rounded-xl" onClick={onSignIn}>
              Sign In
            </button>
            <button className="btn-primary w-full py-6 text-lg rounded-xl" onClick={onSignIn}>Get Started</button>
          </div>
        </div>
      </div>
    </header>
  );
}
