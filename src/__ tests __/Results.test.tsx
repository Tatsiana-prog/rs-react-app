import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Results from '../components/Results/Results';
import itemsReducer from '../itemsSlice';

const mockNavigate = jest.fn();
const mockLocation = {
  pathname: '/results',
  search: '?page=1',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  Outlet: () => <div data-testid="outlet" />,
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('Results component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
  });

  it('renders loading state and fetches data', async () => {
    const store = configureStore({
      reducer: {
        items: itemsReducer,
      },
      preloadedState: {
        items: {
          selectedItems: [],
        },
      },
    });

    const mockListResponse = {
      count: 1,
      results: [
        {
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25/',
        },
      ],
    };

    const mockDetailResponse = {
      name: 'pikachu',
      types: [{ type: { name: 'electric' } }],
    };

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockListResponse,
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockDetailResponse,
      } as Response);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Results searchTerm="pika" onComplete={jest.fn()} showError={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      expect(screen.getByText(/electric/i)).toBeInTheDocument();
    });
  });
});
