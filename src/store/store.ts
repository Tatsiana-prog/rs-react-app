import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../itemsSlice';
import { apiSlice } from '../apiSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = {
  items: ReturnType<typeof itemsReducer>;
  [apiSlice.reducerPath]: ReturnType<typeof apiSlice.reducer>;
};

export type AppDispatch = typeof store.dispatch;
