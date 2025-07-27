import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        padding: '80px 0',
        textAlign: 'center',
        background: 'orange',
        height: '100vh',
      }}
    >
      <h1 style={{ margin: '0' }}>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
