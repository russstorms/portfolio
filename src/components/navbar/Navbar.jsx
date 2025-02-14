import React, { useEffect, useRef, useState } from 'react';
import { scrollToSection } from '../../helpers/scrollToSection';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', section: 'home' },
  { label: 'About', section: 'about' },
  { label: 'Portfolio', section: 'projects' },
  { label: 'Contact', section: 'contact' },
];

const Navbar = () => {
  const navbarRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > navbar.offsetTop) {
        // Scrolling down and past navbar
        setSticky(true);
      } else if (
        currentScrollY < lastScrollY &&
        currentScrollY < navbar.offsetTop
      ) {
        // Scrolling up and within original position
        setSticky(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="nav-wrapper">
      <section
        className={`Navbar ${sticky ? 'sticky' : ''}`}
        id="navbar"
        ref={navbarRef}
      >
        <div className="nav-neon-border" />
        <nav className="clipped-nav">
          {NAV_LINKS.map(({ label, section }) => (
            <h4
              key={section}
              className="nav-link"
              onClick={() => scrollToSection(section)}
            >
              {label}
            </h4>
          ))}
        </nav>
      </section>
    </div>
  );
};

export default Navbar;
