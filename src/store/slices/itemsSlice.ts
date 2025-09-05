import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Item {
  name: string;
  description: string;
}

interface ItemState {
  selectedItems: Item[];
}

const initialState: ItemState = {
  selectedItems: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<Item>) {
      const item = action.payload;
      const exists = state.selectedItems.find((i) => i.name === item.name);
      if (exists) {
        state.selectedItems = state.selectedItems.filter(
          (i) => i.name !== item.name
        );
      } else {
        state.selectedItems.push(item);
      }
    },
  },
});

export const { toggleItem } = itemsSlice.actions;
export default itemsSlice.reducer;
