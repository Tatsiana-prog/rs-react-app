import React from 'react';

interface ButtonProps {
  btnName: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ btnName, onClick }) => {
  return <button onClick={onClick}>{btnName}</button>;
};

export default Button;
