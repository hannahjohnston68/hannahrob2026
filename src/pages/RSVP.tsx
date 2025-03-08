
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RSVPForm from '@/components/RSVPForm';
import { motion } from 'framer-motion';

const RSVP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-4 bg-wedding-blush/20">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-3xl md:text-4xl mb-4">RSVP</h1>
            <div className="h-px w-20 bg-wedding-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-wedding-charcoal/80 mb-8">
              We're excited to celebrate with you! Please let us know if you can join us on our special day by September 1, 2024.
            </p>
          </motion.div>
          
          <RSVPForm />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default RSVP;
