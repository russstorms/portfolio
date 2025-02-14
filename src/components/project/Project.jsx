import React from 'react';
import { useSpring, animated } from '@react-spring/web';

import './Project.css';

const Project = ({ project }) => {
  const animation = useSpring({
    y: 100,
    from: { y: 100 },
  });

  return (
    <div
      className="project"
      onMouseEnter={() => animation.y.start(0)}
      onMouseLeave={() => animation.y.start(100)}
    >
      <img
        className="project-image"
        src={project.imageSrc}
        alt={project.title}
      />

      <animated.div
        className="overlay"
        style={{ transform: animation.y.to((v) => `translateY(${v}%)`) }}
      >
        <div className="project-text">
          <h5 className="project-name">{project.title}</h5>
          {project.subTitle && <p>{project.subTitle}</p>}
          {project.url ? (
            <a
              className="project-btn"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </a>
          ) : (
            <p className="no-link">(Not Hosted)</p>
          )}
          <p className="project-description">{project.description}</p>
        </div>
      </animated.div>
    </div>
  );
};

export default Project;
