import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

const MockedNavigation = () => (
  <nav data-testid="mocked-navigation">Mocked Navigation</nav>
);
MockedNavigation.displayName = 'MockedNavigation';

jest.mock('../components/Header/components/Navigation/Navigation.tsx', () => ({
  __esModule: true,
  default: () => <MockedNavigation />,
}));

describe('Header component', () => {
  it('renders logo and navigation', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoText = screen.getByText(/PokemonApp/i);
    expect(logoText).toBeInTheDocument();

    const logoLink = logoText.closest('a');
    expect(logoLink).toHaveAttribute('href', '/');

    expect(screen.getByTestId('mocked-navigation')).toBeInTheDocument();
  });
});
