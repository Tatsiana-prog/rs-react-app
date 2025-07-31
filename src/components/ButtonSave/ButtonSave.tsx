import React from 'react';
import IconSave from '../../../public/img/icon-save.png';

interface ButtonSaveProps {
 onClick?: () => void;
}

const Button: React.FC<ButtonSaveProps> = ({ onClick }) => {
  return <button onClick={onClick}
   style={{
      background: 'none',      
      padding: '0',
      border: 'none',
      cursor:'pointer',
    marginRight: '0',
marginLeft: 'auto'}}><img src={IconSave} alt="icon-save"/></button>;
};

export default Button;
