import React from 'react';
import './Button.css';

interface ButtonProps {
  btnName: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ btnName, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {btnName}
    </button>
  );
};

export default Button;
