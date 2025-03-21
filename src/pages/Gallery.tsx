
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GalleryGrid from '@/components/GalleryGrid';
import { motion } from 'framer-motion';

const galleryImages = [
  {
    id: 1,
    src: "/hannahrob2026/images/gallery/IMG_0159.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 2,
    src: "/hannahrob2026/images/gallery/IMG_0163.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 3,
    src: "/hannahrob2026/images/gallery/IMG_0311.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 4,
    src: "/hannahrob2026/images/gallery/IMG_0474.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 5,
    src: "/hannahrob2026/images/gallery/IMG_1161.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 6,
    src: "/hannahrob2026/images/gallery/IMG_1862.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 7,
    src: "/hannahrob2026/images/gallery/IMG_20190921_180738.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 8,
    src: "/hannahrob2026/images/gallery/IMG_2154.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 9,
    src: "/hannahrob2026/images/gallery/IMG_3287.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 10,
    src: "/hannahrob2026/images/gallery/IMG_3479.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 11,
    src: "/hannahrob2026/images/gallery/IMG_3485.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 12,
    src: "/hannahrob2026/images/gallery/IMG_3486.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 13,
    src: "/hannahrob2026/images/gallery/IMG_3489.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 14,
    src: "/hannahrob2026/images/gallery/IMG_3817.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 15,
    src: "/hannahrob2026/images/gallery/IMG_4317.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 16,
    src: "/hannahrob2026/images/gallery/IMG_4457.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 17,
    src: "/hannahrob2026/images/gallery/IMG_4460.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 18,
    src: "/hannahrob2026/images/gallery/IMG_4478 2.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 19,
    src: "/hannahrob2026/images/gallery/IMG_4516.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 20,
    src: "/hannahrob2026/images/gallery/IMG_5393.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 21,
    src: "/hannahrob2026/images/gallery/IMG_7126.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 22,
    src: "/hannahrob2026/images/gallery/IMG_7143.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 23,
    src: "/hannahrob2026/images/gallery/IMG_7148.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 24,
    src: "/hannahrob2026/images/gallery/IMG_7149.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 25,
    src: "/hannahrob2026/images/gallery/IMG_7662.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 26,
    src: "/hannahrob2026/images/gallery/IMG_7820.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 27,
    src: "/hannahrob2026/images/gallery/IMG_9013.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 28,
    src: "/hannahrob2026/images/gallery/IMG_9015.JPG",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 29,
    src: "/hannahrob2026/images/gallery/PXL_20220223_112529758.jpg",
    alt: "Wedding photo",
    width: 800,
    height: 600
  },
  {
    id: 30,
    src: "/hannahrob2026/images/gallery/PXL_20250225_151326960.JPG",
    alt: "Wedding photo",
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
            <h1 className="font-serif text-3xl md:text-4xl mb-4">Gallery</h1>
            <div className="h-px w-20 bg-wedding-pink mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
              Some of our favourite memories together!
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
