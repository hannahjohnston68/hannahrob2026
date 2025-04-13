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
      <section className="pt-12 pb-4 px-4">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-8 md:p-12 mb-12 max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl italic text-center mb-4">The Wedding</h2>
            <div className="h-px w-32 bg-wedding-pink mx-auto mb-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-y-6 gap-x-8 text-wedding-charcoal/80">
              <div className="font-serif text-wedding-charcoal uppercase">DATE</div>
              <div className="flex items-center gap-2">
                <span>Saturday, September 12, 2026</span>
                <button
                  onClick={handleAddToCalendar}
                  className="cursor-pointer text-wedding-charcoal/60 hover:text-wedding-pink transition-colors duration-300"
                >
                  <ExternalLink size={14} />
                </button>
              </div>

              <div className="font-serif text-wedding-charcoal uppercase">TIME</div>
              <div>
                <div>Ceremony: 10:00 AM</div>
                <div>Reception: 10:30 AM - 3:00 PM</div>
              </div>

              <div className="font-serif text-wedding-charcoal uppercase">WHERE</div>
              <div>
                <div>Archeo</div>
                <div>The Distillery Historic District</div>
                <div>31 Trinity St, Toronto, ON M5A 3C4</div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Archeo+31+Trinity+St+Toronto+ON+M5A+3C4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-8 py-2 border border-wedding-charcoal rounded-full text-wedding-charcoal hover:bg-wedding-charcoal hover:text-wedding-cream transition-colors duration-300 text-center"
                >
                  MAP
                </a>
              </div>

              <div className="font-serif text-wedding-charcoal uppercase">ATTIRE</div>
              <div>Cocktail or formal attire</div>

              <div className="font-serif text-wedding-charcoal uppercase">DETAILS</div>
              <div>
                <p>We ask that guests arrive at least 15 minutes prior to the ceremony start time of 10:00 AM.</p>
                <p className="mt-2">Reception, brunch, and dancing to follow. This venue is located in a historic district and has a strict end time of 3:00 PM.</p>
              </div>
            </div>
          </motion.div>
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
                className="w-full sm:w-auto bg-wedding-pink hover:bg-[#a25566] text-white font-serif px-12 py-6 text-lg rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
              >
                RSVP NOW
              </Button>
            </a>

            <Link to="/details" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto border-0 text-wedding-charcoal hover:text-wedding-charcoal/70 font-serif px-12 py-6 text-lg rounded-full bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
              >
                EVENT DETAILS
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingDetails;
