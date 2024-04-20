// inventorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    editProduct: (state, action) => {
      const { productId, updatedProduct } = action.payload;
      const index = state.products.findIndex(product => product.id === productId);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(product => product.id !== productId);
    },
    calculateDiscountPercentage: (state, action) => {
      const { productId, discountPrice } = action.payload;
      const product = state.products.find(product => product.id === productId);
      if (product) {
        const price = product.price;
        const discount = price - discountPrice;
        const discountPercentage = ((discount / price) * 100).toFixed(2);
        product.discountPercentage = discountPercentage;
      }
    },
    updateProductStatus(state, action) {
        const { productId, status } = action.payload;
        // Find the product by productId and update its status
        const productToUpdate = state.products.find(product => product.id === productId);
        if (productToUpdate) {
          productToUpdate.status = status;
        }
      },
  }
});

export const { addProduct, editProduct, deleteProduct, calculateDiscountPercentage , updateProductStatus } = inventorySlice.actions;
export default inventorySlice.reducer;
