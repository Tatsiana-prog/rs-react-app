import React from 'react';
import SearchBar from '../../SearchBar/SearchBar';
import Results from '../../Results/Results';
import Header from '../../Header/Header';

const Home: React.FC<{
  searchTerm: string;
  onSearch: (term: string) => void;
}> = ({ searchTerm, onSearch }) => {
  return (
    <div style={{ background: 'orange', height: '100%' }}>
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
            fontSize: '22px',
            textAlign: 'center',
            margin: '10px 0',
          }}
        >
          Все данные о Pokémon в одном месте
        </p>
        <SearchBar defaultTerm={searchTerm} onSearch={onSearch} />
      </div>
      <Results
        searchTerm={searchTerm}
        onComplete={() => {}}
        showError={false}
      />
    </div>
  );
};

export default Home;
