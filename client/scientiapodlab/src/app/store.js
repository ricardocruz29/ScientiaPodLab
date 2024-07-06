import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import { userApiSlice } from "../api/slices/userApiSlice";
import { episodeApiSlice } from "../api/slices/episodeSlice";
import { podcastApiSlice } from "../api/slices/podcastSlice";
import { resourceApiSlice } from "../api/slices/resourceSlice";
import { segmentApiSlice } from "../api/slices/segmentApiSlice";
import { templateApiSlice } from "../api/slices/templateApiSlice";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [episodeApiSlice.reducerPath]: episodeApiSlice.reducer,
    [podcastApiSlice.reducerPath]: podcastApiSlice.reducer,
    [resourceApiSlice.reducerPath]: resourceApiSlice.reducer,
    [segmentApiSlice.reducerPath]: segmentApiSlice.reducer,
    [templateApiSlice.reducerPath]: templateApiSlice.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApiSlice.middleware,
      episodeApiSlice.middleware,
      podcastApiSlice.middleware,
      resourceApiSlice.middleware,
      segmentApiSlice.middleware,
      templateApiSlice.middleware
    ),
});
