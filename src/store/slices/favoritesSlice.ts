import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { favorites: [] };

function loadWishlistState() {
  let savedWishlistState;

  if (typeof window !== "undefined") {
    savedWishlistState = localStorage.getItem("favorites");
  }
  return savedWishlistState ? JSON.parse(savedWishlistState) : initialState;
}

function saveWishlistState(state: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("favorites", JSON.stringify(state));
  }
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadWishlistState(),
  reducers: {
    addToFavorites: (state, action) => {
      const { favorites } = state;
      const newItem = action.payload;
      const existingItem = favorites?.find(
        (item: any) => item.id === newItem.id
      );

      if (!existingItem) {
        state.favorites.push(newItem);
        saveWishlistState(state);
      }
    },
    removeFromFavorites: (state, action) => {
      const { favorites } = state;
      const newItem = action?.payload;
      state.favorites = favorites.filter(
        (item: any) => item.id !== newItem?.id
      );
      saveWishlistState(state);
    },

    clearFavorites: (state) => {
      state.favorites = [];
      saveWishlistState(state);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
