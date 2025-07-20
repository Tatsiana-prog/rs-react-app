import React from 'react';

interface CardProps {
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, description }) => (
  <div
    style={{
      width: '180px',
      height: '180px',
      background: 'black',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      padding: '10px',
    }}
  >
    <h2 style={{ textAlign: 'center' }}>{name}</h2>
    <p style={{ textAlign: 'center' }}>{description}</p>
  </div>
);

export default Card;
