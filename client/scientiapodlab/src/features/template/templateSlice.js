import { createSlice } from "@reduxjs/toolkit";

const templateSlice = createSlice({
  name: "template",
  initialState: {
    state: "SEE", //either SEE, EDIT or DUPLICATE
    editTemplateForm: undefined,
    duplicateTemplateForm: undefined,
  },
  reducers: {
    startEditing: (state, _) => {
      state.state = "EDIT";
    },
    confirmEditing: (state, action) => {
      state.state = "SEE";
      state.editTemplateForm = action.payload.info;
    },
    startDuplicating: (state, _) => {
      state.state = "DUPLICATE";
    },
    confirmDuplicating: (state, action) => {
      state.state = "SEE";
      state.duplicateTemplateForm = action.payload.info;
    },
  },
});

export const {
  startEditing,
  confirmEditing,
  startDuplicating,
  confirmDuplicating,
} = templateSlice.actions;

export default templateSlice.reducer;
