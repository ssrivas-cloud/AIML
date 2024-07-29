// store.js
import { configureStore } from "@reduxjs/toolkit";
import visualizationReducer from "./Features/visualizationSlice";
import reportListReducer from "./Features/reportListSlice";
import globalDatasetReducer from "./Features/globalDatasetSlice";
import chatOpenReducer from "./Features/chatOpenSlice";

const store = configureStore({
  reducer: {
    visualization: visualizationReducer,
    reportList: reportListReducer,
    globalDataset: globalDatasetReducer,
    chatOpen: chatOpenReducer,
  },
});

export default store;
