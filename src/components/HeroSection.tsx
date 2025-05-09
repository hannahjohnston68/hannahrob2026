import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ImageWithLoader from './ImageWithLoader';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Get the base URL from the environment or use an empty string for development
const baseUrl = import.meta.env.MODE === 'production' ? '/hannahrob2026' : '';

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

  return (
    <div
      ref={sectionRef}
      className="relative h-screen w-full bg-[#94A094] md:bg-transparent bg-cover bg-center flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: `url(${baseUrl}/images/gallery/archeo-wedding13.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: "fixed"
        }}
      />
      <div className="absolute inset-0 bg-black/20 md:block hidden" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className={cn(
          "relative z-10 text-center px-12 py-12 max-w-4xl mx-auto",
          "glass-card rounded-lg bg-white/60 shadow-xl backdrop-blur-sm"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className="font-body uppercase tracking-[0.3em] text-sm mb-4 text-wedding-charcoal/80">We're Getting Married!</p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl mb-6 text-wedding-charcoal leading-tight">
            Hannah <span className="font-normal text-wedding-pink">&</span> Rob
          </h1>
          <p className="font-body uppercase tracking-[0.15em] text-lg mb-4 text-wedding-charcoal">SEPTEMBER 12, 2026 • Toronto, Ontario</p>
          <div className="h-px w-24 bg-wedding-gold mx-auto mb-4" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-4"
          >
            <a
              href="https://withjoy.com/hannah-and-rob-sep-26/rsvp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                className="bg-wedding-pink hover:bg-[#a25566] text-white font-serif px-12 py-6 text-lg rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
              >
                RSVP
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
