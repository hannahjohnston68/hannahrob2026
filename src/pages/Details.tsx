
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WeddingDetails from '@/components/WeddingDetails';
import { motion } from 'framer-motion';

const Details = () => {
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
      <main className="pt-32 pb-0">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-3xl md:text-4xl mb-4">Wedding Details</h1>
            <div className="h-px w-20 bg-wedding-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
              Everything you need to know about our celebration.
            </p>
          </motion.div>
        </div>
        
        <WeddingDetails />
        
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-lg">
              <h2 className="font-serif text-2xl text-center mb-6">Travel Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-xl mb-3">Getting There</h3>
                  <p className="text-wedding-charcoal/80 mb-4">
                    Oakwood Estate is located 25 minutes from downtown Portland. The address is 123 Forest Lane, Portland, Oregon 97205.
                  </p>
                  <p className="text-wedding-charcoal/80">
                    Complimentary valet parking will be available. We also recommend rideshare services if you plan to enjoy the bar.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-serif text-xl mb-3">Airport Information</h3>
                  <p className="text-wedding-charcoal/80 mb-4">
                    Portland International Airport (PDX) is 35 minutes from the venue and offers direct flights from most major cities.
                  </p>
                  <p className="text-wedding-charcoal/80">
                    We recommend booking flights and accommodations early as September is a popular time to visit Portland.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Details;
