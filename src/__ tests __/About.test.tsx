import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import About from '../app/about/page';

const MockedHeader = () => <div data-testid="header">Mocked Header</div>;
MockedHeader.displayName = 'MockedHeader';

jest.mock('../components/Header/Header.tsx', () => ({
  __esModule: true,
  default: () => <MockedHeader />,
}));

describe('About page', () => {
  it('renders the about page content', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { level: 1, name: /about me/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Tatsiana Vysotskaya')).toBeInTheDocument();
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();

    const link = screen.getByText(/RS School React Course/i);
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(link.closest('a')).toHaveAttribute('target', '_blank');
    expect(link.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
