"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type WeddingPartyMember = {
  quote: string;
  name: string;
  role: string;
  src: string;
};

export const AnimatedWeddingParty = ({
  members,
  autoplay = false,
  className,
}: {
  members: WeddingPartyMember[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [autoplayTimer, setAutoplayTimer] = useState<NodeJS.Timeout | null>(null);

  const resetAutoplayTimer = useCallback(() => {
    if (autoplayTimer) {
      clearTimeout(autoplayTimer);
    }
    setIsAutoplayPaused(true);
    const timer = setTimeout(() => {
      setIsAutoplayPaused(false);
    }, 5000);
    setAutoplayTimer(timer);
  }, [autoplayTimer]);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % members.length);
    resetAutoplayTimer();
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + members.length) % members.length);
    resetAutoplayTimer();
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay && !isAutoplayPaused) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [autoplay, isAutoplayPaused]);

  useEffect(() => {
    return () => {
      if (autoplayTimer) {
        clearTimeout(autoplayTimer);
      }
    };
  }, [autoplayTimer]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-12 bg-white", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-[500px] w-full bg-wedding-pink rounded-3xl">
            <AnimatePresence>
              {members.map((member, index) => (
                <motion.div
                  key={member.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : members.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom p-4"
                  style={{ backgroundColor: 'transparent' }}
                >
                  <div className="relative w-full h-full bg-wedding-pink rounded-2xl">
                    <img
                      src={member.src}
                      alt={member.name}
                      className={`h-full w-full object-cover rounded-2xl shadow-xl grayscale contrast-125 brightness-110 ${
                        member.src.includes('camille') ? 'object-[5%_20%]' : 'object-center'
                      }`}
                      style={{
                        border: '8px solid white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-serif text-wedding-charcoal">
              {members[active].name}
            </h3>
            {members[active].role && (
              <p className="text-sm text-wedding-charcoal/70">
                {members[active].role}
              </p>
            )}
            <motion.p className="text-lg text-wedding-charcoal/80 mt-8">
              {members[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-wedding-pink/10 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-wedding-pink group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-wedding-pink/10 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-wedding-pink group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};