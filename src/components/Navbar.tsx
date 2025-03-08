
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClasses = (isActive: boolean) =>
    cn(
      "relative px-3 py-2 text-sm tracking-wide transition-all duration-300 font-body uppercase hover:text-wedding-gold",
      isActive 
        ? "text-wedding-gold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-wedding-gold after:transform after:scale-x-100" 
        : "text-wedding-charcoal after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-wedding-gold after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
    );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-sans",
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className="text-wedding-charcoal font-serif text-xl sm:text-2xl tracking-wider">
              Sophie & James
            </NavLink>
          </div>

          {isMobile ? (
            <>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md text-wedding-charcoal focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg animate-fade-in py-4">
                  <div className="flex flex-col space-y-2 px-4">
                    <NavLink 
                      to="/" 
                      className={({ isActive }) => cn("py-2 px-4 w-full", isActive ? "text-wedding-gold" : "text-wedding-charcoal")}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </NavLink>
                    <NavLink 
                      to="/details" 
                      className={({ isActive }) => cn("py-2 px-4 w-full", isActive ? "text-wedding-gold" : "text-wedding-charcoal")}
                      onClick={() => setIsOpen(false)}
                    >
                      Details
                    </NavLink>
                    <NavLink 
                      to="/gallery" 
                      className={({ isActive }) => cn("py-2 px-4 w-full", isActive ? "text-wedding-gold" : "text-wedding-charcoal")}
                      onClick={() => setIsOpen(false)}
                    >
                      Gallery
                    </NavLink>
                    <NavLink 
                      to="/rsvp" 
                      className={({ isActive }) => cn("py-2 px-4 w-full", isActive ? "text-wedding-gold" : "text-wedding-charcoal")}
                      onClick={() => setIsOpen(false)}
                    >
                      RSVP
                    </NavLink>
                  </div>
                </div>
              )}
            </>
          ) : (
            <nav className="flex space-x-6 sm:space-x-8">
              <NavLink to="/" className={({ isActive }) => navLinkClasses(isActive)}>
                Home
              </NavLink>
              <NavLink to="/details" className={({ isActive }) => navLinkClasses(isActive)}>
                Details
              </NavLink>
              <NavLink to="/gallery" className={({ isActive }) => navLinkClasses(isActive)}>
                Gallery
              </NavLink>
              <NavLink to="/rsvp" className={({ isActive }) => navLinkClasses(isActive)}>
                RSVP
              </NavLink>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
