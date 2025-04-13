import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';
import { AnimatedWeddingParty } from "@/components/ui/animated-testimonials";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Get the base URL from the environment
const baseUrl = import.meta.env.MODE === 'production' ? '/hannahrob2026' : '';

const weddingPartyMembers = [
  {
    name: "David",
    role: "",
    quote: "Father of the bride and winner of countless scrabbles games.",
    src: "/images/family/dad.png",
  },
  {
    name: "Alison",
    role: "",
    quote: "Mother of the bride and master of the sun salutation.",
    src: "/images/family/hannah+mum.png",
  },
  {
    name: "Jim",
    role: "",
    quote: "Father of the groom and secretly raising dozens of chipmunks in the backyard.",
    src: "/images/family/jim.png",
  },
  {
    name: "Joanne",
    role: "",
    quote: "Mother of the groom and knows the RBI of every player in the Blue Jays' starting lineup",
    src: "/images/family/joanne.png",
  },
  {
    name: "Rob with Patrick",
    role: "",
    quote: "Brother of the groom and ready to challenge you to Mario Kart at the drop of a hat.",
    src: "/images/family/patrick-removebg-preview.png",
  },
  {
    name: "Charlie",
    role: "",
    quote: "Brother of the bride and definitely has cooler music taste than you.",
    src: "/images/family/charlie.png",
  },
  {
    name: "Rob with Kayman",
    role: "",
    quote: "Best man and ready to take you tree top trekking.",
    src: "/images/friends/kayman.png",
  },
  {
    name: "Hannah with Caitlin",
    role: "",
    quote: "Maid of honour and visits the Gems & Minerals section of the ROM more than you'd think.",
    src: "/images/friends/caitlin.png",
  },
  {
    name: "Camille",
    role: "",
    quote: "Bridesmaid and bird enthusiast. California girl.",
    src: "/images/friends/camille.png",
  }
];

const WeddingParty = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <main className="pt-32 pb-20 bg-wedding-cream">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-serif text-3xl md:text-4xl mb-4 text-wedding-charcoal">Meet Our Wedding Party & Family</h1>
            <div className="h-px w-20 bg-wedding-pink mx-auto mb-6"></div>
            <p className="max-w-3xl mx-auto text-wedding-charcoal/80">
              Our special day wouldn't be complete without the incredible people who've supported, loved, and laughed with us through every chapter of our lives. From lifelong friends to family who've been there since day one, each person in our wedding party holds a special place in our hearts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white !bg-opacity-100 backdrop-blur-none p-8 rounded-lg shadow-lg"
            style={{ backgroundColor: 'white' }}
          >
            <AnimatedWeddingParty members={weddingPartyMembers} />
          </motion.div>
        </div>

        <section className="py-12 px-4 sm:px-8 bg-[#415A4E] mt-16">
          <div className="max-w-6xl mx-auto relative">
            {/* Distillery District Sketch */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="absolute top-0 right-0 w-96 z-10 hidden md:block"
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
              className="text-left pl-0 sm:pl-8 pt-8 pb-16 max-w-xl"
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
      </main>
      <Footer />
    </motion.div>
  );
};

export default WeddingParty;