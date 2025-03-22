import React from 'react';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RSVPForm } from "@/components/RSVPForm";
import { motion } from 'framer-motion';

const RSVP: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-wedding-cream pt-24 pb-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-serif text-center mb-4">RSVP</h1>
            <div className="h-px w-20 bg-wedding-pink mx-auto mb-8"></div>
            <RSVPForm />
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default RSVP;
