import React from 'react';
import { Outlet } from 'react-router-dom';
import './Home.css';
import SearchBar from '../../SearchBar/SearchBar';
import Header from '../../Header/Header';

const Home: React.FC<{
  searchTerm: string;
  onSearch: (term: string) => void;
}> = ({ searchTerm, onSearch }) => {
  return (
    <div className="wrapper">
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
          src="rs-react-app/img/pokimg.png"
          alt="Pokémon"
          style={{ width: '250px', height: '200px', objectFit: 'contain' }}
        />
        <h1
          style={{
            fontSize: 22,
            textAlign: 'center',
            margin: '10px 0',
          }}
        >
          Все данные о Pokémon в одном месте
        </h1>
        <SearchBar defaultTerm={searchTerm} onSearch={onSearch} />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
