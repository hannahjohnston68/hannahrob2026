
import React from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';

const timelineEvents = [
  {
    date: "September 2018",
    title: "First Date",
    description: "We had our first date at Sneaky Dee's on College Street and split a plate of nachos. We bonded over our shared love of dogs and jazz!",
    image: "/hannahrob2026/images/gallery/IMG_3478.JPG",  // Path will be correct after setup-gallery.sh runs
    caption: "Not our first date, but our first photo together! This is us after 4 months of dating on Rob's 23rd birthday. That's Hannah's little brother looking cheerful on the right..."
  },
  {
    date: "October 2021",
    title: "Moving In Together",
    description: "After three years of dating, we decided to take the next step and move into our an apartment together at Yonge & Eglinton.",
    image: "/hannahrob2026/images/gallery/IMG_0265.JPG",  // Path will be correct after setup-gallery.sh runs
    caption: "Here we are dressed up in our living room before heading out to Hannah's grandparent's anniversary party."  
  },
  {
    date: "September 2023",
    title: "The Proposal",
    description: "During a walk on our 5 year anniversary, Rob got down on one knee and proposed. Hannah was completely surprised and, of course, said yes!",
    image: "/hannahrob2026/images/gallery/IMG_4516.JPG",
    caption: "Rob surprised Hannah when a bunch of our friends popped out of the bushes to celebrate the engagement. He proposed in Alexander Muir Memorial Garden in North York."
  },
  {
    date: "November 2023",
    title: "Adopting Our First Dog",
    description: "Two months after getting engaged, we adopted a new puppy: Boji!",
    image: "/hannahrob2026/images/gallery/IMG_3817.jpg",
    caption: "Note: not the same beagle as in the photo above (that's Darwin - Hannah's family dog). Can you tell we have a type?"
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
        </motion.div>
        
        <Timeline events={timelineEvents} />
      </div>
    </section>
  );
};

export default OurStory;
