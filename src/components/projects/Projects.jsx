import React, { useState, useEffect, useRef, useMemo } from 'react';
import { animated, useTrail, useSpring } from '@react-spring/web';

import { projectsData } from '../../projectsData';
import Project from '../project/Project';

import '../../theme.css';
import './Projects.css';

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const loadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projectsData.length));
  };

  const projectsToShow = isMobile
    ? projectsData.slice(0, visibleProjects)
    : projectsData;

  // Unified animations
  const fadeIn = (delay = 0) =>
    useSpring({
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translate(0)' : 'translate(50px)',
      delay,
    });

  const projectsTrail = useTrail(projectsToShow.length, {
    opacity: 1,
    from: { opacity: 0 },
    config: { tension: 40, friction: 10 },
  });

  return (
    <section id="projects" className="Projects padded-section" ref={sectionRef}>
      <div className="projects-title-container">
        <animated.h1
          className="section-title projects-title"
          style={fadeIn(300)}
        >
          Projects
        </animated.h1>
        <animated.div className="projects-underline" style={fadeIn(600)} />
      </div>

      <div className="projects-container">
        {projectsTrail.map((style, index) => (
          <animated.div className="project-container" key={index} style={style}>
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
  );
};

export default Projects;
