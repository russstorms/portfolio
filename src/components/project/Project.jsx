import React from 'react';
import { useSpring, animated } from '@react-spring/web';

import './Project.css';

const Project = ({ project }) => {
  const [{ y, color }, set] = useSpring(() => ({ y: 100 }));

  return (
    <div
      className="project"
      onMouseEnter={() => set({ y: 0 })}
      onMouseLeave={() => set({ y: 100 })}
    >
      <img
        className="project-image"
        src={`${project.imageSrc}`}
        alt="project"
      />

      <animated.div
        style={{ transform: y.to((v) => `translateY(${v}%`) }}
        className="overlay"
      >
        <animated.span className="project-text" style={{ color }}>
          <h5 className="project-name">{project.title}</h5>
          {project.subTitle !== '' && <p>{project.subTitle}</p>}
          {project.url !== '' ? (
            <a
              className="project-btn"
              href={`${project.url}`}
              alt=""
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </a>
          ) : (
            <p className="no-link">(Not Hosted)</p>
          )}
          <p className="project-description">{project.description}</p>
        </animated.span>
      </animated.div>
    </div>
  );
};

export default Project;
