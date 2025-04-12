import React, { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import OurStory from '@/components/OurStory';
import WeddingDetails from '@/components/WeddingDetails';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <Navbar />
      <main className="relative">
        <HeroSection />
        <OurStory />
        <WeddingDetails />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
