import { createSlice } from "@reduxjs/toolkit";

const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    listeningSegmentID: undefined,
    createEpisodeForm: {
      step: 1,
      info: undefined, //first form
      template: undefined, //second form
    },
    recordEpisodeForm: {
      segments: [], //objects with segment type and audio
      currentAddingSegment: undefined, //index of the current segment that is being added
      listeningResourceID: undefined, // when we are choosing segment from my resources
      state: "CREATE", //either CREATE or EDIT
    },
  },
  reducers: {
    startListeningSegment: (state, action) => {
      state.listeningSegmentID = action.payload.segmentID;
    },
    stopListeningSegment: (state, _) => {
      state.listeningSegmentID = undefined;
    },
    nextStep: (state, _) => {
      state.createEpisodeForm.step += 1;
    },
    prevStep: (state, _) => {
      state.createEpisodeForm.step += 1;
    },
    fillInformation: (state, action) => {
      state.createEpisodeForm.info = action.payload.info;
    },
    fillTemplate: (state, action) => {
      state.createEpisodeForm.template = action.payload.template;
    },
    startAddSegment: (state, action) => {
      state.recordEpisodeForm.currentAddingSegment = action.payload.segmentID;
    },
    confirmAddSegment: (state, action) => {
      state.recordEpisodeForm.segments = [
        ...state.recordEpisodeForm.segments,
        action.payload.segment,
      ];
    },
    deleteSegment: (state, action) => {
      const segments = [...state.recordEpisodeForm.segments];

      const segmentIndex = segments.findIndex(
        (s) => s.ID === action.payload.segmentID
      );
      segments.splice(segmentIndex, 1);

      state.recordEpisodeForm.segments = [...segments];
    },
    startListeningResource: (state, action) => {
      state.recordEpisodeForm.listeningResourceID = action.payload.resourceID;
    },
    stopListeningResource: (state, _) => {
      state.recordEpisodeForm.listeningResourceID = undefined;
    },
    startEditingEpisode: (state, _) => {
      state.recordEpisodeForm.state = "EDIT";
    },
  },
});

export const {
  startListeningSegment,
  stopListeningSegment,
  nextStep,
  prevStep,
  fillInformation,
  fillTemplate,
} = episodeSlice.actions;

export default episodeSlice.reducer;
