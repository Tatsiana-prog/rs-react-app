import React from 'react';
import { useTheme } from '../../ThemeContext';
import './ThemeToggleButton.css';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <img
        src={
          theme === 'light'
            ? 'rs-react-app/img/sun.png'
            : 'rs-react-app/img/moon.png'
        }
        alt={theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
        className="theme-icon"
      />
    </button>
  );
};

export default ThemeToggleButton;
