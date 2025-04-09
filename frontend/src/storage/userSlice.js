import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    setFavourites: (state, action) => {
      state.data.favourites = action.payload;
    },
    setCart: (state, action) => {
      state.data.cart = action.payload;
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, setFavourites, setCart, logout } = userSlice.actions;
export default userSlice.reducer; 
