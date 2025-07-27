// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <span>PokemonApp</span>
        </Link>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
