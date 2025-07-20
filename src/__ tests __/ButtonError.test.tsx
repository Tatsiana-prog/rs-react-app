import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import ButtonError from '../components/ButtonError/ButtonError';

describe('ButtonError component', () => {
  it('should render button with provided text', () => {
    const buttonText = 'Click me';
    const { getByText } = render(<ButtonError buttonText={buttonText} />);

    expect(getByText(buttonText)).toBeInTheDocument();
  });

  it('should display error message when button is clicked', () => {
    const { getByText } = render(<ButtonError buttonText="Click me" />);
    const button = getByText('Click me');

    fireEvent.click(button);

    expect(getByText('Ошибка внутри setState!')).toBeInTheDocument();
  });
});
