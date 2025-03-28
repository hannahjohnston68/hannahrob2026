import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RSVPForm from "@/components/RSVPForm";
import { motion } from 'framer-motion';
import { RSVPResponses } from '../components/RSVPResponses';
import { TestRSVP } from '../components/TestRSVP';
import TestGuests from "@/components/TestGuests";

const RSVPPage = () => {
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
      <main className="pt-32 pb-20 bg-wedding-cream">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-3xl md:text-4xl mb-4">RSVP</h1>
            <div className="h-px w-20 bg-wedding-pink mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
              Please let us know if you'll be joining us on our special day. 
              We look forward to celebrating with you!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TestGuests />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <RSVPForm />
          </motion.div>

          {/* Admin section - you might want to protect this with authentication */}
          <div className="mt-16">
            <RSVPResponses />
          </div>

          {/* Test section - remove this after testing */}
          <div className="mt-8">
            <TestRSVP />
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default RSVPPage; 