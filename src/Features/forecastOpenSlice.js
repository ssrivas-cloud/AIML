import { createSlice } from "@reduxjs/toolkit";

const forecastOpenSlice = createSlice({
  name: "forecastOpen",
  initialState: {
    forecastOpen: false,
  },
  reducers: {
    setForecastOpen: (state, action) => {
      state.forecastOpen = action.payload;
    },
  },
});

export const { setForecastOpen } = forecastOpenSlice.actions;
export default forecastOpenSlice.reducer;
