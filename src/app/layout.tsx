import '../index.css';
import { ReduxProvider } from '../store/provider';
import { ThemeProvider } from '../ThemeContext';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router } from 'react-router-dom';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <Router>
              <ErrorBoundary>{children}</ErrorBoundary>
            </Router>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
