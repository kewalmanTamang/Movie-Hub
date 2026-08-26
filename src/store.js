import { configureStore } from "@reduxjs/toolkit";
import FavoriteSlice from "./features/favoriteSlice"

const store = configureStore({
  reducer: {
    favorites: FavoriteSlice
  }
});

store.subscribe(() =>{
  const state = store.getState();
  const favoriteIds = state.favorites.ids;  
localStorage.setItem("favorites",JSON.stringify(favoriteIds));
});

export default store;