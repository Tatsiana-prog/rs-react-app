import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonDetailsQuery } from '../apiSlice';
import { toggleItem } from '../itemsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../apiSlice', () => ({
  useGetPokemonDetailsQuery: jest.fn(),
}));

jest.mock('../itemsSlice', () => ({
  toggleItem: jest.fn(),
}));

describe('Card component', () => {
  const mockDispatch = jest.fn();

  const mockedUseDispatch = useDispatch as unknown as jest.Mock;
  const mockedUseSelector = useSelector as unknown as jest.Mock;
  const mockedUseGetPokemonDetailsQuery =
    useGetPokemonDetailsQuery as jest.Mock;
  const mockedToggleItem = toggleItem as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseDispatch.mockReturnValue(mockDispatch);
    mockedUseSelector.mockReturnValue([]);
  });

  it('renders name and description when data is loaded', () => {
    mockedUseGetPokemonDetailsQuery.mockReturnValue({
      data: {
        types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
      },
      isLoading: false,
      isError: false,
    });

    render(<Card name="charizard" description="" />);

    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('fire, flying')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('shows loading state', () => {
    mockedUseGetPokemonDetailsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<Card name="pikachu" description="" />);

    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('shows error state', () => {
    mockedUseGetPokemonDetailsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(<Card name="bulbasaur" description="" />);

    expect(screen.getByText('Ошибка загрузки данных')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('checkbox is checked if item is selected', () => {
    mockedUseSelector.mockReturnValue([
      { name: 'pikachu', description: 'electric' },
    ]);

    mockedUseGetPokemonDetailsQuery.mockReturnValue({
      data: {
        types: [{ type: { name: 'electric' } }],
      },
      isLoading: false,
      isError: false,
    });

    render(<Card name="pikachu" description="" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('dispatches toggleItem when checkbox is clicked', () => {
    mockedUseGetPokemonDetailsQuery.mockReturnValue({
      data: {
        types: [{ type: { name: 'water' } }],
      },
      isLoading: false,
      isError: false,
    });

    render(<Card name="squirtle" description="" />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockedToggleItem).toHaveBeenCalledWith({
      name: 'squirtle',
      description: 'water',
    });

    expect(mockDispatch).toHaveBeenCalled();
  });
});
