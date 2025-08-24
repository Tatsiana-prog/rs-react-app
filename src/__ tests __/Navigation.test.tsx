import { render, screen, fireEvent } from '@testing-library/react';
import Navigation from '../app/[locale]/components/Header/components/Navigation/Navigation';
import '@testing-library/jest-dom';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

const toggleThemeMock = jest.fn();
jest.mock('../ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: toggleThemeMock,
  }),
}));

jest.mock('../app/[locale]/components/languages/LanguageCustom.tsx', () => {
  const MockLanguageSelector = () => (
    <div data-testid="language-custom">Language Selector</div>
  );
  MockLanguageSelector.displayName = 'MockLanguageSelector';
  return MockLanguageSelector;
});

jest.mock('../i18n/navigation', () => ({
  Link: ({
    href,
    children,
    className,
  }: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      home: 'Главная',
      about: 'Обо мне ',
    };
    return translations[key] || key;
  },
}));

describe('Navigation', () => {
  it('renders navigation links with correct translations and active class', () => {
    render(<Navigation />);

    expect(screen.getByText('Главная')).toHaveClass('active');
    expect(screen.getByText('Обо мне')).not.toHaveClass('active');
    expect(screen.getByTestId('language-custom')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('🌓');
  });

  it('calls toggleTheme when theme button is clicked', () => {
    render(<Navigation />);
    fireEvent.click(screen.getByRole('button'));
    expect(toggleThemeMock).toHaveBeenCalled();
  });
});
