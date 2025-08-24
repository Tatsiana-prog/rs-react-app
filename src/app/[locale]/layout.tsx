import { ReduxProvider } from '../../providers/provider';
import { ThemeProvider } from '../../ThemeContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { NextIntlClientProvider } from 'next-intl';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PokeWTF',
  icons: [
    { rel: 'icon', url: '/favicon.png', type: 'image/png', sizes: '32x32' },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  return (
    <NextIntlClientProvider locale={locale}>
      <ReduxProvider>
        <ErrorBoundary>
          <ThemeProvider>
            <main>{children}</main>
          </ThemeProvider>
        </ErrorBoundary>
      </ReduxProvider>
    </NextIntlClientProvider>
  );
}
