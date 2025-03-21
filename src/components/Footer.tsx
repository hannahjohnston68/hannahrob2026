
import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.open('https://drive.google.com/file/d/1rP8nliyJLvtk-sq-o0KSuWbWHB4VWAiu/view?usp=sharing', '_blank');
  };

  return (
    <footer className="bg-wedding-cream py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-serif text-2xl mb-2">Hannah & Rob</h3>
          <p className="font-body text-sm uppercase tracking-widest mb-4">September 12, 2026</p>
          
          <div 
            className="flex items-center justify-center mb-6 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
          >
            <div className={`transform transition-all duration-300 ${isHovered ? 'scale-150' : ''}`}>
              <Heart 
                size={14} 
                className={`text-wedding-charcoal transition-all duration-300 ${isHovered ? 'animate-fast-pulse text-wedding-pink' : ''}`}
                fill={isHovered ? "currentColor" : "none"}
              />
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
