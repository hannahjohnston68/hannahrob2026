
import React from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';

const timelineEvents = [
  {
    date: "June 2018",
    title: "How We Met",
    description: "We met at a community garden event in Portland. James was volunteering with the local botanical society, and Sophie was there to learn about native plants for her backyard.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80"
  }, 
  {
    date: "December 2018",
    title: "First Date",
    description: "Our first official date was at a small garden café downtown. We talked for hours about our shared love of plants and the outdoors.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80"
  }, 
  {
    date: "February 2020",
    title: "Moving In Together",
    description: "After a year and a half of dating, we decided to take the next step and find a home with enough garden space for both of our plant collections.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
  }, 
  {
    date: "October 2023",
    title: "The Proposal",
    description: "During a picnic in our favorite botanical garden, under a canopy of flowering trees, James got down on one knee. Sophie was completely surprised and, of course, said yes!",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80"
  }
];

const OurStory: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-wedding-cream/60 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Our Story</h2>
          <div className="h-px w-20 bg-wedding-sage mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
            The journey that brought us together, from first meeting to forever.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 opacity-20">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="currentColor" className="text-wedding-sage/70" />
            </svg>
          </div>
          
          <div className="absolute bottom-0 right-0 w-40 h-40 translate-x-1/3 translate-y-1/3 opacity-10">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0C55.2285 0 100 44.7715 100 100H0V0Z" fill="currentColor" className="text-wedding-pink/70" />
            </svg>
          </div>
          
          {/* Timeline component */}
          <div className="relative z-10">
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
