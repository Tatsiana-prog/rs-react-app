
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemState {
  selectedItems: string[];
}

const initialState: ItemState = {
  selectedItems: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<string>) {
      state.selectedItems.push(action.payload);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(item => item !== action.payload);
    },
  },
});

export const { addItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;