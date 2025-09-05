'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Button from '../Button/Button';
import Search from '../Search/Search';

interface SearchBarProps {
  defaultTerm: string;
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultTerm, onSearch }) => {
  const homeT = useTranslations('HomePage');
  const [input, setInput] = useState<string>(defaultTerm);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSearchClick = () => {
    onSearch(input);
  };

  return (
    <div
      style={{
        margin: '10px auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Search value={input} onChange={handleInputChange} />
      <Button btnName={homeT('search-button')} onClick={handleSearchClick} />
    </div>
  );
};

export default SearchBar;
