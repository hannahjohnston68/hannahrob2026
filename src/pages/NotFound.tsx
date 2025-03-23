import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-wedding-cream px-4 pt-16"
      >
        <div className="text-center max-w-md glass-card p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-serif mb-4">Page Not Found</h1>
          <p className="text-wedding-charcoal/80 mb-8">
            We couldn't find the page you're looking for. Our wedding website has all the information you need on the main pages.
          </p>
          <Link 
            to="/" 
            className="inline-block px-6 py-3 bg-wedding-gold text-white hover:bg-wedding-gold/80 transition-colors duration-300 rounded-md"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default NotFound;
