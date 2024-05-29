import { createSlice } from "@reduxjs/toolkit";

const initialState = { cart: [] };

function loadCartState() {
  let savedCartState;

  if (typeof window !== "undefined") {
    savedCartState = localStorage.getItem("cart");
  }
  return savedCartState ? JSON.parse(savedCartState) : initialState;
}

function saveCartState(state: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(state));
  }
}

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartState(),
  reducers: {
    addToCart: (state, action) => {
      const { cart } = state;
      const newItem = action.payload;
      const existingItem = cart?.find((item: any) => item.id === newItem.id);

      if (!existingItem) {
        state.cart.push({ ...newItem, count: 1 });
        saveCartState(state);
      }
    },
    updateCart: (state, action) => {
      state.cart = action.payload;
      saveCartState(state);
    },
    increaseProductCount: (state, action) => {
      const { cart } = state;
      const newItem = action.payload;
      const existingIndex = cart.findIndex(
        (item: any) => item.id === newItem.id
      );

      if (existingIndex !== -1) {
        // If item already exists, increase its count
        state.cart[existingIndex].count += 1;
      } else {
        // If item doesn't exist, add it to the cart
        state.cart.push({ ...newItem, count: 1 });
      }
      saveCartState(state);
    },
    decreaseProductCount: (state, action) => {
      const { cart } = state;
      const newItem = action.payload;
      const itemIndex = cart.findIndex((item: any) => item.id === newItem.id);

      if (itemIndex !== -1) {
        // If item exists, decrease its count
        state.cart[itemIndex].count -= 1;

        if (state.cart[itemIndex].count === 0) {
          // If count becomes zero, remove the item from the cart
          state.cart.splice(itemIndex, 1);
        }
      }
      saveCartState(state);
    },
    removeFromCart: (state, action) => {
      const { cart } = state;
      const newItem = action?.payload;
      state.cart = cart.filter((item: any) => item.id !== newItem?.id);
      saveCartState(state);
    },

    clearCart: (state) => {
      state.cart = [];
      saveCartState(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseProductCount,
  decreaseProductCount,
  updateCart
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
