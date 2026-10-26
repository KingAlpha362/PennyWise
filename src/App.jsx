import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import EditorialLanding from './components/EditorialLanding';
const DashboardApp = lazy(() => import('./components/DashboardApp'));
import AuthForm from './components/AuthForm';

export default function App() {
  const [appView, setAppView] = useState('landing');
  const [theme, setTheme] = useState('light');
  const mainRef = useRef(null);
  const getStarted = () => setAppView('signup');

  useLayoutEffect(() => {
    if (appView !== 'dashboard') document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [appView, theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    mainRef.current?.focus({ preventScroll: true });
  }, [appView]);


  return <MotionConfig reducedMotion="user">
    <main ref={mainRef} tabIndex={-1} className="app-root min-h-screen bg-bg text-text">
      {appView === 'dashboard' ? <Suspense fallback={<p role="status" className="p-8">Loading demo dashboard…</p>}><DashboardApp onSignOut={() => setAppView('landing')} /></Suspense> :
      appView === 'signin' || appView === 'signup' ? <AuthForm initialMode={appView} onAuthSuccess={() => setAppView('dashboard')} onBack={() => setAppView('landing')} /> : <EditorialLanding onGetStarted={getStarted} onSignIn={() => setAppView('signin')} theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />}
    </main>
  </MotionConfig>;
}
