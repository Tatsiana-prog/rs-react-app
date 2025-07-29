import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/Pages/404/404';

describe('NotFound component', () => {
  it('renders the 404 page message', () => {
    render(<NotFound />);
    expect(
      screen.getByRole('heading', { level: 1, name: /404 - Page Not Found/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, the page you are looking for does not exist/i)
    ).toBeInTheDocument();
  });
});
