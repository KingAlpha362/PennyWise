import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import { Header } from './components/ui/header-2';
import Hero from './components/Hero';
import Features from './components/Features';
import Benefits from './components/Benefits';
import DashboardPreview from './components/DashboardPreview';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import SecurityIntegrations from './components/SecurityIntegrations';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ROICalculator from './components/ROICalculator';
import FAQ from './components/FAQ';
const DashboardApp = lazy(() => import('./components/DashboardApp'));
import AuthForm from './components/AuthForm';

export default function App() {
  const [appView, setAppView] = useState('landing');
  const [theme, setTheme] = useState('dark');
  const mainRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const getStarted = () => setAppView('signup');

  useLayoutEffect(() => {
    if (appView !== 'dashboard') document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [appView, theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [appView]);

  useEffect(() => {
    if (appView !== 'landing') return;
    const fills = document.querySelectorAll('.prog-fill[data-w]');
    const fill = el => { el.style.width = Math.max(0, Math.min(100, Number(el.dataset.w))) + '%'; };
    if (reducedMotion || !('IntersectionObserver' in window)) { fills.forEach(fill); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { fill(entry.target); observer.unobserve(entry.target); }
    }), { threshold: 0.5 });
    fills.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [appView, reducedMotion]);

  return <MotionConfig reducedMotion="user">
    <main ref={mainRef} tabIndex={-1} className="app-root min-h-screen bg-bg text-text">
      {appView === 'dashboard' ? <Suspense fallback={<p role="status" className="p-8">Loading demo dashboard…</p>}><DashboardApp onSignOut={() => setAppView('landing')} /></Suspense> :
      appView === 'signin' || appView === 'signup' ? <AuthForm initialMode={appView} onAuthSuccess={() => setAppView('dashboard')} onBack={() => setAppView('landing')} /> : <>
        <Header onSignIn={() => setAppView('signin')} onGetStarted={getStarted} theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />
        <Hero onGetStarted={getStarted} />
        <HowItWorks />
        <ROICalculator onGetStarted={getStarted} />
        <SecurityIntegrations />
        <Features />
        <Benefits />
        <DashboardPreview />
        <Pricing onGetStarted={getStarted} />
        <FAQ />
        <CTA onGetStarted={getStarted} />
        <Footer />
      </>}
    </main>
  </MotionConfig>;
}
