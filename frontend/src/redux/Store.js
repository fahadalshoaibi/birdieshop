import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import  productAPI  from './features/products/productAPI';
import orderAPI from './features/orders/orderAPI';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [orderAPI.reducerPath]: orderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware, orderAPI.middleware),
});