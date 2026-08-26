import { createSlice } from "@reduxjs/toolkit";

const savedFavorites = localStorage.getItem("favorites");


const initialState = {
 ids : savedFavorites ? JSON.parse(savedFavorites) :[]
}
 const FavoritesSlice = createSlice({
  name:'favorites', 
  initialState,
  reducers:{
  addFavorite:(state,action) =>{
   state.ids.push(action.payload)
  },
  removeFavorite:(state,action) =>{
  state.ids = state.ids.filter((id) => {
   return id !== action.payload
   })
  },
  clearFavorite:(state) =>{
    state.ids = []
  }
  }
})

export const {addFavorite,removeFavorite,clearFavorite} = FavoritesSlice.actions

export default FavoritesSlice.reducer