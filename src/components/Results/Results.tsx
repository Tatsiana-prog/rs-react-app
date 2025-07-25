import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';

interface ResultsProps {
  searchTerm: string;
  onComplete: () => void;
  showError: boolean;
}

interface PokemonListEntry {
  name: string;
  url: string;
}

interface PokemonListResponse {
  results: PokemonListEntry[];
  next: string | null;
  previous: string | null;
}

interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonDetails {
  name: string;
  types: PokemonType[];
}

const Results: React.FC<ResultsProps> = ({
  searchTerm,
  onComplete,
  showError,
}) => {
  const pageSize = 18;

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<{ name: string; description: string }[]>(
    []
  );
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchPage(getUrl());
  }, [searchTerm]);

  const getUrl = (url?: string): string => {
    if (url) return url;
    return searchTerm
      ? `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(searchTerm.toLowerCase())}`
      : `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=0`;
  };

  const fetchPage = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const data = await response.json();

      if ('results' in data) {
        const list = data as PokemonListResponse;
        const fetchedItems = await Promise.all(
          list.results.map(async (entry: PokemonListEntry) => {
            const res = await fetch(entry.url);
            if (!res.ok) throw new Error(`Failed to fetch ${entry.name}`);
            const details: PokemonDetails = await res.json();
            return {
              name: details.name,
              description:
                details.types.map((t) => t.type.name).join(', ') || 'No types',
            };
          })
        );
        setItems(fetchedItems);
        setNextUrl(list.next);
        setPrevUrl(list.previous);
      } else {
        const details: PokemonDetails = data;
        setItems([
          {
            name: details.name,
            description:
              details.types.map((t) => t.type.name).join(', ') || 'No types',
          },
        ]);
        setNextUrl(null);
        setPrevUrl(null);
      }
    } catch (error) {
      console.error(error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
      if (typeof onComplete === 'function') onComplete();
    }
  };

  if (loading) return <div>Loading...</div>;
  if (showError)
    return (
      <h1 style={{ color: 'red', textAlign: 'center' }}>
        Something went wrong.
      </h1>
    );
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ marginTop: '20px' }}>
      {items.length === 0 ? (
        <div>No results found.</div>
      ) : (
        <div
          style={{
            marginTop: '100px',
            display: 'flex',
            gap: '30px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {items.map((item) => (
            <Card
              key={item.name}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>
      )}
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => prevUrl && fetchPage(prevUrl)}
          disabled={!prevUrl}
          aria-label="Previous page"
        >
          « Prev
        </button>
        <button
          style={{ cursor: 'pointer' }}
          onClick={() => nextUrl && fetchPage(nextUrl)}
          disabled={!nextUrl}
          aria-label="Next page"
        >
          Next »
        </button>
      </div>
    </div>
  );
};

export default Results;
