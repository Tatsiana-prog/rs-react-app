'use client';

import Link from 'next/link';
import Header from '../../components/Header/Header';
import './About.css';
export default function AboutPage() {
  return (
    <div className="wrapper">
      <div className="about">
        <Header />

        <section className="section-about">
          <h1>About me</h1>
          <h2>Tatsiana Vysotskaya</h2>
          <p>Frontend Developer</p>
          <p>
            I&apos;m studying on a course{' '}
            <Link
              href="https://rs.school/courses/reactjs"
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
}
