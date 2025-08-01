import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Results from '../components/Results/Results';
import itemsReducer from '../itemsSlice';

const mockNavigate = jest.fn();
const mockLocation = {
  pathname: '/results',
  search: '?page=2',
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

describe('📄 Results pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSelector as unknown as jest.Mock).mockReturnValue([]);
  });

  it('renders pagination and handles page change', async () => {
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
      count: 36,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    };

    const mockDetailResponse = {
      name: 'bulbasaur',
      types: [{ type: { name: 'grass' } }],
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
          <Results searchTerm="" onComplete={jest.fn()} showError={false} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Page 2 of 2/i)).toBeInTheDocument();
    });

    const prevButton = screen.getByRole('button', { name: /« Prev/i });
    expect(prevButton).not.toBeDisabled();
    fireEvent.click(prevButton);
    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/results',
      search: 'page=1',
    });
    const nextButton = screen.getByRole('button', { name: /Next »/i });
    expect(nextButton).toBeDisabled();
  });
});
