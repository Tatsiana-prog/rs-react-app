import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import itemsReducer, { toggleItem } from '../itemsSlice';
import Card from '../components/Card/Card';

const item = { name: 'Test Item', description: 'Test Description' };

describe('Card component', () => {
  it('renders name and description', () => {
    const store = configureStore({
      reducer: { items: itemsReducer },
      preloadedState: { items: { selectedItems: [] } },
    });

    render(
      <Provider store={store}>
        <Card name={item.name} description={item.description} />
      </Provider>
    );

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
  });

  it('checkbox is checked if item is selected', () => {
    const store = configureStore({
      reducer: { items: itemsReducer },
      preloadedState: { items: { selectedItems: [item] } },
    });

    render(
      <Provider store={store}>
        <Card name={item.name} description={item.description} />
      </Provider>
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('dispatches toggleItem on checkbox change', () => {
    const store = configureStore({
      reducer: { items: itemsReducer },
      preloadedState: { items: { selectedItems: [] } },
    });

    const spy = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <Card name={item.name} description={item.description} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(spy).toHaveBeenCalledWith(toggleItem(item));
  });
});
