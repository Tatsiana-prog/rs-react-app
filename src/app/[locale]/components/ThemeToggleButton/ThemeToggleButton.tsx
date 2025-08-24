import React from 'react';
import Image from 'next/image';
import { useTheme } from '../../../../ThemeContext';
import './ThemeToggleButton.css';

const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Image
        src={theme === 'light' ? '/img/sun.png' : '/img/moon.png'}
        alt={theme === 'light' ? 'Светлая тема' : 'Тёмная тема'}
        className="theme-icon"
        width={32}
        height={32}
      />
    </button>
  );
};

export default ThemeToggleButton;
