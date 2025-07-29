import React from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(event.target.value);
  };

  return (
    <input
      type="search"
      value={value}
      onChange={handleChange}
      placeholder="Search by name"
    />
  );
};

export default Search;
