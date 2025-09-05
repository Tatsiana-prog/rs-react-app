import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../app/[locale]/components/Search/Search';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      placeholder: 'Поиск...',
    };
    return translations[key] || key;
  },
}));

describe('Search component', () => {
  it('renders input with correct placeholder and value', () => {
    render(<Search value="React" onChange={() => {}} />);
    const input = screen.getByRole('searchbox');

    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Поиск...');
    expect(input).toHaveValue('React');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(<Search value="" onChange={handleChange} />);
    const input = screen.getByRole('searchbox');

    fireEvent.change(input, { target: { value: 'Next.js' } });
    expect(handleChange).toHaveBeenCalledWith('Next.js');
  });
});
