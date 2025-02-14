import React, { useEffect, useRef } from 'react';
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

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const sticky = navbar.offsetTop;

    const handleScroll = () => {
      if (window.scrollY > sticky) {
        navbar.classList.add('sticky');
      } else {
        navbar.classList.remove('sticky');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="nav-wrapper">
      <section className="Navbar" id="navbar" ref={navbarRef}>
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
