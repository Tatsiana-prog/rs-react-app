'use client';

import Link from 'next/link';
import Header from '../components/Header/Header';
import './About.css';
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const aboutT = useTranslations('AboutPage');

  return (
    <div className="wrapper">
      <div className="about">
        <Header />

        <section className="section-about">
          <h1>{aboutT('title')}</h1>
          <h2>{aboutT('name')}</h2>
          <p>{aboutT('role')}</p>
          <p>
            {aboutT('courseIntro')}{' '}
            <Link
              href="https://rs.school/courses/reactjs"
              target="_blank"
              rel="noopener noreferrer"
            >
              {aboutT('courseName')}
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
