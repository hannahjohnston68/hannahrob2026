import React from 'react';
import { motion } from 'framer-motion';
import Timeline from './Timeline';

// Get the base URL from the environment or use an empty string for development
const baseUrl = import.meta.env.MODE === 'production' ? '/hannahrob2026' : '';

const timelineEvents = [
  {
    description: "It all started on September 12th, 2018, at Sneaky Dee's on College Street - Rob's pick, known for its unbeatable nachos. Over that first plate, we quickly discovered our mutual obsession with dogs and shared lots of laughs.",
    image: `${baseUrl}/images/gallery/IMG_3478.JPG`,
    caption: "Not our first date, but our first photo together! This is us after 4 months of dating on Rob's 23rd birthday. That's Hannah's little brother Charlie looking cheerful on the right..."
  },
  {
    description: "Since then, we've road-tripped through the Isle of Wight and temple-hopped across Mexico. Whether we're getting lost on purpose or battling over who packed the better snacks, every adventure has made us laugh harder and love deeper!",
    image: `${baseUrl}/images/gallery/IMG_6753.JPG`,
    caption: "In 2021 on a trip to Mexico, we got to see the pyramids and the ruins of Uxmal. It was a great trip!"
  },
  {
    description: "After three years of dating, we moved into an apartment at Yonge & Eglinton, a neighbourhood dear to us since Rob lived there when we first got together. Revisiting old favourites like the local comedy club, our go-to brunch spot, and peaceful walks in Sherwood Park has made our home feel even more special.",
    image: `${baseUrl}/images/gallery/IMG_0265.JPG`,
    caption: "All dressed up in October 2021, on our way to Hannah's grandparents house for their anniversary party."
  },
  {
    description: "During these years, Hannah completed her Master's degree and transitioned to working in software development, while Rob pursued his dream of becoming a veterinary technician.",
    image: `${baseUrl}/images/gallery/Campbell&LaurenWedding2024-626.jpg`,
    caption: "At our friends Campbell and Lauren's wedding in 2024, partaking in the traditional couple'skaraoke after the ceremony."
  },
  {
    description: "On our five-year anniversary, Rob planned a memorable surprise proposal at Alexander Muir Memorial Garden - the very place where we first agreed to make it official. With our dog and close friends there to celebrate, Rob proposed.",
    image: `${baseUrl}/images/gallery/IMG_4516.JPG`,
    caption: "Hannah was surprised by our friends popping out of the bushes on a routine walk in the park."
  },
  {
    description: "Two months later, we brought home our mischievous puppy, Boji, who immediately filled our lives with more laughter and warmth (and chewed up couch cushions).",
    image: `${baseUrl}/images/gallery/IMG_3817.jpg`,
    caption: "Boji is the one on the bottom right."
  },
  {
    description: "Together, we love spending quiet weekends together watching classic comedies or old seasons of Survivor, playing tennis (as a team or as bitter rivals), cooking meals at home, and enjoying long walks with our dog. We are so grateful and lucky for shared moments, big and small.",
    image: `${baseUrl}/images/gallery/IMG_9015.JPG`,
    caption: "Us together at the beach on a trip to Portugal in 2022."
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
          <p className="text-lg max-w-3xl mx-auto">We've been together for seven amazing years, and looking back, it's wonderful to see how far we've come.</p>
        </motion.div>

        <Timeline events={timelineEvents} />
      </div>
    </section>
  );
};

export default OurStory;
