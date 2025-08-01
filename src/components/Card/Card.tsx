import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../itemsSlice';
import './Card.css';

interface CardProps {
  name: string;
  description: string;
}

interface Item {
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, description }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: { items: { selectedItems: Item[] } }) => state.items.selectedItems
  );
  const isSelected = selectedItems.some((item: Item) => item.name === name);

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
        />
        <div className="checkbox-custom" />
        Select
      </label>
      <h2 className="card-title">{name}</h2>
      <p className="card-description">{description}</p>
    </div>
  );
};

export default Card;
