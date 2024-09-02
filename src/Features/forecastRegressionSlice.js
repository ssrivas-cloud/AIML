import { createSlice } from "@reduxjs/toolkit";


const forecastRegressionSlice = createSlice({
  name: "forecastRegression",
  initialState:{
    algorithm:'',
    dependentValue:'',
    originalDependentValue:'',
    enablePredict:false,
    addToList:false,
    regressionOutput:null,
    predictClick:false,
    toolTipValue:null
  },
  reducers: {
    setAlgorithmValue: (state, action) => {
      state.algorithm = action.payload;
    },
    setDependentValue: (state, action) => {
      state.dependentValue = action.payload;
    },
    setOriginalDependentValue: (state, action) => {
      state.originalDependentValue = action.payload;
    },
    setEnablePredict: (state, action) => {
      state.enablePredict = action.payload;
    },
    setAddToList: (state, action) => {
      state.addToList = action.payload;
    },
    setPredictClick: (state, action) => {
      state.predictClick = action.payload;
    },
    setRegressionOutput: (state, action) => {
      state.regressionOutput = action.payload;
    },
    setToolTipValue: (state, action) => {
      state.toolTipValue = action.payload;
    },
  },
});
export const { setEnablePredict,setAddToList,setRegressionOutput,setPredictClick,setToolTipValue, setDependentValue, setOriginalDependentValue, setAlgorithmValue } = forecastRegressionSlice.actions;
export default forecastRegressionSlice.reducer;
