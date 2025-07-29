import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Results from '../components/Results/Results';

type MockCardProps = {
  name: string;
  description: string;
};

jest.mock('../components/Card/Card', () => {
  const MockCard = ({ name, description }: MockCardProps) => (
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
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
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

describe('Results component', () => {
  it('renders list correctly', async () => {
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
      expect(screen.getAllByTestId('card')).toHaveLength(2);
      expect(screen.getByText('Page 1 of 2')).toBeInTheDocument();
    });
  });

  it('disables Next button on last page and enables Prev button', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          count: 36,
          results: [
            { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
          ],
        }),
      })
      .mockResolvedValueOnce({
        json: async () => ({
          name: 'venusaur',
          types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
        }),
      });

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

  it('navigates to /404 on invalid page param', async () => {
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

  it('handles fetch failure and redirects to /404', async () => {
    (global.fetch as jest.Mock) = jest
      .fn()
      .mockRejectedValue(new Error('Fail'));

    render(
      <MemoryRouter initialEntries={['/results?page=1']}>
        <Routes>
          <Route
            path="/results"
            element={
              <Results searchTerm="" onComplete={jest.fn()} showError={true} />
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
