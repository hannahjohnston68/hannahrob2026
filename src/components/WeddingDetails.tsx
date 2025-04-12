import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

// Get the base URL from the environment
const baseUrl = import.meta.env.MODE === 'production' ? '/hannahrob2026' : '';

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
            <div className="text-wedding-pink transition-colors duration-300 group-hover/date:text-wedding-pink">{icon}</div>
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

  if (isDetailsPage) {
    return (
      <section className="pt-2 pb-4 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-6"
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Wedding Details</h2>
            <div className="h-px w-20 bg-wedding-pink mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto text-wedding-charcoal/80">
              We are looking forward to celebrating our special day with you! Here are all the essential details.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <DetailCard 
              icon={<Calendar size={26} />} 
              title="Date & Schedule" 
              delay={0.1}
            >
              <div className="mb-2 inline-flex items-center gap-2 group/date">
                <button 
                  onClick={handleAddToCalendar}
                  className="cursor-pointer text-wedding-charcoal/80 hover:text-wedding-pink transition-colors duration-300"
                >
                  Saturday, September 12, 2026
                </button>
                <ExternalLink 
                  size={12} 
                  className="inline-block transition-colors duration-300 text-wedding-charcoal/80 group-hover/date:text-wedding-pink"
                />
              </div>
              <div className="text-wedding-charcoal/80">
                <p className="mb-2">Ceremony: 10:00 AM</p>
                <p className="mb-4 text-sm italic">(vows, rings and i do's)</p>
                <p className="mb-2">Reception: 10:30 AM - 3:00 PM</p>
                <p className="text-sm italic">(brunch, mimosas, speeches and dancing!)</p>
              </div>
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
  }

  return (
    <section className="pt-2 pb-4 px-4 sm:px-8 bg-[#415A4E]">
      <div className="max-w-6xl mx-auto relative">
        {/* Distillery District Sketch */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="absolute top-8 right-0 w-96 z-10"
        >
          <div className="w-full">
            <img
              src={`${baseUrl}/images/venue/distillery-2.png`}
              alt="Distillery District Sketch"
              className="w-full h-auto opacity-85 mix-blend-screen grayscale"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-left pl-0 sm:pl-8 pt-8 pb-32 max-w-xl"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-white">Join Us</h2>
          
          <p className="text-lg text-white/90 mb-8">
            I hope you've RSVP'd by now. If not please do so ASAP so we can make sure you have a seat. Or else you're coming with your own chair and sandwich. As always, please reach out if you have questions or concerns.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4 mb-2">
            <a 
              href="https://withjoy.com/hannah-and-rob-sep-26/rsvp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button 
                className="w-full sm:w-auto bg-wedding-pink hover:bg-wedding-pink/90 text-white font-serif px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                RSVP NOW
              </Button>
            </a>
            
            <Link to="/details" className="w-full sm:w-auto">
              <Button 
                variant="outline"
                className="w-full sm:w-auto border-2 border-wedding-charcoal hover:border-wedding-charcoal/90 text-wedding-charcoal hover:text-wedding-charcoal/90 font-serif px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90"
              >
                SEE EVENT DETAILS
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingDetails;
