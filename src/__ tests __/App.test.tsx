import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  (console.error as jest.Mock).mockRestore();
  localStorage.clear();
});

describe('App', () => {
  it('рендерит основные элементы интерфейса', () => {
    render(<App />);

    expect(screen.getByAltText(/pokémon/i)).toBeInTheDocument();
    expect(screen.getByText(/все данные о pokémon/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /button error/i })
    ).toBeInTheDocument();
  });

  it('перехватывает ошибку ButtonError через ErrorBoundary', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /button error/i });
    fireEvent.click(button);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });
});
