'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetPokemonListQuery } from '../../apiSlice';
import Card from '../Card/Card';
import SelectedItems from '../SelectedItems/SelectedItems';
import { notFound } from 'next/navigation';
import type { RootState } from '../../store/store';
import type {
  PokemonDetails as PokemonDetailsType,
  PokemonListItem,
} from '../../types';

export default function Results({ searchTerm }: { searchTerm: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pageParam = searchParams?.get('page') || '1';
  const currentPage = parseInt(pageParam, 10);

  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems
  );
  const showSelectedItems = selectedItems.length > 0;

  const { data, error, isLoading, refetch } =
    useGetPokemonListQuery(currentPage);
  const [detailedItems, setDetailedItems] = useState<PokemonDetailsType[]>([]);

  useEffect(() => {
    if (data) {
      const fetchDetails = async () => {
        try {
          const details = await Promise.all(
            data.results.map((item: PokemonListItem) =>
              fetch(item.url).then((res) => res.json())
            )
          );
          setDetailedItems(details);
        } catch (err) {
          console.error('Ошибка при загрузке деталей:', err);
        }
      };
      fetchDetails();
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    console.error('Error fetching Pokémon list:', error);
    notFound();
  }

  const count = data?.count || 0;
  const filteredItems = detailedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > Math.ceil(count / 18)) {
      notFound();
    } else {
      router.push(`${pathname}?page=${newPage}`);
    }
  };

  const handleRefresh = async () => {
    try {
      await refetch().unwrap();
      console.log('Кэш успешно сброшен');
    } catch (error) {
      console.error('Ошибка при сбросе кэша:', error);
    }
  };

  const handleCardClick = (name: string) => {
    router.push(`/pokemon/${name}`);
  };

  return (
    <div style={{ display: 'flex', marginTop: 20, padding: '0 20px' }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
          {filteredItems.length === 0 ? (
            <p>Ничего не найдено по запросу &quot;{searchTerm}&quot;</p>
          ) : (
            filteredItems.map((item) => (
              <div key={item.name}>
                <Card
                  name={item.name}
                  description={
                    item.types
                      ? item.types.map((t) => t.type.name).join(', ')
                      : 'Нет данных о типах'
                  }
                  onClick={() => handleCardClick(item.name)}
                />
              </div>
            ))
          )}
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
      <div style={{ marginLeft: 20, minWidth: 320 }}></div>
    </div>
  );
}
