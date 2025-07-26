import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Ошибка в дочернем компоненте');
};

describe('ErrorBoundary', () => {
  it('рендерит дочерние элементы без ошибок', () => {
    render(
      <ErrorBoundary>
        <div>Всё хорошо</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Всё хорошо')).toBeInTheDocument();
  });

  it('отображает fallback при ошибке в дочернем компоненте', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    (console.error as jest.Mock).mockRestore();
  });
});
