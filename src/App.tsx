import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import SearchBar from './components/SearchBar';
import Results from './components/Results';

interface AppState {
  searchTerm: string;
  forceError: boolean;
}

class App extends React.Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      forceError: false,
    };
  }

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term });
  };

  throwError = () => {
    console.log('Generating an error...');
    this.setState({ forceError: true });
  };

  render() {
    const { forceError, searchTerm } = this.state;

    return (
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
            <SearchBar
              defaultTerm={searchTerm}
              onSearch={this.handleSearch}
            />
          </div>
          <Results
            searchTerm={searchTerm}
            onComplete={() => {}}
            showError={forceError}
          />
          <button
            onClick={this.throwError}
            style={{
              marginTop: '10px',
              cursor: 'pointer',
              alignSelf: 'flex-end',
            }}
          >
            Error Button
          </button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;