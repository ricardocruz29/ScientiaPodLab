import { createSlice } from "@reduxjs/toolkit";

const wizardSlice = createSlice({
  name: "wizard",
  initialState: {
    wizardType: "", //either episode or podcast
    opened: false,
  },
  reducers: {
    openWizard: (state, action) => {
      state.wizardType = action.payload.wizardType;
      state.opened = true;
    },
    closeWizard: (state, _) => {
      state.wizardType = "";
      state.opened = false;
    },
  },
});

export const { openWizard, closeWizard } = wizardSlice.actions;

export default wizardSlice.reducer;
