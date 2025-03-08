
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
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true, margin: "-100px" }}
            className="overflow-hidden rounded-lg shadow-md cursor-pointer"
            onClick={() => openLightbox(image)}
          >
            <ImageWithLoader
              src={image.src}
              alt={image.alt}
              className="w-full h-64 md:h-72 object-cover transition-transform duration-500 hover:scale-110"
            />
          </motion.div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-4xl bg-black/90 border-none p-0 overflow-hidden">
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors"
          >
            <X size={24} />
          </button>
          {selectedImage && (
            <div className="flex items-center justify-center w-full h-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[80vh] max-w-full object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryGrid;
