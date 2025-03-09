
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DetailCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay?: number;
}

const DetailCard: React.FC<DetailCardProps> = ({
  icon,
  title,
  children,
  delay = 0
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6,
    delay
  }} viewport={{
    once: true,
    margin: "-100px"
  }} className="glass-card p-6 rounded-lg shadow-md h-full">
      <div className="flex flex-col items-center text-center">
        <div className="w-14 h-14 bg-wedding-champagne rounded-full flex items-center justify-center mb-4 shadow-inner">
          <div className="text-wedding-gold">{icon}</div>
        </div>
        <h3 className="text-xl font-serif mb-3">{title}</h3>
        <div className="text-wedding-charcoal/80 font-body">{children}</div>
      </div>
    </motion.div>;
};

const WeddingDetails: React.FC = () => {
  return <section className="py-20 px-4 bg-wedding-taupe/20">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} viewport={{
        once: true,
        margin: "-100px"
      }} className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Wedding Details</h2>
          <div className="h-px w-20 bg-wedding-gold mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
            We're excited to celebrate our special day with you. Here's everything you need to know.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailCard icon={<Calendar size={26} />} title="Date & Schedule" delay={0.1}>
            <p className="mb-2">Saturday, September 12, 2026</p>
            <p className="mb-2">Ceremony: 3:00 PM</p>
            <p className="mb-2">Cocktail Hour: 4:00 PM</p>
            <p>Reception: 5:00 PM - 11:00 PM</p>
          </DetailCard>

          <DetailCard icon={<MapPin size={26} />} title="Venue" delay={0.2}>
            <p className="mb-2">Oakwood Estate</p>
            <p className="mb-2">123 Forest Lane</p>
            <p>Portland, Oregon 97205</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="block mt-3 text-wedding-gold hover:underline">
              View Map
            </a>
          </DetailCard>

          <DetailCard icon={<Clock size={26} />} title="Accommodations" delay={0.3}>
            <p className="mb-2">We've reserved a block of rooms at The Portland Grand Hotel at a special rate.</p>
            <p>Use code "HANNAH&ROB" when booking.</p>
            <a href="#" className="block mt-3 text-wedding-gold hover:underline">
              Book Hotel
            </a>
          </DetailCard>

          <DetailCard icon={<Gift size={26} />} title="Registry" delay={0.4}>
            <p>Your presence is the greatest gift of all, but if you wish to help us celebrate with a gift, we've registered at:</p>
            <div className="flex flex-col space-y-2 mt-3">
              <a href="#" className="text-wedding-gold hover:underline">Crate & Barrel</a>
              <a href="#" className="text-wedding-gold hover:underline">Zola</a>
            </div>
          </DetailCard>
        </div>
      </div>
    </section>;
};

export default WeddingDetails;
