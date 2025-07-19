import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Button from '../components/Button/Button';

test('renders button with correct text', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<Button btnName="Search" onClick={onClickMock} />);
  
  const buttonElement = getByText('Search');
  expect(buttonElement).toBeInTheDocument();
});

test('calls onClick handler when button is clicked', () => {
  const onClickMock = jest.fn();
  const { getByText } = render(<Button btnName="Search" onClick={onClickMock} />);
  
  const buttonElement = getByText('Search');
  fireEvent.click(buttonElement);
  
  expect(onClickMock).toHaveBeenCalledTimes(1);
});