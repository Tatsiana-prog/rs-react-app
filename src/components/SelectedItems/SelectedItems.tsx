import React from 'react';
import './SelectedIitems.css';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import { toggleItem } from '../../itemsSlice';

const SelectedItems: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.items.selectedItems
  );

  const handleUnselectAll = () => {
    selectedItems.forEach((item) => dispatch(toggleItem(item)));
  };

  const handleDownload = () => {
    const csvContent = `data:text/csv;charset=utf-8,${selectedItems.map((item) => `${item.name}:${item.description}`).join('\n')}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="selected-items">
      <h3>Selected Pokémons</h3>
      {selectedItems.length === 0 ? (
        <p>No items selected</p>
      ) : (
        <div>
          <p>Total number of selected items: {selectedItems.length}</p>
          <ul>
            {selectedItems.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong>: {item.description}
              </li>
            ))}
          </ul>
          <div className="buttons-wrapper">
            <button className="button" onClick={handleUnselectAll}>
              Unselect all
            </button>
            <button className="button" onClick={handleDownload}>
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectedItems;
