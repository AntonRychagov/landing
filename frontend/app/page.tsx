'use client';

import { useEffect } from 'react';
import { portfolioData } from '../data/portfolio-data';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Footer from './components/Footer';
import { initScrollAnimations } from './utils/scrollAnimations';

export default function Home(): JSX.Element {
  useEffect(() => {
    // Initialize scroll animations after DOM is ready
    // Optimized to run only once with proper timing
    const initAnimations = (): void => {
      // Use double RAF for better timing after layout
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          initScrollAnimations();
        });
      });
    };

    // Initialize immediately if DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      initAnimations();
    } else {
      // Wait for DOMContentLoaded instead of load for faster initialization
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations, { once: true });
      } else {
        window.addEventListener('load', initAnimations, { once: true });
      }
    }
    
    return () => {
      document.removeEventListener('DOMContentLoaded', initAnimations);
      window.removeEventListener('load', initAnimations);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background-primary text-text-primary pt-20">
      <Hero personal={portfolioData.personal} />
      <About personal={portfolioData.personal} />
      <Portfolio projects={portfolioData.projects} />
      <Footer contact={portfolioData.contact} name={portfolioData.personal.name} />
    </div>
  );
}
