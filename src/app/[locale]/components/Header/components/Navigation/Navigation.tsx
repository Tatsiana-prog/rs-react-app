'use client';
import { usePathname } from 'next/navigation';
import './Navigation.css';
import { useTranslations } from 'next-intl';
import LanguageCustom from '../../../../components/languages/LanguageCustom.tsx';
import { Link } from '../../../../../../i18n/navigation';

function Navigation() {
  const homeT = useTranslations('Navigation');
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navigation">
      <LanguageCustom />
      <Link href="/" className={isActive('/') ? 'active' : ''}>
        {homeT('home')}
      </Link>
      <Link href="/about" className={isActive('/about') ? 'active' : ''}>
        {homeT('about')}
      </Link>
    </nav>
  );
}

export default Navigation;
