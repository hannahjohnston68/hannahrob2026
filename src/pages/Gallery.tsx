
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryGrid from '@/components/GalleryGrid';
import { motion } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    alt: "Couple walking in a park",
    width: 800,
    height: 600
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80",
    alt: "Mountain landscape",
    width: 800,
    height: 600
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
    alt: "Pine trees",
    width: 800,
    height: 600
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80",
    alt: "Deer in nature",
    width: 800,
    height: 600
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80",
    alt: "Orange flowers",
    width: 800,
    height: 600
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=800&q=80",
    alt: "River landscape",
    width: 800,
    height: 600
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&q=80",
    alt: "Forest trees",
    width: 800,
    height: 600
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
    alt: "Sunlight through trees",
    width: 800,
    height: 600
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&q=80",
    alt: "Deer in mountains",
    width: 800,
    height: 600
  }
];

const Gallery = () => {
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
      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-3xl md:text-4xl mb-4">Our Gallery</h1>
            <div className="h-px w-20 bg-wedding-gold mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
              A collection of our favorite memories together. We can't wait to create more with you on our special day.
            </p>
          </motion.div>
          
          <GalleryGrid images={galleryImages} />
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Gallery;
