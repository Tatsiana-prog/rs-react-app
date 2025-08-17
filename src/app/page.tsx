'use client';
import '../App.css';
import Image from 'next/image';
import { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import Header from '../components/Header/Header';
import Results from '../components/Results/Results';
import '../components/Header/Header.css';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term: string) => {
    console.log('Поиск:', term);
    setSearchTerm(term);
  };

  return (
    <div className="wrapper">
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
        }}
      >
        <Image
          src="/img/pokimg.png"
          alt="Pokémon"
          width={250}
          height={200}
          style={{ objectFit: 'contain' }}
        />
        <h1>Все данные о Pokémon в одном месте</h1>
        <SearchBar defaultTerm={searchTerm} onSearch={handleSearch} />
        <Results searchTerm={searchTerm} />
      </div>
    </div>
  );
}
