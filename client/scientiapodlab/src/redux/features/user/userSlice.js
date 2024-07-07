import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    information: undefined,
    isOnboard: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.information = action.payload.info;
    },
    startOnboarding: (state, _) => {
      state.isOnboard = true;
    },
    closeOnboarding: (state, _) => {
      state.isOnboard = false;
    },
  },
});

export const { setUser, startOnboarding, closeOnboarding } = userSlice.actions;

export default userSlice.reducer;
