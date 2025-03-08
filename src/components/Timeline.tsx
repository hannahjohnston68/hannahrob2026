
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ImageWithLoader from './ImageWithLoader';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {events.map((event, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: isEven ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
              "flex flex-col md:flex-row items-center mb-16 relative",
              isEven ? "md:flex-row" : "md:flex-row-reverse"
            )}
          >
            {/* Vertical line */}
            {index < events.length - 1 && (
              <div className="absolute top-20 bottom-0 left-1/2 md:left-auto md:right-1/2 w-px bg-wedding-gold/30 translate-y-10 md:-translate-x-px"></div>
            )}
            
            {/* Date circle */}
            <div className="absolute top-16 left-1/2 md:left-auto md:top-0 md:right-1/2 -translate-x-1/2 md:translate-x-0 md:translate-y-0 w-12 h-12 rounded-full bg-wedding-gold text-white flex items-center justify-center z-10">
              {index + 1}
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
                <div className={cn(
                  "overflow-hidden rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105",
                  isEven ? "md:transform-none" : "md:transform-none"
                )}>
                  <ImageWithLoader
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 md:h-72 object-cover"
                  />
                </div>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Timeline;
