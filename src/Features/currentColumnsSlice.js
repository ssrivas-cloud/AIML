import { createSlice } from "@reduxjs/toolkit";

const currentColumnsSlice = createSlice({
  name: "currentColumns",
  initialState: {
    columns: null,
  },
  reducers: {
    addNewColumns: (state, action) => {
      state.columns = action.payload;
    },
  },
});

export const { addNewColumns } = currentColumnsSlice.actions;
export default currentColumnsSlice.reducer;
