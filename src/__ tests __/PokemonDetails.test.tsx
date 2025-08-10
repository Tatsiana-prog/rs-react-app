import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonDetails from '../components/PokemonDetails/PokemonDetails';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonDetailsQuery } from '../apiSlice';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('../apiSlice', () => ({
  useGetPokemonDetailsQuery: jest.fn(),
}));

const mockUseParams = useParams as jest.Mock;
const mockUseNavigate = useNavigate as jest.Mock;
const mockUseGetPokemonDetailsQuery = useGetPokemonDetailsQuery as jest.Mock;

describe('PokemonDetails component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders "No Pokémon name provided" if name is missing', () => {
    mockUseParams.mockReturnValue({ name: undefined });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
    });

    render(<PokemonDetails />);
    expect(screen.getByText('No Pokémon name provided')).toBeInTheDocument();
  });

  it('renders loading state when loading', () => {
    mockUseParams.mockReturnValue({ name: 'pikachu' });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(<PokemonDetails />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state when error occurs', () => {
    mockUseParams.mockReturnValue({ name: 'pikachu' });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: null,
      error: new Error('Fetch error'),
      isLoading: false,
    });

    render(<PokemonDetails />);
    expect(
      screen.getByText('Error fetching Pokémon data.')
    ).toBeInTheDocument();
  });

  it('renders pokemon name and types', () => {
    mockUseParams.mockReturnValue({ name: 'pikachu' });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: {
        types: [{ type: { name: 'electric' } }, { type: { name: 'cute' } }],
      },
      error: null,
      isLoading: false,
    });

    render(<PokemonDetails />);
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('electric, cute')).toBeInTheDocument();
  });

  it('calls navigate(-1) when "Close" button is clicked', () => {
    const navigateMock = jest.fn();
    mockUseNavigate.mockReturnValue(navigateMock);
    mockUseParams.mockReturnValue({ name: 'bulbasaur' });
    mockUseGetPokemonDetailsQuery.mockReturnValue({
      data: {
        types: [{ type: { name: 'grass' } }],
      },
      error: null,
      isLoading: false,
    });

    render(<PokemonDetails />);
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    expect(navigateMock).toHaveBeenCalledWith(-1);
  });
});
