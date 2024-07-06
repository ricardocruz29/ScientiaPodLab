import { createSlice } from "@reduxjs/toolkit";

const podcastSlice = createSlice({
  name: "podcast",
  initialState: {
    listeningEpisodeID: undefined,
    createPodcastForm: {
      step: 1,
      info: undefined, //first form
      template: undefined, //second form
    },
  },
  reducers: {
    startListeningEpisode: (state, action) => {
      state.listeningEpisodeID = action.payload.episodeID;
    },
    stopListeningEpisode: (state, _) => {
      state.listeningEpisodeID = undefined;
    },
    nextStep: (state, _) => {
      state.createPodcastForm.step += 1;
    },
    prevStep: (state, _) => {
      state.createPodcastForm.step += 1;
    },
    fillInformation: (state, action) => {
      state.createPodcastForm.info = action.payload.info;
    },
    fillTemplate: (state, action) => {
      state.createPodcastForm.template = action.payload.template;
    },
  },
});

export const {
  startListeningEpisode,
  stopListeningEpisode,
  nextStep,
  prevStep,
  fillInformation,
  fillTemplate,
} = podcastSlice.actions;

export default podcastSlice.reducer;
