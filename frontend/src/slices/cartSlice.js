import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (curItem) => curItem._id === item._id
      );
      if (existItem) {
        state.cartItems = state.cartItems.map((curItem) =>
          curItem._id === existItem._id ? item : curItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem._id !== item._id
      );
      return updateCart(state);
    },
    // saveShippingAddress: (state, action) => {
    //   state.shippingAddress = action.payload;
    //   return updateCart(state);
    // },
    saveShippingAddress: {
      reducer(state, action) {
        state.shippingAddress = action.payload;
        return updateCart(state);
      },
      prepare(address, city, postalCode, country) {
        return {
          payload: {
            address,
            city,
            postalCode,
            country,
          },
        };
      },
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;
export default cartSlice.reducer;
