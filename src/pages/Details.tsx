import { jsxDEV } from "react/jsx-dev-runtime";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeddingDetails from "../components/WeddingDetails";
import FAQ from "../components/FAQ";
import { motion } from 'framer-motion';
import { Train, Car, ExternalLink } from 'lucide-react';
import { Button } from "../components/ui/button";

const Details = () => {
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
      <main className="pt-32 pb-0 bg-wedding-cream">
        <WeddingDetails />

        <section className="py-8 px-4 bg-wedding-cream">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-2xl text-center mb-8">Getting To The Venue</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column - Public Transit */}
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="glass-card glass-card-borderless p-8 h-full bg-white/90"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-wedding-pink/10 rounded-full flex items-center justify-center shadow-inner border-2 border-wedding-pink">
                        <Train className="w-5 h-5 text-wedding-pink" />
                      </div>
                      <h3 className="font-serif text-xl">Public Transit</h3>
                    </div>

                    <div className="space-y-2 text-wedding-charcoal/80">
                      <p className="font-medium">Via TTC Subway and Streetcar:</p>
                      <div className="space-y-3">
                        <div className="pl-3 border-l-2 border-wedding-pink/20">
                          <a
                            href="https://www.google.com/maps/dir/Union+Station,+Front+Street+West,+Toronto,+ON/Archeo,+31+Trinity+St,+Toronto,+ON+M5A+3C4/@43.6484,-79.3749,16z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x89d4cb2b5935bf09:0x901daf522a4f4e63!2m2!1d-79.3803!2d43.6453!1m5!1m1!1s0x89d4cb3285b4279d:0x6af58a5298062d24!2m2!1d-79.3595!2d43.6505!3e3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <p className="font-medium text-wedding-charcoal group-hover:text-wedding-pink transition-colors duration-300">
                              From Union Station (Line 1)
                              <ExternalLink size={12} className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </p>
                            <p className="mt-0.5">
                              Take the 504 King streetcar eastbound (toward Broadview Station).
                              Exit at Trinity Street stop and walk south into the Distillery District.
                              Archeo is located centrally within the district.
                            </p>
                          </a>
                        </div>

                        <div className="pl-3 border-l-2 border-wedding-pink/20">
                          <a
                            href="https://www.google.com/maps/dir/Castle+Frank+Station,+Castle+Frank+Road,+Toronto,+ON/Archeo,+31+Trinity+St,+Toronto,+ON+M5A+3C4/@43.6667,-79.3736,15z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x89d4cb4c83976f71:0x42665b17c4e3d88d!2m2!1d-79.3693!2d43.6734!1m5!1m1!1s0x89d4cb3285b4279d:0x6af58a5298062d24!2m2!1d-79.3595!2d43.6505!3e3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <p className="font-medium text-wedding-charcoal group-hover:text-wedding-pink transition-colors duration-300">
                              From Castle Frank Station (Line 2)
                              <ExternalLink size={12} className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </p>
                            <p className="mt-0.5">
                              Take the 65 Parliament bus southbound. Exit at Front St East stop
                              and walk one block south to the Distillery District entrance.
                              Archeo will be directly ahead inside.
                            </p>
                          </a>
                        </div>
                      </div>

                      <p className="text-sm italic mt-4">
                        Subway trains and streetcars typically run every 5–10 minutes.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Driving & Parking */}
              <div className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="glass-card glass-card-borderless p-8 h-full bg-white/90"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-wedding-pink/10 rounded-full flex items-center justify-center shadow-inner border-2 border-wedding-pink">
                        <Car className="w-5 h-5 text-wedding-pink" />
                      </div>
                      <h3 className="font-serif text-xl">Driving & Parking</h3>
                    </div>

                    <div className="space-y-2 text-wedding-charcoal/80">
                      <div>
                        <p className="font-medium text-wedding-charcoal mb-1">Parking Options:</p>
                        <div className="pl-3 border-l-2 border-wedding-pink/20">
                          <ul className="space-y-2">
                            <li>
                              <a
                                href="https://www.google.com/maps/search/?api=1&query=Distillery+District+Green+P+Parking+Toronto"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                              >
                                <p className="group-hover:text-wedding-pink transition-colors duration-300">
                                  Distillery District Green P lot (main parking) with entrances
                                  from Parliament Street and Cherry Street
                                  <ExternalLink size={12} className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </p>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.google.com/maps/search/?api=1&query=33+Mill+Street+Toronto+Parking"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                              >
                                <p className="group-hover:text-wedding-pink transition-colors duration-300">
                                  Additional parking at 33 Mill Street
                                  <ExternalLink size={12} className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </p>
                              </a>
                            </li>
                            <li>
                              <a
                                href="https://www.google.com/maps/search/?api=1&query=373+Front+Street+East+Toronto+Parking"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group"
                              >
                                <p className="group-hover:text-wedding-pink transition-colors duration-300">
                                  373 Front Street East parking lot
                                  <ExternalLink size={12} className="inline-block ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </p>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <p className="text-sm italic mt-4">
                          Street parking may be available in the surrounding area
                          (subject to city parking regulations)
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <FAQ />

        <section className="py-12 px-4 sm:px-8 bg-[#415A4E] mt-8">
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
                  src={`/images/venue/distillery-2.png`}
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
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Details;
