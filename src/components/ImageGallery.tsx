import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { galleryImages } from '../pages/galleryData';

// Get the base URL from the environment or use an empty string for development
const baseUrl = import.meta.env.MODE === 'production' ? '/hannahrob2026' : '';

// Process all images to add the base URL
const processedImages = galleryImages.map(image => ({
  ...image,
  src: `${baseUrl}${image.src}`
}));

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Add effect to handle navbar visibility
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }
    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [selectedImage]);

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="flex space-x-6 pb-4 overflow-x-auto scrollbar-hide">
        {processedImages.map((image, index) => (
          <motion.div
            key={index}
            className="flex-none w-96 h-96 rounded-lg overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(image.src)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[200]"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected image"
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery; 
