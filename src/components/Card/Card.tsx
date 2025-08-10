import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../itemsSlice';
import { useGetPokemonDetailsQuery } from '../../apiSlice';
import './Card.css';

interface CardProps {
  name: string;
  description: string;
}

interface Item {
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: { items: { selectedItems: Item[] } }) => state.items.selectedItems
  );

  const isSelected = selectedItems.some((item) => item.name === name);
  const { data, isLoading, isError } = useGetPokemonDetailsQuery(name);

  const description = data
    ? data.types.map((t) => t.type.name).join(', ')
    : 'Нет данных о типах';

  const handleToggle = () => {
    const item: Item = { name, description };
    dispatch(toggleItem(item));
  };

  return (
    <div className="card">
      <label className="checkbox-label">
        <input
          type="checkbox"
          className="checkbox"
          checked={isSelected}
          onChange={handleToggle}
          disabled={isLoading || isError}
        />
        <div className="checkbox-custom" />
        Select
      </label>
      <h2 className="card-title">{name}</h2>
      <p className="card-description">
        {isLoading
          ? 'Загрузка...'
          : isError
            ? 'Ошибка загрузки данных'
            : description}
      </p>
    </div>
  );
};

export default Card;
