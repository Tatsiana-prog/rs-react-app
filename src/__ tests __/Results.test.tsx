import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Results from '../components/Results/Results';

describe('Results component', () => {
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  const mockListResponse = {
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
    next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=18',
    previous: null,
  };

  const mockPokemonDetails = (name: string, types: string[]) => ({
    name,
    types: types.map((typeName) => ({ type: { name: typeName } })),
  });

  test('fetches and displays a list of pokemons with pagination', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockListResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetails('bulbasaur', ['grass', 'poison']),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonDetails('ivysaur', ['grass', 'poison']),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [],
          next: null,
          previous: 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=18',
        }),
      });

    render(
      <Results searchTerm="" onComplete={mockOnComplete} showError={false} />
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
    });

    const descriptions = screen.getAllByText('grass, poison');
    expect(descriptions.length).toBeGreaterThanOrEqual(2);

    expect(screen.getByText('« Prev')).toBeDisabled();
    expect(screen.getByText('Next »')).toBeEnabled();

    fireEvent.click(screen.getByText('Next »'));

    await waitFor(() => {
      expect(screen.getByText('No results found.')).toBeInTheDocument();
    });

    expect(screen.getByText('« Prev')).toBeEnabled();
    expect(mockOnComplete).toHaveBeenCalledTimes(2);
  });

  test('fetches and displays a single pokemon by searchTerm', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonDetails('pikachu', ['electric']),
    });

    render(
      <Results
        searchTerm="pikachu"
        onComplete={mockOnComplete}
        showError={false}
      />
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('electric')).toBeInTheDocument();
    });

    expect(mockOnComplete).toHaveBeenCalled();
  });

  test('shows error message and calls onComplete on fetch failure', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    render(
      <Results
        searchTerm="unknown"
        onComplete={mockOnComplete}
        showError={false}
      />
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Error: HTTP error: 500/i)).toBeInTheDocument();
    });

    expect(mockOnComplete).toHaveBeenCalled();
  });

  test('shows generic error message when showError is true', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [] }),
    });

    render(
      <Results searchTerm="" onComplete={mockOnComplete} showError={true} />
    );

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong./i)).toBeInTheDocument();
    });
  });
});
