import { createSlice } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: []
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (!existingItem) {
        state.cartItems.push(action.payload);
        console.log('Item added to cart:', state.cartItems);
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your product has been added to the cart",
            showConfirmButton: false,
            timer: 1500
          });
      } else {
        console.log('Item already in cart:', state.cartItems);
        Swal.fire({
            title: "No being greedy!",
            text: "one piece per customer, sharing is caring<3",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ok ill behave -_-"
          })
            
          
      }
    },
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
    },
    clearCart: (state) => {
        state.cartItems = [];
  },
}});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;