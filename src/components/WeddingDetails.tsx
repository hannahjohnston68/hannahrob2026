
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
  return <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-100px" }}
    className="glass-card p-6 rounded-lg shadow-md h-full"
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-14 h-14 bg-wedding-pink/10 rounded-full flex items-center justify-center mb-4 shadow-inner border-2 border-wedding-pink">
        <div className="text-wedding-pink">{icon}</div>
      </div>
      <h3 className="text-xl font-serif mb-3">{title}</h3>
      <div className="text-wedding-charcoal/80 font-body">{children}</div>
    </div>
  </motion.div>;
};

const WeddingDetails: React.FC = () => {
  return <section className="pt-0 px-4 bg-wedding-taupe/20">
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
          <div className="h-px w-20 bg-wedding-pink mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
            We are looking forward to sharing our special day with you. Here is everything you need to know.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DetailCard icon={<Calendar size={26} />} title="Date & Schedule" delay={0.1}>
            <p className="mb-2">Saturday, September 12, 2026</p>
            <p className="mb-2">Ceremony: 10:00 AM</p>
            <p className="mb-4 text-sm italic">(vows, rings and i do's)</p>
            <p className="mb-2">Reception: 10:30 AM - 3:00 PM</p>
            <p className="text-sm italic">(brunch, cocktails, speeches and dancing!)</p>
          </DetailCard>

          <DetailCard icon={<MapPin size={26} />} title="Venue" delay={0.2}>
            <p className="mb-2">Archeo</p>
            <p className="mb-2">The Distillery Historic District</p>
            <p>31 Trinity St, Toronto, ON M5A 3C4</p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Archeo+31+Trinity+St+Toronto+ON+M5A+3C4" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block mt-3 text-wedding-gold hover:underline"
            >
              View Map
            </a>
          </DetailCard>
        </div>
      </div>
    </section>;
};

export default WeddingDetails;
