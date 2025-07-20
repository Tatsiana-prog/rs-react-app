import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

describe('ErrorBoundary component', () => {
  it('should render children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Test Child Component</div>
      </ErrorBoundary>
    );

    expect(getByText('Test Child Component')).toBeInTheDocument();
  });

  it('should render error message when there is an error', () => {
    const ErrorComponent = () => {
      throw new Error('Test error');
    };

    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(getByText('Something went wrong.')).toBeInTheDocument();
  });
});
