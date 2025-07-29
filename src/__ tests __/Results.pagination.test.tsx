import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Results from '../components/Results/Results';

type CardProps = {
  name: string;
  description: string;
};

jest.mock('../components/Card/Card', () => {
  const MockCard = ({ name, description }: CardProps) => (
    <div data-testid="card">
      <div>{name}</div>
      <div>{description}</div>
    </div>
  );
  MockCard.displayName = 'MockCard';
  return MockCard;
});

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockListResponse = {
  count: 36,
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ],
};

const mockBulbasaur = {
  name: 'bulbasaur',
  types: [{ type: { name: 'grass' } }],
};

const mockCharmander = {
  name: 'charmander',
  types: [{ type: { name: 'fire' } }],
};

beforeEach(() => {
  mockNavigate.mockClear();
  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockListResponse,
    })
    .mockResolvedValueOnce({
      json: async () => mockBulbasaur,
    })
    .mockResolvedValueOnce({
      json: async () => mockCharmander,
    });
});

describe('Pagination behavior', () => {
  it('disables Prev button on first page and Next button on last page', async () => {
    render(
      <MemoryRouter initialEntries={['/results?page=1']}>
        <Routes>
          <Route
            path="/results"
            element={
              <Results searchTerm="" onComplete={jest.fn()} showError={false} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/results',
      search: 'page=2',
    });
  });

  it('disables Next button on last page', async () => {
    render(
      <MemoryRouter initialEntries={['/results?page=2']}>
        <Routes>
          <Route
            path="/results"
            element={
              <Results searchTerm="" onComplete={jest.fn()} showError={false} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Page 2 of 2')).toBeInTheDocument();
    });

    const prevButton = screen.getByRole('button', { name: /prev/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).not.toBeDisabled();
    expect(nextButton).toBeDisabled();

    fireEvent.click(prevButton);
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/results',
      search: 'page=1',
    });
  });

  it('navigates to /404 on invalid page', async () => {
    render(
      <MemoryRouter initialEntries={['/results?page=0']}>
        <Routes>
          <Route
            path="/results"
            element={
              <Results searchTerm="" onComplete={jest.fn()} showError={false} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/404');
    });
  });
});
