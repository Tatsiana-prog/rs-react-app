'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleItem } from '../../../../store/slices/itemsSlice';
import './Card.css';

interface CardProps {
  name: string;
  description: string;
  onClick?: () => void;
}
interface Item {
  name: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ name, description, onClick }) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: { items: { selectedItems: Item[] } }) => state.items.selectedItems
  );

  const isSelected = selectedItems.some((item) => item.name === name);

  const handleToggle = (): void => {
    const item: Item = { name, description };
    dispatch(toggleItem(item));
    console.log('Toggle clicked');
  };

  const handleClick = (): void => {
    console.log('Card clicked');
    if (onClick) {
      console.log('Calling onClick');
      onClick();
    }
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
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
