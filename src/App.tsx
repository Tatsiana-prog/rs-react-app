import React from 'react';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import ErrorBoundary from './components/ErrorBoundary';

interface AppState {
  searchTerm: string;
  forceError: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
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
          <SearchBar
            defaultTerm={this.state.searchTerm}
            onSearch={this.handleSearch}
          />
          <button onClick={this.throwError} style={{ marginTop: '10px' }}>
            Throw Error
          </button>
          <Results searchTerm={this.state.searchTerm} onComplete={() => {}} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
