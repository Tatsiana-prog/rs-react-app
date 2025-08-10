import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import Card from '../Card/Card';
import SelectedItems from '../SelectedItems/SelectedItems';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { useGetPokemonListQuery } from '../../apiSlice';
import type { PokemonDetails, PokemonListItem } from '../../types';

interface ResultsProps {
  searchTerm: string;
  onComplete?: () => void;
  showError: boolean;
}

const Results: React.FC<ResultsProps> = ({ searchTerm, onComplete }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pageParam = params.get('page') || '1';
  const currentPage = parseInt(pageParam, 10);

  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems
  );
  const showSelectedItems = selectedItems.length > 0;

  const { data, error, isLoading, refetch } =
    useGetPokemonListQuery(currentPage);

  const [detailedItems, setDetailedItems] = useState<PokemonDetails[]>([]);

  useEffect(() => {
    if (data) {
      const fetchDetails = async () => {
        const detailsPromises = data.results.map((item: PokemonListItem) =>
          fetch(item.url).then((res) => res.json())
        );
        const details = await Promise.all(detailsPromises);
        setDetailedItems(details as PokemonDetails[]);
        if (onComplete) onComplete();
      };

      fetchDetails();
    }
  }, [data, onComplete]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching Pokémon list:', error);
    navigate('/404');
    return <div>Failed to load Pokémon list. Please try again later.</div>;
  }

  const count = data?.count || 0;

  const filteredItems = detailedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (name: string) => {
    navigate(`/results/details/${name}${location.search}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || (data && newPage > Math.ceil(count / 18))) {
      navigate('/404');
      return;
    }
    const newParams = new URLSearchParams(location.search);
    newParams.set('page', String(newPage));
    navigate({ pathname: location.pathname, search: newParams.toString() });
  };

  const handleRefresh = async () => {
    try {
      await refetch().unwrap();
      console.log('Кэш успешно сброшен');
    } catch (error) {
      console.error('Ошибка при сбросе кэша:', error);
    }
  };

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
              <Card
                name={item.name}
                description={item.types.map((t) => t.type.name).join(', ')}
              />
            </div>
          ))}
        </div>
        {showSelectedItems && <SelectedItems />}

        <div
          style={{
            marginTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button onClick={handleRefresh} className="btn-refresh button">
            Refresh
          </button>
          <div
            style={{
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
              Page {currentPage} of {Math.ceil(count / 18)}
            </span>
            <button
              className="btn-arrow"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= Math.ceil(count / 18)}
            >
              Next »
            </button>
          </div>
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
