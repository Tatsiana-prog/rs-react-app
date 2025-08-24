import React from 'react';
import Link from 'next/link';
import Navigation from '../../components/Header/components/Navigation/Navigation';
import './Header.css';
import ThemeToggleButton from '../ThemeToggleButton/ThemeToggleButton';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link href="/">PokemonApp</Link>
      </div>
      <div className="header-box">
        <Navigation />
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
