import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('renders App component without errors', () => {
    render(<App />);
  });

  it('handles search term input and search functionality', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    const searchInput = getByPlaceholderText('Search by name');
    fireEvent.change(searchInput, { target: { value: 'Pikachu' } });

    const searchButton = getByText('Search');
    fireEvent.click(searchButton);

    expect(searchInput).toHaveValue('Pikachu');
  });

  it('triggers error in Results component when ButtonError is clicked', () => {
    const { getByText } = render(<App />);

    const errorButton = getByText('Error Button');
    fireEvent.click(errorButton);

    const errorText = getByText('Ошибка внутри setState!');
    expect(errorText).toBeInTheDocument();
  });
});