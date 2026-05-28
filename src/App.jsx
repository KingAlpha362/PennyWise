import { useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header } from './components/ui/header-2';
import Hero from './components/Hero';
import Press from './components/Press';
import Stats from './components/Stats';
import Features from './components/Features';
import Benefits from './components/Benefits';
import DashboardPreview from './components/DashboardPreview';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import HowItWorks from './components/HowItWorks';
import SecurityIntegrations from './components/SecurityIntegrations';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ComparisonTable from './components/ComparisonTable';
import ROICalculator from './components/ROICalculator';
import FAQ from './components/FAQ';
import DashboardApp from './components/DashboardApp';
import AuthForm from './components/AuthForm';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const [appView, setAppView] = useState('landing'); // landing, dashboard, signin, signup

  useLayoutEffect(() => {
    if (appView !== 'dashboard') {
      document.documentElement.classList.add('dark');
    }
  }, [appView]);

  useGSAP(() => {
    // GSAP Scroll reveal
    ScrollTrigger.batch('.reveal', {
      onEnter: (elements) => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true
        });
      },
      once: true
    });
  });

  useEffect(() => {
    // Progress fills observer
    const progObserver = new IntersectionObserver((entries, io) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target;
          const width = el.getAttribute('data-w');
          if (width) {
            el.style.width = width + '%';
          }
          io.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.prog-fill[data-w]').forEach((el) => progObserver.observe(el));

    return () => {
      progObserver.disconnect();
    };
  }, []);

  if (appView === 'dashboard') {
    return <DashboardApp onSignOut={() => setAppView('landing')} />;
  }

  if (appView === 'signin') {
    return <AuthForm initialMode="signin" onAuthSuccess={() => setAppView('dashboard')} onBack={() => setAppView('landing')} />;
  }

  if (appView === 'signup') {
    return <AuthForm initialMode="signup" onAuthSuccess={() => setAppView('dashboard')} onBack={() => setAppView('landing')} />;
  }

  return (
    <div className="bg-bg text-text min-h-screen">
      <Header onSignIn={() => setAppView('signin')} />
      <Hero onGetStarted={() => setAppView('signup')} />
      <Press />
      <Stats />
      <HowItWorks />
      <ROICalculator />
      <SecurityIntegrations />
      <Features />
      <Benefits />
      <ComparisonTable />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA onGetStarted={() => setAppView('signup')} />
      <Footer />
    </div>
  );
}
