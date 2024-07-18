// store.js
import { configureStore } from '@reduxjs/toolkit';
import visualizationReducer from './Features/visualizationSlice';
import reportListReducer from './Features/reportListSlice';

const store = configureStore({
  reducer: {
    visualization: visualizationReducer,
    reportList: reportListReducer,
  },
});

export default store;
