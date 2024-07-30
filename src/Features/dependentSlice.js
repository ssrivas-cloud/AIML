import { createSlice } from "@reduxjs/toolkit";

const dependentSlice = createSlice({
  name: "dependent",
  initialState: {
    dependent: null,
  },
  reducers: {
    setGlobalDependent: (state, action) => {
      state.dependent = action.payload;
    },
  },
});

export const { setGlobalDependent } = dependentSlice.actions;

export default dependentSlice.reducer;
