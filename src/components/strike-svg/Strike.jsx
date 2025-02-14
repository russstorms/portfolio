import React, { useState, createRef, useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const SvgComponent = (props) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });
  const pathRef = createRef();
  const [pathLength, setPathLength] = useState();

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [pathRef]);

  return (
    <Wrapper ref={inViewRef} pathLength={pathLength}>
      <svg
        className={inView ? 'about-animated visible' : 'about-animated'}
        viewBox="0 0 15 24"
        {...props}
      >
        <path
          height="100%"
          width="100%"
          ref={pathRef}
          d="M7 2v11h3v9"
          fill="none"
          stroke="rgba(255, 215, 0, 0.5)"
          strokeWidth={0.07}
        />
      </svg>
      <svg
        className={inView ? 'about-animated-two visible' : 'about-animated-two'}
        viewBox="0 0 15 24"
        {...props}
      >
        <path
          height="100%"
          width="100%"
          ref={pathRef}
          d="M7 2v11h3v9"
          fill="none"
          stroke="rgba(255, 255, 0, 0.5)"
          strokeWidth={0.03}
        />
      </svg>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .about-animated,
  .about-animated-two {
    stroke-dasharray: ${(props) => props.pathLength};
    stroke-dashoffset: ${(props) => props.pathLength};
    width: 100%;
    max-width: 1100px;
    height: auto;
    position: absolute;
    top: -1vh;
    left: 50%;
    transform: translate(-50%, -22%) rotate(-60deg);
    z-index: 0;
  }
  .about-animated-two {
    top: 0;
  }
  .about-animated.visible,
  .about-animated-two.visible {
    animation: draw 0.2s linear forwards;
    animation-delay: 2s;
  }
  @keyframes draw {
    from {
      stroke-dashoffset: ${(props) => props.pathLength};
    }
    to {
      stroke-dashoffset: 0;
    }
  }


  @media screen and (min-width: 700px) {
    .about-animated,
    .about-animated-two {
      left: 50%;
      transform: translate(-50%, 6%) rotate(-60deg);
    }
    .about-animated-two {
      top -2vh;
    }

  @media screen and (min-width: 900px) {
    .about-animated,
    .about-animated-two {
      left: 50%;
      transform: translate(-50%, -12%) rotate(-60deg);
  }

  @media screen and (min-width: 1050px) {
    .about-animated,
    .about-animated-two {
      left: 50%;
      transform: translate(-50%, -15%) rotate(-60deg);
  }
  @media screen and (min-width: 1400px) {
    .about-animated,
    .about-animated-two {
      max-width: 1400px;
      transform: translate(-50%, -20%) rotate(-60deg);
  }
`;

export default SvgComponent;
