'use client';
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Store } from 'redux';
import Card from '../app/[locale]/components/Card/Card';
import { toggleItem } from '../store/slices/itemsSlice';

jest.mock('../store/slices/itemsSlice', () => ({
  toggleItem: jest.fn(),
}));

interface Item {
  name: string;
  description: string;
}

interface RootState {
  items: {
    selectedItems: Item[];
  };
}

const mockStore = configureStore<RootState>();
const item: Item = { name: 'Test Item', description: 'Test Description' };

describe('Card component', () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = mockStore({
      items: {
        selectedItems: [],
      },
    }) as unknown as Store<RootState>;
    store.dispatch = jest.fn();
  });

  it('renders with name and description', () => {
    render(
      <Provider store={store}>
        <Card name={item.name} description={item.description} />
      </Provider>
    );

    expect(screen.getByText(item.name)).toBeInTheDocument();
    expect(screen.getByText(item.description)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select/i)).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = jest.fn();

    render(
      <Provider store={store}>
        <Card
          name={item.name}
          description={item.description}
          onClick={handleClick}
        />
      </Provider>
    );

    fireEvent.click(screen.getByText(item.name));
    expect(handleClick).toHaveBeenCalled();
  });

  it('dispatches toggleItem when checkbox is clicked', () => {
    render(
      <Provider store={store}>
        <Card name={item.name} description={item.description} />
      </Provider>
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(toggleItem).toHaveBeenCalledWith(item);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('checkbox is checked if item is selected', () => {
    store = mockStore({
      items: {
        selectedItems: [item],
      },
    }) as unknown as Store<RootState>;
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Card name={item.name} description={item.description} />
      </Provider>
    );

    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
