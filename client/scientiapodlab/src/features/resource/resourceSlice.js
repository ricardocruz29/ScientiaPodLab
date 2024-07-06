import { createSlice } from "@reduxjs/toolkit";

const resourceSlice = createSlice({
  name: "resource",
  initialState: {
    filter: undefined, //Either custom or system
    listeningID: undefined, //ID of the resource that is being listened
    listeningType: undefined, //type of the resource that is being listened
    readingID: undefined, //ID of the TTS resource that we are seeing
  },
  reducers: {
    filterResources: (state, action) => {
      state.filter = action.payload.filter;
      //stop listening when we filter
      state.listeningID = undefined;
      state.listeningType = undefined;
      state.readingID = undefined;
    },
    startListening: (state, action) => {
      state.listeningID = action.payload.listeningID;
      state.listeningType = action.payload.listeningType;
      state.readingID = undefined;
    },
    stopListening: (state, _) => {
      state.listeningID = undefined;
      state.listeningType = undefined;
      state.readingID = undefined;
    },
    startReading: (state, action) => {
      state.readingID = action.payload.readingID;
    },
    stopReading: (state, _) => {
      state.readingID = undefined;
    },
  },
});

export const {
  filterResources,
  startListening,
  stopListening,
  startReading,
  stopReading,
} = resourceSlice.actions;

export default resourceSlice.reducer;
