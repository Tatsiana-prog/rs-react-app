import React from 'react';
import ButtonSave from "../ButtonSave/ButtonSave"

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
    <ButtonSave/>
    <h2 style={{ textAlign: 'center' }}>{name}</h2>
    <p style={{ textAlign: 'center' }}>{description}</p>
  </div>
);

export default Card;
