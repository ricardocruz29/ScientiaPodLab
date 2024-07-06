import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { userApiSlice } from "../api/slices/userApiSlice";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApiSlice.middleware),
});
