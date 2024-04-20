// store.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './inventorySlice';

const store = configureStore({
  reducer: {
    products: productReducer
  }
});

export default store;
