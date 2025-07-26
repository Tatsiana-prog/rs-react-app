import React, { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import Results from './components/Results/Results';
import ButtonError from './components/ButtonError/ButtonError';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );

  const handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    setSearchTerm(term);
  };

  return (
    <div>
      <ErrorBoundary>
        <div style={{ padding: '20px', background: 'orange', height: '100%' }}>
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
              style={{
                width: '250px',
                height: '200px',
                objectFit: 'contain',
              }}
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
            <SearchBar defaultTerm={searchTerm} onSearch={handleSearch} />
          </div>
          <Results
            searchTerm={searchTerm}
            onComplete={() => {}}
            showError={false} // Update this if you're not using forceError
          />
          <ButtonError />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
