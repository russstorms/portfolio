import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import profilePic from '../../images/profilePic.jpg';

import Strike from '../strike-svg/Strike';
import SkillsList from './SkillsList';

import './About.css';
import '../../theme.css';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { threshold: 0.2 }
      ),
    []
  );

  useEffect(() => {
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [observer]);

  // Unified animations
  const fadeIn = (delay = 0) =>
    useSpring({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateX(0px)' : 'translateX(-50px)',
      delay,
    });

  return (
    <section id="about" className="About padded-section" ref={sectionRef}>
      <Strike />

      <div className="about-title-container">
        <animated.h1 className="section-title" style={fadeIn(300)}>
          About
        </animated.h1>
        <animated.div className="about-underline" style={fadeIn(600)} />
      </div>

      <div className="about-container">
        <article className="about-info-container">
          <img
            className="profile-pic"
            src={profilePic}
            alt="me"
            style={fadeIn(1000)}
          />
          <div className="profile-pic-bg"></div>

          <div className="about-p-container">
            {[
              "Hey! I'm Russ. I found my passion for UI and tech as a kid filming and editing skateboarding videos with my brother.",
              "I'm a big climber, fan of outdoor activities, and spending time with my other half and our little pup!",
              'I am a detail-oriented person and enjoy working on ambitious projects with a great team.',
            ].map((text, index) => (
              <p key={index} className="about-paragraph" style={fadeIn(500)}>
                {text}
              </p>
            ))}
          </div>
        </article>
      </div>

      <div className="about-side">
        <SkillsList />
      </div>
    </section>
  );
};

export default About;
