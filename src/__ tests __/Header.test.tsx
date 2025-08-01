import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header/Header';

jest.mock('../components/Header/components/Navigation/Navigation.tsx', () => {
  const MockNavigation = () => <nav data-testid="navigation">Navigation</nav>;
  MockNavigation.displayName = 'MockNavigation';
  return MockNavigation;
});

jest.mock('../components/ThemeToggleButton/ThemeToggleButton.tsx', () => {
  const MockThemeToggleButton = () => (
    <button data-testid="theme-toggle">Toggle Theme</button>
  );
  MockThemeToggleButton.displayName = 'MockThemeToggleButton';
  return MockThemeToggleButton;
});

describe('Header', () => {
  it('renders logo with link to home', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const logoLink = screen.getByRole('link', { name: /PokemonApp/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('renders Navigation component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByTestId('navigation')).toBeInTheDocument();
  });

  it('renders ThemeToggleButton component', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('has correct structure and classes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('header');

    const logoText = screen.getByText('PokemonApp');
    expect(logoText.parentElement).toHaveClass('logo');

    const navigation = screen.getByTestId('navigation');
    expect(navigation.parentElement).toHaveClass('header-box');
  });
});
