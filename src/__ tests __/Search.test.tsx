import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Search from '../components/Search/Search';

test('renders Search component with correct placeholder', () => {
  const mockOnChange = jest.fn();
  const { getByPlaceholderText } = render(
    <Search value="" onChange={mockOnChange} />
  );

  const inputElement = getByPlaceholderText('Search by name');
  expect(inputElement).toBeInTheDocument();
});

test('calls onChange handler with input value when input changes', () => {
  const mockOnChange = jest.fn();
  const { getByPlaceholderText } = render(
    <Search value="" onChange={mockOnChange} />
  );

  const inputElement = getByPlaceholderText('Search by name');
  fireEvent.change(inputElement, { target: { value: 'Test' } });

  expect(mockOnChange).toHaveBeenCalledWith('Test');
});
