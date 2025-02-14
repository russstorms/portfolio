import React, { useState, useEffect, useRef } from 'react';
import { scrollToSection } from '../../helpers/scrollToSection';
import { animated, useSpring } from '@react-spring/web';
import { KeyboardArrowUp, GitHub, LinkedIn } from '@mui/icons-material';
import ContactStrike from '../strike-svg/Contact-Strike';
import './Contact.css';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fadeInSpring = (delay) =>
    useSpring({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
      delay,
    });

  return (
    <section className="Contact padded-section" id="contact" ref={sectionRef}>
      <ContactStrike />
      <div className="contact-title-container">
        <animated.h1 className="section-title" style={fadeInSpring(300)}>
          Contact
        </animated.h1>
        <animated.div className="contact-underline" style={fadeInSpring(600)} />
      </div>
      <animated.div style={fadeInSpring(800)}>
        <p>Have a question or want to work together?</p>
        <div className="contact-btn-container">
          {[
            {
              icon: <GitHub />,
              link: 'https://github.com/rstorms90',
              label: 'Github',
            },
            {
              icon: <LinkedIn />,
              link: 'https://www.linkedin.com/in/russell-storms1003/',
              label: 'LinkedIn',
            },
          ].map(({ icon, link, label }) => (
            <button
              key={label}
              className="contact-btn"
              aria-label={label}
              onClick={() => window.open(link)}
            >
              {icon}
            </button>
          ))}
        </div>
      </animated.div>
      <animated.div
        style={useSpring({ opacity: 1, delay: 500 })}
        onClick={() => scrollToSection('home')}
        className="arrow-button-container"
      >
        <KeyboardArrowUp fontSize="large" className="projects-arrow-button" />
        <KeyboardArrowUp
          fontSize="large"
          className="projects-arrow-button-two"
        />
      </animated.div>
    </section>
  );
};

export default Contact;
