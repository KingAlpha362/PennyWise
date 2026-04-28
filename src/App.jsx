import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Header } from './components/ui/header-2';
import Hero from './components/Hero';
import Press from './components/Press';
import DashboardWidget from './components/DashboardWidget';
import Stats from './components/Stats';
import Features from './components/Features';
import Benefits from './components/Benefits';
import DashboardPreview from './components/DashboardPreview';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {

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

  return (
    <div className="bg-bg text-text min-h-screen">
      <Header />
      <Hero />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <Press />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <DashboardWidget />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <Stats />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <Features />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <Benefits />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <DashboardPreview />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <Testimonials />
      <div className="h-px w-full bg-[#111111]/5 dark:bg-white/10" />
      <CTA />
      <Footer />
    </div>
  );
}
