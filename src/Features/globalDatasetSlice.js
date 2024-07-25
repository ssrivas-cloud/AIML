import { createSlice } from "@reduxjs/toolkit";

const globalDatasetSlice = createSlice({
  name: "dataset",
  initialState: {
    data: {},
  },
  reducers: {
    setGlobalDataset: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setGlobalDataset } = globalDatasetSlice.actions;
export default globalDatasetSlice.reducer;
