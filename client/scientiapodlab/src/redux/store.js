import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import episodeReducer from "./features/episode/episodeSlice";
import podcastReducer from "./features/podcast/podcastSlice";
import resourceReducer from "./features/resource/resourceSlice";
import templateReducer from "./features/template/templateSlice";
import wizardReducer from "./features/wizard/wizardSlice";

import { userService } from "./api/services/userService";
import { episodeService } from "./api/services/episodeService";
import { podcastService } from "./api/services/podcastService";
import { resourceService } from "./api/services/resourceService";
import { segmentService } from "./api/services/segmentService";
import { templateService } from "./api/services/templateService";

export const store = configureStore({
  reducer: {
    [userService.reducerPath]: userService.reducer,
    [episodeService.reducerPath]: episodeService.reducer,
    [podcastService.reducerPath]: podcastService.reducer,
    [resourceService.reducerPath]: resourceService.reducer,
    [segmentService.reducerPath]: segmentService.reducer,
    [templateService.reducerPath]: templateService.reducer,
    user: userReducer,
    episode: episodeReducer,
    podcast: podcastReducer,
    resource: resourceReducer,
    template: templateReducer,
    wizard: wizardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userService.middleware,
      episodeService.middleware,
      podcastService.middleware,
      resourceService.middleware,
      segmentService.middleware,
      templateService.middleware
    ),
});
