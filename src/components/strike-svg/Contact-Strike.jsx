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
        className={inView ? 'contact-animated visible' : 'contact-animated'}
        viewBox="0 0 25 22"
        {...props}
      >
        <path
          height="100%"
          width="100%"
          ref={pathRef}
          d="M7 2v11h3v9"
          fill="none"
          stroke="rgba(255, 215, 0, 0.5)"
          strokeWidth={0.1}
        />
      </svg>
      <svg
        className={
          inView ? 'contact-animated-two visible' : 'contact-animated-two'
        }
        viewBox="0 0 25 22"
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
  .contact-animated,
  .contact-animated-two {
    stroke-dasharray: ${(props) => props.pathLength};
    stroke-dashoffset: ${(props) => props.pathLength};
    width: 100%;
    max-width: 1100px;
    height: auto;
    position: absolute;
    transform: translate(-8%, -15%) rotate(65deg);
    z-index: 0;
    top: 15vh;
  }

  .contact-animated-two {
    top: 15.5vh;
  }

  .contact-animated.visible,
  .contact-animated-two.visible {
    animation: draw 0.1s linear forwards;
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

  @media screen and (min-width: 900px) {
    .contact-animated,
    .contact-animated-two {
      transform: translate(-8%, -20%) rotate(65deg);
  }
`;

export default SvgComponent;
