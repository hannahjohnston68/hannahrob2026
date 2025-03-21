
import React, { useState, useCallback } from 'react';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

const Footer: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://drive.google.com/file/d/1rP8nliyJLvtk-sq-o0KSuWbWHB4VWAiu/view?usp=sharing', '_blank');
  };

  const fireConfetti = useCallback(() => {
    const count = 20;
    const defaults = {
      origin: { y: 0.9 },
      colors: ['#D4919B', '#FAF9F6', '#333333'],
      disableForReducedMotion: true,
      ticks: 200  // Increased from 100 to 200 for longer animation duration
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        spread: 60,
        startVelocity: 15,
        scalar: 0.9,
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 35,
      origin: { y: 0.85 }
    });

    fire(0.2, {
      spread: 60,
      origin: { y: 0.9 }
    });

    fire(0.35, {
      spread: 100,
      decay: 0.94,
      scalar: 0.8,
      origin: { y: 0.88 }
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 15,
      decay: 0.95,
      scalar: 1.2,
      origin: { y: 0.9 }
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 30,
      origin: { y: 0.87 }
    });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    fireConfetti();
  };

  return (
    <footer className="bg-wedding-cream py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-serif text-2xl mb-2">Hannah & Rob</h3>
          <p className="font-body text-sm uppercase tracking-widest mb-4">September 12, 2026</p>
          
          <div className="relative">
            <div 
              className="flex items-center justify-center mb-6 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleClick}
            >
              <div className={`transform transition-all duration-300 ${isHovered ? 'scale-150' : ''}`}>
                <Heart 
                  size={14} 
                  className={`text-wedding-charcoal transition-all duration-300 ${isHovered ? 'text-wedding-pink' : ''}`}
                  fill={isHovered ? "currentColor" : "none"}
                />
              </div>
              {isHovered && (
                <div 
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-wedding-pink/90 text-white px-3 py-1 rounded text-sm font-body animate-fade-in"
                >
                  Click me for a surprise!
                </div>
              )}
            </div>
          </div>
          
          <div className="text-sm text-wedding-charcoal/60">
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
