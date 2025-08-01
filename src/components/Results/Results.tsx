import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Card from '../Card/Card';
import SelectedItems from '../SelectedItems/SelectedItems';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';

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
  const currentPage = parseInt(pageParam, 10);

  const [items, setItems] = useState<{ name: string; description: string }[]>(
    []
  );
  const [loadingList, setLoadingList] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems
  );
  const showSelectedItems = selectedItems.length > 0;
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

        if (!res.ok) throw new Error('Failed to fetch Pokémon list');

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
    navigate(`/results/details/${name}${location.search}`);
  };

  if (loadingList) return <div>Loading...</div>;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', marginTop: 20, padding: '0 20px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
          {filteredItems.map((item) => (
            <div
              key={item.name}
              style={{ cursor: 'pointer' }}
              onClick={() => handleCardClick(item.name)}
            >
              <Card name={item.name} description={item.description} />
            </div>
          ))}
        </div>
        {showSelectedItems && <SelectedItems />}

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button
            className="btn-arrow"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            « Prev
          </button>
          <span style={{ margin: '0 10px' }}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn-arrow"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next »
          </button>
        </div>
      </div>

      <div
        style={{
          marginLeft: 20,
          minWidth: 320,
          display: location.pathname.includes('/details/') ? 'block' : 'none',
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Results;
