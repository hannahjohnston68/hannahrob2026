import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClasses = (isActive: boolean, isScrolled: boolean) => cn(
    "relative px-3 py-2 text-sm tracking-wide transition-all duration-300 font-body uppercase",
    isActive 
      ? "text-wedding-pink after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-wedding-pink after:transform after:scale-x-100"
      : isScrolled || !isHomePage
        ? "text-wedding-charcoal hover:text-wedding-pink after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-wedding-pink after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
        : "text-wedding-cream hover:text-wedding-pink after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-wedding-pink after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
  );

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 font-sans", 
      isScrolled 
        ? "bg-white/40 backdrop-blur-lg shadow-sm py-2"
        : "bg-transparent py-4",
      "lightbox-open:hidden"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/" className={cn(
              "font-serif text-xl sm:text-2xl tracking-wider",
              isScrolled || !isHomePage ? "text-wedding-charcoal" : "text-wedding-cream"
            )}>Hannah & Rob</NavLink>
          </div>

          {isMobile !== undefined && (
            isMobile ? (
              <>
                <button 
                  onClick={toggleMenu} 
                  className={cn(
                    "p-2 rounded-md focus:outline-none transition-colors duration-200",
                    isScrolled || !isHomePage ? "text-wedding-charcoal" : "text-wedding-cream"
                  )}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                
                <div 
                  className={cn(
                    "absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300 transform",
                    isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none",
                    "z-[90]",
                    "lightbox-open:hidden"
                  )}
                >
                  <div className="flex flex-col space-y-2 px-4 py-4">
                    <NavLink 
                      to="/" 
                      className={({isActive}) => cn(
                        "py-2 px-4 w-full transition-colors duration-200",
                        isActive ? "text-wedding-pink" : "text-wedding-charcoal hover:text-wedding-pink"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Home
                    </NavLink>
                    <NavLink 
                      to="/details" 
                      className={({isActive}) => cn(
                        "py-2 px-4 w-full transition-colors duration-200",
                        isActive ? "text-wedding-pink" : "text-wedding-charcoal hover:text-wedding-pink"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Details
                    </NavLink>
                    <NavLink 
                      to="/wedding-party" 
                      className={({isActive}) => cn(
                        "py-2 px-4 w-full transition-colors duration-200",
                        isActive ? "text-wedding-pink" : "text-wedding-charcoal hover:text-wedding-pink"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      Wedding Party
                    </NavLink>
                    <a 
                      href="https://withjoy.com/hannah-and-rob-sep-26/rsvp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-4 w-full transition-colors duration-200 text-wedding-charcoal hover:text-wedding-pink"
                      onClick={() => setIsOpen(false)}
                    >
                      RSVP
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <nav className="flex space-x-6 sm:space-x-8">
                <NavLink to="/" className={({isActive}) => navLinkClasses(isActive, isScrolled)}>Home</NavLink>
                <NavLink to="/details" className={({isActive}) => navLinkClasses(isActive, isScrolled)}>Details</NavLink>
                <NavLink to="/wedding-party" className={({isActive}) => navLinkClasses(isActive, isScrolled)}>Wedding Party</NavLink>
                <a 
                  href="https://withjoy.com/hannah-and-rob-sep-26/rsvp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "relative px-3 py-2 text-sm tracking-wide transition-all duration-300 font-body uppercase",
                    isScrolled || !isHomePage
                      ? "text-wedding-charcoal hover:text-wedding-pink after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-wedding-pink after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                      : "text-wedding-cream hover:text-wedding-pink after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-wedding-pink after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  )}
                >
                  RSVP
                </a>
              </nav>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
