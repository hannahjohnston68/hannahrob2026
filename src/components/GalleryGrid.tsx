import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ImageWithLoader from './ImageWithLoader';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
  };

  const showPreviousImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImageIndex === null) return;
    
    switch (e.key) {
      case 'ArrowRight':
        showNextImage();
        break;
      case 'ArrowLeft':
        showPreviousImage();
        break;
      case 'Escape':
        closeLightbox();
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true, margin: "-50px" }}
            className="overflow-hidden rounded-lg shadow-md cursor-pointer aspect-[4/3]"
            onClick={() => openLightbox(index)}
          >
            <ImageWithLoader
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] bg-black/90 border-none p-0 overflow-hidden">
          <button
            onClick={closeLightbox}
            className="absolute right-2 top-2 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors"
          >
            <X size={24} />
          </button>
          
          {selectedImageIndex !== null && (
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                className="max-h-[95vh] w-auto max-w-[95vw] object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryGrid;
