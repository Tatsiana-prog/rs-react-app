import React from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';

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
    this.setState({ forceError: true });
  };

  render() {
    if (this.state.forceError) {
      throw new Error('Test error thrown!');
    }

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
              src="/img/pokimg.png"
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
              defaultTerm={this.state.searchTerm}
              onSearch={this.handleSearch}
            />
          </div>
          <Results searchTerm={this.state.searchTerm} onComplete={() => {}} />
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
