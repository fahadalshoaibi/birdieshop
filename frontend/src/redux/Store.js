import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import  productAPI  from './features/product/productAPI';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});