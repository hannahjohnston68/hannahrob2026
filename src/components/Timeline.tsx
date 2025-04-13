import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ImageWithLoader from './ImageWithLoader';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
  caption?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  const openLightbox = (image: string, title: string, caption?: string) => {
    setSelectedImage({ src: image, alt: title, caption });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="w-full max-w-4xl mx-auto">
        {events.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index}>
              <motion.div
                initial={{ opacity: 0, x: isEven ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px", amount: 0.3 }}
                className={cn(
                  "flex flex-col md:flex-row items-center mb-8 relative",
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Vertical line */}
                {index < events.length - 1 && (
                  <div className="absolute top-20 bottom-0 left-1/2 md:left-auto md:right-1/2 w-px bg-wedding-gold/30 translate-y-10 md:-translate-x-px flex flex-col items-center justify-center">
                    {/* Adding decorative dots */}
                    <div className="absolute top-1/4 w-1.5 h-1.5 rounded-full bg-wedding-gold/50 -translate-x-[2px]" />
                    <div className="absolute top-2/4 w-1.5 h-1.5 rounded-full bg-wedding-gold/50 -translate-x-[2px]" />
                    <div className="absolute top-3/4 w-1.5 h-1.5 rounded-full bg-wedding-gold/50 -translate-x-[2px]" />
                  </div>
                )}

                {/* Date circle */}
                <div className="absolute top-16 left-1/2 md:left-auto md:top-0 md:right-1/2 -translate-x-1/2 md:translate-x-0 md:translate-y-0 w-3 h-3 rounded-full bg-wedding-gold z-10">
                </div>

                {/* Content */}
                <div className={cn(
                  "w-full md:w-5/12 text-center md:text-left p-6",
                  isEven ? "md:text-right md:pr-16" : "md:text-left md:pl-16"
                )}>
                  <h3 className="text-xl font-serif text-wedding-gold mb-2">{event.date}</h3>
                  <h4 className="text-2xl font-serif mb-4">{event.title}</h4>
                  <p className="text-wedding-charcoal/80">{event.description}</p>
                </div>

                {/* Image */}
                {event.image && (
                  <div className="w-full md:w-5/12 mt-6 md:mt-0">
                    <div
                      className="overflow-hidden rounded-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      onClick={() => openLightbox(event.image!, event.title, event.caption)}
                    >
                      <ImageWithLoader
                        src={event.image}
                        alt={event.title}
                        className="w-full h-64 md:h-72 object-cover will-change-transform"
                        priority={index < 2}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      <Dialog open={selectedImage !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] bg-black/90 border-none p-0 overflow-hidden">
          <button
            onClick={closeLightbox}
            className="absolute right-2 top-2 z-50 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors"
          >
            <X size={24} />
          </button>

          {selectedImage && (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[85vh] w-auto max-w-[95vw] object-contain"
              />
              {selectedImage.caption && (
                <p className="text-white/80 text-sm italic mt-4 px-4 text-center max-w-2xl">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Timeline;
