import React from 'react';
import './404.css';

const NotFound: React.FC = () => {
  return (
    <div className="wrapper">
      <section className="section-notfound">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </section>
    </div>
  );
};

export default NotFound;
