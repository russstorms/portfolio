import React, { useState, useEffect, useRef } from 'react';
import { animated, useTrail, useSpring } from '@react-spring/web';

import { projectsData } from '../../projectsData';
import Project from '../project/Project';

import '../../theme.css';
import './Projects.css';

const Projects = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projectsData.length));
  };

  const projectsToShow = isMobile
    ? projectsData.slice(0, visibleProjects)
    : projectsData;

  // Project cards animation
  const projectsTrail = useTrail(projectsToShow.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 40, friction: 10 },
  });

  // Title and underline animation
  const titleStyle = useSpring({
    transform: isVisible ? 'translate(0)' : 'translate(50px)',
    opacity: isVisible ? 1 : 0,
    delay: 300,
  });

  const underlineStyle = useSpring({
    transform: isVisible ? 'translate(0)' : 'translate(50px)',
    opacity: isVisible ? 1 : 0,
    delay: 600,
  });

  return (
    <div className="Projects">
      <section id="projects" className="padded-section" ref={sectionRef}>
        <div className="projects-title-container">
          <animated.div style={titleStyle}>
            <h1 className="section-title projects-title">Projects</h1>
          </animated.div>
          <animated.div className="projects-underline" style={underlineStyle} />
        </div>

        <div className="projects-container">
          {projectsTrail.map(({ x, ...rest }, index) => (
            <animated.div
              className="project-container"
              key={index}
              style={{
                ...rest,
              }}
            >
              <Project id={index} project={projectsToShow[index]} />
            </animated.div>
          ))}
        </div>

        {isMobile && visibleProjects < projectsData.length && (
          <div className="load-more-btn-container">
            <button className="load-more-btn" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;
