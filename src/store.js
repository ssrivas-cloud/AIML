// store.js
import { configureStore } from "@reduxjs/toolkit";
import visualizationReducer from "./Features/visualizationSlice";
import reportListReducer from "./Features/reportListSlice";
import globalDatasetReducer from "./Features/globalDatasetSlice";

const store = configureStore({
  reducer: {
    visualization: visualizationReducer,
    reportList: reportListReducer,
    globalDataset: globalDatasetReducer,
  },
});

export default store;
