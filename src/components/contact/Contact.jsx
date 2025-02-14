import React, { useState, useEffect, useRef } from 'react';
import { scrollToSection } from '../../helpers/scrollToSection';
import { animated, useSpring } from '@react-spring/web';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import ContactStrike from '../strike-svg/Contact-Strike';

import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animations
  const titleSpring = useSpring({
    transform: isVisible ? 'translate(0px)' : 'translate(-50px)',
    opacity: isVisible ? 1 : 0,
    delay: 300,
  });

  const underlineSpring = useSpring({
    transform: isVisible ? 'translate(0px)' : 'translate(-50px)',
    opacity: isVisible ? 1 : 0,
    delay: 600,
  });

  const contentSpring = useSpring({
    opacity: isVisible ? 1 : 0,
    delay: 800,
  });

  const arrowSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    config: { tension: 20, friction: 10 },
  });

  return (
    <section className="Contact padded-section" id="contact" ref={sectionRef}>
      <ContactStrike />
      <div className="contact-title-container">
        <animated.div style={titleSpring}>
          <h1 className="section-title">Contact</h1>
        </animated.div>
        <animated.div className="contact-underline" style={underlineSpring} />
      </div>

      <animated.div style={contentSpring}>
        <p>Have a question or want to work together?</p>
        <div className="contact-btn-container">
          <button
            className="contact-btn"
            aria-label="Github.com"
            onClick={() => window.open('https://github.com/rstorms90')}
          >
            <GitHubIcon className="github-icon" />
          </button>
          <button
            className="contact-btn"
            aria-label="LinkedIn.com"
            onClick={() =>
              window.open('https://www.linkedin.com/in/russell-storms1003/')
            }
          >
            <LinkedInIcon className="linkedin-icon" />
          </button>
        </div>
      </animated.div>

      <animated.div
        style={arrowSpring}
        onClick={() => scrollToSection('home')}
        className="arrow-button-container"
      >
        <KeyboardArrowUpIcon
          className="projects-arrow-button"
          fontSize="large"
        />
        <KeyboardArrowUpIcon
          className="projects-arrow-button-two"
          fontSize="large"
        />
      </animated.div>
    </section>
  );
};

export default Contact;
