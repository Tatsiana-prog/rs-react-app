import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import About from './components/Pages/About/About';
import Home from './components/Pages/Home/Home';
import NotFound from './components/Pages/404/404';
import Results from './components/Results/Results';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import UseLocalStorage from './hooks/UseLocalStorage';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = UseLocalStorage('searchTerm', '');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Router basename="/rs-react-app">
      <ErrorBoundary>
        <Routes>
          <Route
            path="/"
            element={<Home searchTerm={searchTerm} onSearch={handleSearch} />}
          >
            <Route
              index
              element={
                <Results
                  searchTerm={searchTerm}
                  onComplete={() => {}}
                  showError={true}
                />
              }
            />
            <Route
              path="results"
              element={
                <Results
                  searchTerm={searchTerm}
                  onComplete={() => {}}
                  showError={true}
                />
              }
            >
              <Route path="details/:name" element={<PokemonDetails />} />
            </Route>
          </Route>

          <Route path="/about" element={<About />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
