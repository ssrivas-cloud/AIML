import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatOpen: false,
};

const chatOpenSlice = createSlice({
  name: "chatOpen",
  initialState,
  reducers: {
    setChatOpen: (state, action) => {
      state.chatOpen = action.payload;
    },
  },
});

export const { setChatOpen } = chatOpenSlice.actions;
export default chatOpenSlice.reducer;
