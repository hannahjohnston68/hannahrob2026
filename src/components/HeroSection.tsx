
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ImageWithLoader from './ImageWithLoader';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleParallax = () => {
      if (!sectionRef.current) return;
      const scrollPosition = window.scrollY;
      const sectionTop = sectionRef.current.offsetTop;
      const offset = (scrollPosition - sectionTop) * 0.5;
      if (sectionRef.current) {
        sectionRef.current.style.backgroundPositionY = `calc(50% + ${offset}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return <div ref={sectionRef} className="relative h-screen w-full bg-cover bg-center flex items-center justify-center overflow-hidden" style={{
    backgroundImage: "url(https://images.unsplash.com/photo-1598902108854-0e31d6398558?q=80&w=1500)",
    backgroundAttachment: "fixed"
  }}>
      <div className="absolute inset-0 bg-black/30" />

      <motion.div initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 1.2,
      ease: "easeOut"
    }} className={cn("relative z-10 text-center px-4 py-16 max-w-3xl mx-auto", "glass-card rounded-lg bg-white/70 shadow-xl backdrop-blur-sm")}>
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.3,
        duration: 0.8
      }}>
          <p className="font-body uppercase tracking-[0.3em] text-sm mb-4 text-wedding-charcoal/80">We're Getting Married</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 text-wedding-charcoal leading-tight">
            Hannah <span className="font-normal text-wedding-gold">&</span> Rob
          </h1>
          <p className="font-body uppercase tracking-[0.15em] text-lg mb-8 text-wedding-charcoal">SEPTEMBER 12, 2026 • Toronto, Ontario</p>
          <div className="h-px w-24 bg-wedding-gold mx-auto mb-8" />
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 1,
          duration: 1
        }}>
            <a href="/rsvp" className="inline-block px-8 py-3 border border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white transition-colors duration-300 uppercase tracking-widest text-sm font-body">
              RSVP Now
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>;
};

export default HeroSection;
