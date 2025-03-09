
import React from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';

const timelineEvents = [
  {
    date: "June 2018",
    title: "How We Met",
    description: "We met at a friend's summer barbecue in Portland. Rob spilled his drink on Hannah's shoes, and somehow that led to exchanging numbers.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80"
  },
  {
    date: "December 2018",
    title: "First Date",
    description: "Our first official date was at a small Italian restaurant downtown. Hannah was 15 minutes late, but Rob didn't mind waiting.",
    image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80"
  },
  {
    date: "February 2020",
    title: "Moving In Together",
    description: "After a year and a half of dating, we decided to take the next step and move into our first apartment together in the Pearl District.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80"
  },
  {
    date: "October 2023",
    title: "The Proposal",
    description: "During a sunrise hike at Mount Hood, Rob got down on one knee at the perfect lookout point. Hannah was completely surprised and, of course, said yes!",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80"
  }
];

const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Our Story</h2>
          <div className="h-px w-20 bg-wedding-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
            From a chance meeting to a lifetime together, here's our journey so far.
          </p>
        </motion.div>
        
        <Timeline events={timelineEvents} />
      </div>
    </section>
  );
};

export default OurStory;
