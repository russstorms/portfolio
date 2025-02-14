import React, { useState, useEffect, useRef } from 'react';
import { scrollToSection } from '../../helpers/scrollToSection';
import { animated, useSpring, useTrail } from '@react-spring/web';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './Splash.css';

// Custom hook to manage path animation
const usePathAnimation = (delay = 2500) => {
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(null);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const pathSpring = useSpring({
    opacity: 1,
    strokeDashoffset: pathLength,
    to: { strokeDashoffset: 0, opacity: 1 },
    from: { opacity: 0, strokeDashoffset: pathLength },
    config: { tension: 30, friction: 8, clamp: true },
    delay,
  });

  return { pathRef, pathLength, pathSpring };
};

const Splash = () => {
  const [xValue, setXValue] = useState(window.innerWidth < 768 ? -10 : -20);
  const [flicker, setFlicker] = useState(null);
  const [firstName] = useState(['R', 'u', 's', 's']);
  const [lastName] = useState([`S`, `t`, `o`, `r`, `m`, `s`]);
  const [title] = useState([`Software Engineer`]);

  // Lightning bolt animations
  const lightningOne = usePathAnimation();
  const lightningTwo = usePathAnimation();

  useEffect(() => {
    const handleResize = () => {
      setXValue(window.innerWidth < 768 ? -10 : -20);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // First name animation
  const firstNameSpring = useTrail(firstName.length, {
    from: { opacity: 0, x: 0, height: 0 },
    to: { opacity: 1, x: 10, height: 80 },
    config: { tension: 180, friction: 30 },
  });

  // Last name animation
  const lastNameSpring = useTrail(lastName.length, {
    from: { opacity: 0, x: 0, height: 0, color: '#FFFFFF' },
    to: { opacity: 1, x: xValue, height: 80, color: '#4682b4' },
    config: { tension: 180, friction: 30 },
  });

  // Title animation
  const titleSpring = useTrail(title.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1500,
    config: { tension: 20, friction: 10 },
  });

  // Arrow animation
  const arrowSpring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    config: { tension: 20, friction: 10 },
  });

  // Flicker effect timing
  useEffect(() => {
    const timer = setTimeout(() => setFlicker(true), 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="Splash">
      <svg
        viewBox="0 0 25 25"
        preserveAspectRatio="none"
        className={`lightning-bolt ${flicker ? 'flicker' : ''}`}
      >
        <animated.path
          ref={lightningOne.pathRef}
          style={lightningOne.pathSpring}
          strokeDasharray={lightningOne.pathLength}
          fill="none"
          stroke="yellow"
          strokeWidth=".25"
          d="M7 2v11h3v9l7-12h-4l4-8z"
        />
      </svg>

      <svg
        viewBox="0 0 25 25"
        preserveAspectRatio="none"
        className={`lightning-bolt-two ${flicker ? 'flicker' : ''}`}
      >
        <animated.path
          ref={lightningTwo.pathRef}
          style={lightningTwo.pathSpring}
          strokeDasharray={lightningTwo.pathLength}
          fill="none"
          stroke="gold"
          strokeWidth=".5"
          d="M7 2v11h3v9l7-12h-4l4-8z"
        />
      </svg>

      <div className="intro-name-container">
        <div className="intro-first-name">
          {firstNameSpring.map(({ x, height, ...rest }, index) => (
            <animated.div
              style={{
                ...rest,
                transform: x.to((x) => `translate3d(0, ${x}px, 0)`),
              }}
              key={index}
            >
              {firstName[index]}
            </animated.div>
          ))}
        </div>
        <div className="intro-last-name">
          {lastNameSpring.map(({ x, height, ...rest }, index) => (
            <animated.div
              style={{
                ...rest,
                transform: x.to((x) => `translate3d(0, ${x}px, 0)`),
              }}
              key={index}
            >
              {lastName[index]}
            </animated.div>
          ))}
        </div>
      </div>

      <div className="intro-titles">
        {titleSpring.map((animation, index) => (
          <animated.div style={animation} key={index}>
            {title}
          </animated.div>
        ))}
      </div>

      <animated.div
        style={arrowSpring}
        onClick={() => scrollToSection('about')}
        className="arrow-button-container"
      >
        <KeyboardArrowDownIcon
          className="projects-arrow-button"
          fontSize="large"
        />
        <KeyboardArrowDownIcon
          className="projects-arrow-button-two"
          fontSize="large"
        />
      </animated.div>
    </section>
  );
};

export default Splash;
