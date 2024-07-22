import { createSlice } from "@reduxjs/toolkit";

const globalSlice = createSlice({
  name: "global",
  initialState: {
    activeSidebar: "podcasts",
  },
  reducers: {
    changeActiveSidebar: (state, action) => {
      state.activeSidebar = action.payload;
    },
  },
});

export const { changeActiveSidebar } = globalSlice.actions;

export default globalSlice.reducer;
