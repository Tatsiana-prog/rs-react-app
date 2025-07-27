import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Header from '../../Header/Header';

const About: React.FC = () => {
  return (
    <div className="about">
      <Header />
      <h1>About me</h1>
      <p>Tatsiana Vysotskaya</p>
      <p>Frontend Developer</p>
      <p>
        I&apos;m studying on a course
        <Link
          to="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          RS School React Course
        </Link>
      </p>
    </div>
  );
};

export default About;
