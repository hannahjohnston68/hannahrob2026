
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

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
  return (
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass-card glass-card-borderless p-6 h-full bg-white/90"
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 bg-wedding-pink/10 rounded-full flex items-center justify-center mb-4 shadow-inner border-2 border-wedding-pink">
            <div className="text-wedding-pink">{icon}</div>
          </div>
          <h3 className="text-xl font-serif mb-3">{title}</h3>
          <div className="text-wedding-charcoal/80 font-body">{children}</div>
        </div>
      </motion.div>
    </div>
  );
};

const WeddingDetails: React.FC = () => {
  const location = useLocation();
  const isDetailsPage = location.pathname === '/details';

  const handleAddToCalendar = () => {
    const event = {
      text: 'Hannah & Rob\'s Wedding',
      dates: '20260912T100000/20260912T150000',
      details: 'Wedding Ceremony and Reception\n\nCeremony starts at 10:00 AM\nReception: 10:30 AM - 3:00 PM\n\nVenue: Archeo, The Distillery Historic District\n31 Trinity St, Toronto, ON M5A 3C4',
      location: 'Archeo, 31 Trinity St, Toronto, ON M5A 3C4'
    };

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.text)}&dates=${event.dates}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section className="pt-12 pb-4 px-4"> {/* Changed pb-8 to pb-4 */}
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          {isDetailsPage ? (
            <>
              <h2 className="font-serif text-3xl md:text-4xl mb-4">
                Wedding Details
              </h2>
              <div className="h-px w-20 bg-wedding-pink mx-auto mb-6"></div>
            </>
          ) : (
            <Link 
              to="/details" 
              className="inline-block group"
            >
              <h2 className="font-serif text-3xl md:text-4xl mb-4 group-hover:text-wedding-pink transition-colors duration-300">
                Wedding Details
              </h2>
              <div className="h-px w-20 bg-wedding-pink mx-auto mb-6 group-hover:bg-wedding-pink/70 transition-colors duration-300"></div>
            </Link>
          )}
          <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
            We are looking forward to celebrating our special day with you! Here are all the essential details.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <DetailCard icon={<Calendar size={26} />} title="Date & Schedule" delay={0.1}>
            <button 
              onClick={handleAddToCalendar}
              className="mb-2 hover:text-wedding-pink transition-colors duration-300 cursor-pointer inline-flex items-center gap-2 group"
            >
              Saturday, September 12, 2026
              <ExternalLink size={12} className="inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <p className="mb-2">Ceremony: 10:00 AM</p>
            <p className="mb-4 text-sm italic">(vows, rings and i do's)</p>
            <p className="mb-2">Reception: 10:30 AM - 3:00 PM</p>
            <p className="text-sm italic">(brunch, mimosas, speeches and dancing!)</p>
          </DetailCard>

          <DetailCard icon={<MapPin size={26} />} title="Venue" delay={0.2}>
            <p className="mb-2">Archeo</p>
            <p className="mb-2">The Distillery Historic District</p>
            <p>31 Trinity St, Toronto, ON M5A 3C4</p>
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Archeo+31+Trinity+St+Toronto+ON+M5A+3C4" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-wedding-pink/10 text-wedding-pink border-2 border-wedding-pink rounded-md hover:bg-wedding-pink hover:text-white transition-colors duration-300"
            >
              View Map <ExternalLink size={16} />
            </a>
          </DetailCard>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;
