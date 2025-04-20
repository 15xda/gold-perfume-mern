import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { data: null },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    replaceUserData: (state, action) => {
      if (state.data ) {
        state.data = {
          ...state.data,
          ...action.payload,
        }
      }
    },
    setAddresses: (state, action) => {
      if (state.data) {
        state.data.addresses = action.payload;
      }
    },
    setFavourites: (state, action) => {
      state.data.favourites = action.payload;
    },
    setCart: (state, action) => {
      if (state.data) {
        state.data.cart = action.payload;
      }
    },
    logout: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, setFavourites, replaceUserData, setAddresses, setCart, logout } = userSlice.actions;
export default userSlice.reducer; 
