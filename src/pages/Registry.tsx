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
    name: "Hannah with her Dad",
    role: "",
    quote: "A father's love and guidance has been a constant source of strength and support throughout my life.",
    src: "/images/family/dad.png",
  },
  {
    name: "Hannah with her Mom",
    role: "",
    quote: "A mother's love knows no bounds. Thank you for being my rock and my inspiration.",
    src: "/images/family/mum.png",
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
    quote: "Brothers by blood, friends by choice. Thank you for all the memories and adventures.",
    src: "/images/family/patrick.png",
  },
  {
    name: "Hannah with Charlie",
    role: "",
    quote: "A special bond that only siblings share. Thank you for being my partner in crime.",
    src: "/images/family/charlie.png",
  },
  {
    name: "Rob with Kayman",
    role: "",
    quote: "From university days to life's biggest moments, thank you for being an incredible friend and standing by my side.",
    src: "/images/friends/kayman.png",
  },
  {
    name: "Hannah with Caitlin",
    role: "",
    quote: "A friendship that has grown deeper with every passing year. Thank you for being my constant support and confidante.",
    src: "/images/friends/caitlin.png",
  },
  {
    name: "Camille",
    role: "",
    quote: "Bridesmaid and beloved bird mom.",
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
      </main>
      <Footer />
    </motion.div>
  );
};

export default WeddingParty;