import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Results from '../components/Results/Results';

global.fetch = jest.fn();
const mockedFetch = fetch as jest.Mock;

describe('Results Component', () => {
  const mockPokemonList = {
    count: 1,
    results: [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/pikachu' },
    ],
  };

  const mockPokemonDetails = {
    name: 'pikachu',
    types: [{ type: { name: 'electric' } }],
  };

  const setup = (searchTerm = '', showError = false) => {
    const handleComplete = jest.fn();

    render(
      <MemoryRouter initialEntries={['/results?page=1']}>
        <Routes>
          <Route
            path="/results"
            element={
              <Results
                searchTerm={searchTerm}
                onComplete={handleComplete}
                showError={showError}
              />
            }
          />
          <Route path="/404" element={<div>404 Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    return { handleComplete };
  };

  beforeEach(() => {
    mockedFetch.mockReset();
  });

  it('renders filtered Pokémon based on searchTerm and calls onComplete', async () => {
    mockedFetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonList,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetails,
      });

    const { handleComplete } = setup('pika');

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('electric')).toBeInTheDocument();
    });

    expect(handleComplete).toHaveBeenCalled();
  });

  it('shows error and navigates to 404 when fetch fails and showError is true', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('Fetch failed'));

    setup('', true);

    await waitFor(() => {
      expect(screen.getByText(/404 Page/i)).toBeInTheDocument();
    });
  });

  it('logs error to console when fetch fails and showError is true', async () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    mockedFetch.mockRejectedValueOnce(new Error('Fetch failed'));

    setup('', true);

    await waitFor(() => {
      expect(screen.getByText(/404 Page/i)).toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching Pokémon list:',
      expect.any(Error)
    );

    consoleSpy.mockRestore();
  });
});
