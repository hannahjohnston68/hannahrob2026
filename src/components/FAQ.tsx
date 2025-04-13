import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-wedding-gold/20 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
      >
        <h3 className="font-serif text-lg text-wedding-charcoal">{question}</h3>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-wedding-gold transition-transform duration-300",
            isOpen ? "transform rotate-180" : ""
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-wedding-charcoal/80 prose prose-sm max-w-none">
              {typeof answer === 'string' ? (
                <p>{answer}</p>
              ) : (
                answer
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-wedding-cream">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Frequently Asked Questions</h2>
          <div className="h-px w-20 bg-wedding-gold mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto text-wedding-charcoal/80">
            We've compiled answers to some common questions about our wedding day.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="bg-white rounded-lg shadow-md p-6 md:p-8"
        >
          <FAQItem
            question="What date should I RSVP by?"
            answer="Please RSVP by July 12th, 2026. (But let us know if you do need more time.)"
          />
          
          <FAQItem
            question="What are the addresses of the wedding ceremony and reception venues? Are they wheelchair accessible?"
            answer={
              <>
                <p>Our venue's address is 31 Trinity Street. You can use <a href="https://maps.google.com/?q=31+Trinity+Street+Toronto" target="_blank" rel="noopener noreferrer" className="text-wedding-pink hover:underline">this link</a> to view the location in Google Maps. Once you arrive, you'll see signage directing you to the back patio where the ceremony will take place.</p>
              </>
            }
          />
          
          <FAQItem
            question="Is there parking available near your wedding venue(s)?"
            answer={
              <>
                <p>For guests within driving distance of the venue, there are several parking options:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Distillery District Green P lot (main parking) with entrances from Parliament Street and Cherry Street</li>
                  <li>Additional parking at 33 Mill Street</li>
                  <li>373 Front Street East parking lot</li>
                </ul>
              </>
            }
          />
          
          <FAQItem
            question="Will your wedding be indoors or outdoors?"
            answer="Our ceremony and cocktail hour will be outdoors on the patio, while the reception will take place indoors. Guests will walk on cobblestones to take their seats."
          />
          
          <FAQItem
            question="What is the dress code?"
            answer="We would love to see our family and friends get dressed up with us for our big day! Please dress in cocktail or formal attire."
          />
          
          <FAQItem
            question="Am I allowed to bring a plus-one?"
            answer="We have addressed the invitations to the people we would love to come. If you receive a plus one, they will appear under your name when you RSVP. Please ensure that you RSVP for yourself and your guests. Due to space, we are only able to accommodate those guests formally invited."
          />
          
          <FAQItem
            question="What type of food will be served at your wedding?"
            answer="We'll be serving hors d'oeuvres at cocktail hour followed by a sit-down brunch with a choice of entree. There will be gluten-free/nut-free/vegan options available."
          />
          
          <FAQItem
            question="Will there be meal options for guests with dietary restrictions or allergies?"
            answer="We plan on having an entree choice that's vegan, gluten and nut free to accommodate guests with dietary restrictions. Our cocktail hour appetizers will also all be clearly marked if they are allergy friendly (and there will be multiple allergy-friendly options). If you have additional restrictions that go beyond what we've listed here, please let us know in the designated section of your digital RSVP. We want you to feel comfortable and well fed!"
          />
          
          <FAQItem
            question="Will there be an open bar?"
            answer="Yes! In addition to beer, wine, and cocktails, there will also be plenty of non-alcoholic options."
          />
          
          <FAQItem
            question="Where should we bring/send our wedding gift?"
            answer="Your presence at our wedding is the greatest gift we could ask for! If you would like to honor us with a gift, a contribution towards our honeymoon would be greatly appreciated. A wedding card box will be at our reception."
          />
          
          <FAQItem
            question="What's the wedding itinerary?"
            answer="Our wedding will take place at Archeo on September 12, 2025. The ceremony will begin at 10:30 AM sharp, followed by cocktail hour and the reception, which is anticipated to wrap around 3:00 PM."
          />
          
          <FAQItem
            question="What time should I arrive at your wedding ceremony?"
            answer="The doors to the venue will open thirty minutes ahead of our ceremony time at 10:30 AM. We recommend arriving at the ceremony venue at least 30 minutes ahead of the ceremony start time to ensure you have enough time to walk to the ceremony space and find a seat."
          />
          
          <FAQItem
            question="Am I allowed to take photos at your wedding?"
            answer={
              <>
                <p>Yes! But please refrain from having your phone out during the ceremony as it is an 'unplugged ceremony.' We have hired professional photographers to capture this moment. However, during the reception, please take as MANY photos and videos as you'd like! We will create a Google Drive folder afterward for our friends and family to upload and share their experience.</p>
              </>
            }
          />
          
          <FAQItem
            question="Can I post wedding photos on social media?"
            answer="Please do! We would love to see any photos so be sure to tag us in the posts :)"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
