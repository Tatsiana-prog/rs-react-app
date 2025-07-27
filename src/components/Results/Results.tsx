import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom';
import { useNavigate, useLocation } from 'react-router-dom';
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
  count: number;
}

interface PokemonType {
  type: { name: string };
}

interface PokemonDetails {
  name: string;
  types: PokemonType[];
}

const pageSize = 18;

const Results: React.FC<ResultsProps> = ({
  searchTerm,
  onComplete,
  showError,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page') || '1';
  const detailsParam = params.get('details');

  const currentPage = parseInt(pageParam, 10);

  const [items, setItems] = useState<{ name: string; description: string }[]>(
    []
  );
  const [loadingList, setLoadingList] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (isNaN(currentPage) || currentPage < 1) {
      navigate('/404');
      return;
    }

    const fetchList = async () => {
      setLoadingList(true);
      try {
        const offset = (currentPage - 1) * pageSize;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
        );
        if (!res.ok) throw new Error();
        const data: PokemonListResponse = await res.json();

        const total = Math.ceil(data.count / pageSize);
        if (currentPage > total) {
          navigate('/404');
          return;
        }

        setTotalPages(total);

        const detailedItems = await Promise.all(
          data.results.map(async (entry) => {
            const d = await fetch(entry.url).then((r) => r.json());
            return {
              name: d.name,
              description: d.types
                .map((t: PokemonType) => t.type.name)
                .join(', '),
            };
          })
        );

        setItems(detailedItems);
        onComplete();
      } catch (error) {
        if (showError) {
          console.error('Error fetching Pokémon list:', error);
        }
        navigate('/404');
      } finally {
        setLoadingList(false);
      }
    };

    fetchList();
  }, [currentPage, navigate, onComplete, showError]);

  useEffect(() => {
    if (!detailsParam) {
      setDetails(null);
      return;
    }

    const fetchDetails = async () => {
      setLoadingDetails(true);
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${detailsParam}`
        );
        if (!res.ok) {
          navigate('/404');
          return;
        }
        const data: PokemonDetails = await res.json();
        setDetails(data);
      } catch {
        navigate('/404');
      } finally {
        setLoadingDetails(false);
      }
    };

    fetchDetails();
  }, [detailsParam, navigate]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (totalPages && newPage > totalPages)) {
      navigate('/404');
      return;
    }
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(newPage));
    navigate({ pathname: location.pathname, search: newParams.toString() });
  };

  const handleCardClick = (name: string) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set('details', name);
    navigate({ pathname: location.pathname, search: newParams.toString() });
  };

  const handleCloseDetails = () => {
    const newParams = new URLSearchParams(location.search);
    newParams.delete('details');
    navigate({ pathname: location.pathname, search: newParams.toString() });
  };

  if (loadingList) return <div>Loading...</div>;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', marginTop: '20px', padding: '0 20px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          {filteredItems.map((item) => (
            <div
              key={item.name}
              style={{
                cursor: 'pointer',
                border:
                  detailsParam === item.name ? '2px solid orange' : 'none',
              }}
              onClick={() => handleCardClick(item.name)}
            >
              <Card name={item.name} description={item.description} />
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            « Prev
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next »
          </button>
        </div>
      </div>

      {detailsParam && (
        <div
          style={{
            width: '300px',
            height: '200px',
            marginLeft: '20px',
            border: '3px solid black',
            padding: '10px',
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7)',
            textAlign: 'center',
          }}
        >
          {loadingDetails ? (
            <div>Loading details...</div>
          ) : details ? (
            <>
              <h2 style={{ color: 'orange' }}>Details</h2>
              <h3>{details.name}</h3>
              <p>{details.types.map((t) => t.type.name).join(', ')}</p>
              <button onClick={handleCloseDetails}>Close</button>
            </>
          ) : (
            <div>Details not found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Results;
