
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return <footer className="bg-wedding-cream border-t border-wedding-taupe/20 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-serif text-2xl mb-2">Hannah & Rob</h3>
          <p className="font-body text-sm uppercase tracking-widest mb-4">September 12, 2026</p>
          
          <div className="flex items-center justify-center space-x-1 text-wedding-charcoal/70 mb-6">
            <Heart size={14} className="fill-wedding-gold text-wedding-gold" />
          </div>
          
          <div className="text-sm text-wedding-charcoal/60">
            
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;
