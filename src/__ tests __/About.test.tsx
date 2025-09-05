import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import AboutPage from '../app/[locale]/about/page';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: 'Обо мне',
      name: 'Татьяна Высоцкая',
      role: 'Frontend разработчик',
      courseIntro: 'Я обучаюсь на курсе',
      courseName: 'RS School React Course',
    };
    return translations[key] || key;
  },
}));

jest.mock('../app/[locale]/components/Header/Header.tsx', () => {
  const MockHeader = () => <div data-testid="header">Header</div>;
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});

describe('AboutPage', () => {
  it('renders translated content correctly', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Обо мне'
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Татьяна Высоцкая'
    );
    expect(screen.getByText('Frontend разработчик')).toBeInTheDocument();
    expect(screen.getByText('Я обучаюсь на курсе')).toBeInTheDocument();
    expect(screen.getByText('RS School React Course')).toBeInTheDocument();
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('renders link with correct attributes', () => {
    render(<AboutPage />);
    const link = screen.getByRole('link', { name: 'RS School React Course' });

    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
