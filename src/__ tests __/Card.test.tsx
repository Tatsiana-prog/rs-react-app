import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../components/Card/Card';

describe('Card component', () => {
  test('renders name and description correctly', () => {
    const testName = 'Test Card';
    const testDescription = 'This is a test description.';

    render(<Card name={testName} description={testDescription} />);

    expect(screen.getByText(testName)).toBeInTheDocument();
    expect(screen.getByText(testDescription)).toBeInTheDocument();

    expect(screen.getByText(testName).tagName).toBe('H2');
    expect(screen.getByText(testDescription).tagName).toBe('P');
  });
});
