import React from 'react';
import { BiLogoTypescript, BiLogoNetlify } from 'react-icons/bi';
import {
  DiReact,
  DiNodejs,
  DiPhp,
  DiPostgresql,
  DiGit,
  DiNpm,
} from 'react-icons/di';
import {
  SiJavascript,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiSocketdotio,
  SiDocker,
  SiTypeorm,
} from 'react-icons/si';
import { TbBrandVercel } from 'react-icons/tb';

export const Specialities = () => {
  const specialities = {
    front: [
      { techName: 'Javascript', icon: <SiJavascript /> },
      { techName: 'React', icon: <DiReact /> },
      { techName: 'Typescript', icon: <BiLogoTypescript /> },
      { techName: 'Next', icon: <SiNextdotjs /> },
      { techName: 'HTML', icon: <SiHtml5 /> },
      { techName: 'CSS', icon: <SiCss3 /> },
    ],
    back: [
      { techName: 'Node', icon: <DiNodejs /> },
      { techName: 'PHP', icon: <DiPhp /> },
      { techName: 'SQL', icon: <DiPostgresql /> },
      { techName: 'TypeORM', icon: <SiTypeorm /> },
      { techName: 'Socket.io', icon: <SiSocketdotio /> },
    ],
    storage: [
      { techName: 'Github', icon: <DiGit /> },
      { techName: 'Netlify', icon: <BiLogoNetlify /> },
      { techName: 'Vercel', icon: <TbBrandVercel /> },
      { techName: 'NPM', icon: <DiNpm /> },
      { techName: 'Docker', icon: <SiDocker /> },
    ],
  };

  return specialities;
};
