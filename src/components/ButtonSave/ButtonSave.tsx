import React from 'react';

interface ButtonSaveProps {
  onClick?: () => void;
}

const Button: React.FC<ButtonSaveProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'none',
        padding: '0',
        border: 'none',
        cursor: 'pointer',
        marginRight: '0',
        marginLeft: 'auto',
      }}
    >
      <img
        src="rs-react-app/img/icon-save.png"  // Путь к изображению
        alt="icon-save"
      />
    </button>
  );
};

export default Button;