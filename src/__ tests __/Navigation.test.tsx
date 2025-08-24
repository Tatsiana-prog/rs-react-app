import { render, screen } from '@testing-library/react';
import Navigation from '../app/[locale]/components/Header/components/Navigation/Navigation';
import '@testing-library/jest-dom';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

jest.mock('../app/[locale]/components/languages/LanguageCustom.tsx', () => {
  const MockLanguageSelector = () => (
    <div data-testid="language-custom">Language Selector</div>
  );
  MockLanguageSelector.displayName = 'MockLanguageSelector';
  return MockLanguageSelector;
});

jest.mock('../i18n/navigation.ts', () => ({
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
      about: 'Обо мне',
    };
    return translations[key] || key;
  },
}));

describe('Navigation', () => {
  it('renders translated navigation links and highlights active route', () => {
    render(<Navigation />);

    const homeLink = screen.getByText('Главная');
    const aboutLink = screen.getByText('Обо мне');

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveClass('active');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).not.toHaveClass('active');

    expect(screen.getByTestId('language-custom')).toBeInTheDocument();
  });
});
