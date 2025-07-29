import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetails from '../components/PokemonDetails/PokemonDetails';
import type { NavigateFunction } from 'react-router-dom';

const mockNavigate = jest.fn() as jest.MockedFunction<NavigateFunction>;
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PokemonDetails component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    mockNavigate.mockClear();
  });

  it('отображает сообщение, если имя не указано в URL', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/no pokémon name provided/i)).toBeInTheDocument();
  });

  it('загружает и отображает типы покемона', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      }),
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/bulbasaur']}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/grass, poison/i)).toBeInTheDocument();
    });
  });

  it('переходит на /404 при ошибке загрузки', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API error'));

    render(
      <MemoryRouter initialEntries={['/pokemon/missingno']}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/404');
    });
  });

  it('вызывает navigate(-1) при клике на кнопку Close', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({
        types: [{ type: { name: 'fire' } }],
      }),
    });

    render(
      <MemoryRouter initialEntries={['/pokemon/charmander']}>
        <Routes>
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/fire/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
