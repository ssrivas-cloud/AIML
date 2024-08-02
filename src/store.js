// store.js
import { configureStore } from "@reduxjs/toolkit";
import visualizationReducer from "./Features/visualizationSlice";
import reportListReducer from "./Features/reportListSlice";
import globalDatasetReducer from "./Features/globalDatasetSlice";
import chatOpenReducer from "./Features/chatOpenSlice";
import dependentReducer from "./Features/dependentSlice";
import forecastOpenReducer from "./Features/forecastOpenSlice";
import forecastRegressionReducer from "./Features/forecastRegressionSlice";

const store = configureStore({
  reducer: {
    visualization: visualizationReducer,
    reportList: reportListReducer,
    globalDataset: globalDatasetReducer,
    chatOpen: chatOpenReducer,
    dependent: dependentReducer,
    forecastOpen: forecastOpenReducer,
    forecastRegression: forecastRegressionReducer,
  },
});

export default store;
