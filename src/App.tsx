import React, { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBar from './components/SearchBar/SearchBar';
import Results from './components/Results/Results';
import ButtonError from './components/ButtonError/ButtonError';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );
  const [forceError, setForceError] = useState<boolean>(false);

  const handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    setSearchTerm(term);
  };

  const throwError = () => {
    console.log('Generating an error...');
    setForceError(true);
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
            showError={forceError}
          />
          <ButtonError buttonText="Error Button" onClick={throwError} />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
