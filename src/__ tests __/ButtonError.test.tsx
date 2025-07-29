import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonError from '../components/ButtonError/ButtonError';

class TestErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Ошибка поймана ErrorBoundary</div>;
    }

    return this.props.children;
  }
}

describe('ButtonError', () => {
  it('рендерит кнопку', () => {
    render(
      <TestErrorBoundary>
        <ButtonError />
      </TestErrorBoundary>
    );

    expect(
      screen.getByRole('button', { name: /button error/i })
    ).toBeInTheDocument();
  });

  it('выбрасывает ошибку при клике и она ловится ErrorBoundary', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <TestErrorBoundary>
        <ButtonError />
      </TestErrorBoundary>
    );

    const button = screen.getByRole('button', { name: /button error/i });
    fireEvent.click(button);

    expect(
      screen.getByText(/ошибка поймана errorboundary/i)
    ).toBeInTheDocument();

    (console.error as jest.Mock).mockRestore();
  });
});

export default TestErrorBoundary;
