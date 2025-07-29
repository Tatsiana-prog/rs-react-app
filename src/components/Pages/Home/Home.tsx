import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchBar from '../../SearchBar/SearchBar';
import Header from '../../Header/Header';

const Home: React.FC<{
  searchTerm: string;
  onSearch: (term: string) => void;
}> = ({ searchTerm, onSearch }) => {
  return (
    <div
      style={{
        background: 'orange',
        minHeight: '100vh',
        paddingBottom: '50px',
      }}
    >
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <img
          src="img/pokimg.png"
          alt="Pokémon"
          style={{ width: '250px', height: '200px', objectFit: 'contain' }}
        />
        <p
          style={{
            fontSize: 22,
            textAlign: 'center',
            margin: '10px 0',
          }}
        >
          Все данные о Pokémon в одном месте
        </p>
        <SearchBar defaultTerm={searchTerm} onSearch={onSearch} />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
