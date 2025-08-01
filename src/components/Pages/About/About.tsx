import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
import Header from '../../Header/Header';

const About: React.FC = () => {
  return (
    <div className="wrapper">
      <div className="about">
        <Header />

        <section className="section-about">
          <h1>About me</h1>
          <h2>Tatsiana Vysotskaya</h2>
          <p>Frontend Developer</p>
          <p>
            I&apos;m studying on a course {'  '}
            <Link
              to="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              RS School React Course
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
