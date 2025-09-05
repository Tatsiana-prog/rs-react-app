'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  const homeT = useTranslations('HomePage');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      style={{ borderRadius: '8px', border: 'none', padding: '15px' }}
      type="search"
      value={value}
      onChange={handleChange}
      placeholder={homeT('placeholder')}
    />
  );
};

export default Search;
