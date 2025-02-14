import React, { useState, useEffect, useRef } from 'react';
import profilePic from '../../images/profilePic.jpg';
import { useSpring, animated } from '@react-spring/web';

import Strike from '../strike-svg/Strike';
import SkillsList from './SkillsList';

import './About.css';
import '../../theme.css';

const About = () => {
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

  // Animate styles
  const titleStyle = useSpring({
    transform: isVisible ? 'translate(0px)' : 'translate(-50px)',
    opacity: isVisible ? 1 : 0,
    delay: 300,
  });

  const underlineStyle = useSpring({
    transform: isVisible ? 'translate(0px)' : 'translate(-50px)',
    opacity: isVisible ? 1 : 0,
    delay: 600,
  });

  const profilePicStyle = useSpring({
    opacity: isVisible ? 1 : 0,
    delay: 1000,
  });

  const paragraphStyle = useSpring({
    opacity: isVisible ? 1 : 0,
    delay: 500,
  });

  const aboutSideStyle = useSpring({
    opacity: isVisible ? 1 : 0,
    delay: 500,
  });

  return (
    <section id="about" className="About padded-section" ref={sectionRef}>
      <Strike />
      <div className="about-title-container">
        <animated.div style={titleStyle}>
          <h1 className="section-title">About</h1>
        </animated.div>
        <animated.div className="about-underline" style={underlineStyle} />
      </div>
      <div className="about-container">
        <article className="about-info-container">
          <img
            style={profilePicStyle}
            className="profile-pic"
            src={profilePic}
            alt="me"
          />
          <div className="profile-pic-bg"></div>
          <div className="about-p-container">
            <p style={paragraphStyle} className="about-paragraph">
              Hey! I'm Russ. I found my passion for UI and tech as a kid filming
              and editing skateboarding videos with my brother.
            </p>
            <p style={paragraphStyle} className="about-paragraph">
              I'm a big climber, fan of outdoor activities, and spending time
              with my other half and our little pup!
            </p>
            <p style={paragraphStyle} className="about-paragraph">
              I am a detail-oriented person and enjoy working on ambitious
              projects with a great team.
            </p>
          </div>
        </article>
      </div>
      <div style={aboutSideStyle} className="about-side">
        <SkillsList />
      </div>
    </section>
  );
};

export default About;
