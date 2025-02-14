import React, { useState, useEffect, useRef } from 'react';
import { scrollToSection } from '../../helpers/scrollToSection';
import { animated, useSpring, useTrail } from '@react-spring/web';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import './Splash.css';

const Splash = () => {
  const [xValue, setXValue] = useState(window.innerWidth < 768 ? -10 : -20);
  const [flicker, setFlicker] = useState(null);
  const [firstName] = useState(['R', 'u', 's', 's']);
  const [lastName] = useState([`S`, `t`, `o`, `r`, `m`, `s`]);
  const [title] = useState([`Software Engineer`]);

  // Refs for the paths
  const pathRefOne = useRef(null);
  const pathRefTwo = useRef(null);

  // Store the path lengths
  const [pathLengthOne, setPathLengthOne] = useState(null);
  const [pathLengthTwo, setPathLengthTwo] = useState(null);

  // On mount, calculate the total length of the paths
  useEffect(() => {
    if (pathRefOne.current) {
      setPathLengthOne(pathRefOne.current.getTotalLength());
    }
    if (pathRefTwo.current) {
      setPathLengthTwo(pathRefTwo.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setXValue(window.innerWidth < 768 ? -10 : -20);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define the spring for both paths
  const svgSpringOne = useSpring({
    opacity: 1,
    strokeDashoffset: pathLengthOne,
    to: { strokeDashoffset: 0, opacity: 1 },
    from: { opacity: 0, strokeDashoffset: pathLengthOne },
    config: { duration: 2500 },
    delay: 2500,
    config: { tension: 30, friction: 8, clamp: true },
  });

  const svgSpringTwo = useSpring({
    opacity: 1,
    strokeDashoffset: pathLengthTwo,
    to: { strokeDashoffset: 0, opacity: 1 },
    from: { opacity: 0, strokeDashoffset: pathLengthTwo },
    config: { duration: 2500 },
    delay: 2500,
    config: { tension: 30, friction: 8, clamp: true },
  });

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
        <path
          ref={pathRefOne}
          className={`lightning-bolt ${flicker ? 'flicker' : ''}`}
          strokeDasharray={pathLengthOne}
          fill="none"
          stroke="gold"
          strokeWidth="1"
          d="M7 2v11h3v9l7-12h-4l4-8z"
        />
        <animated.path
          style={svgSpringOne}
          strokeDasharray={pathLengthOne}
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
        <path
          ref={pathRefTwo}
          className={`lightning-bolt-two ${flicker ? 'flicker' : ''}`}
          strokeDasharray={pathLengthTwo}
          fill="none"
          stroke="gold"
          strokeWidth=".5"
          d="M7 2v11h3v9l7-12h-4l4-8z"
        />
        <animated.path
          style={svgSpringTwo}
          strokeDasharray={pathLengthTwo}
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
        <span className="anchor" />
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
