import { createSlice } from "@reduxjs/toolkit";


const forecastRegressionSlice = createSlice({
  name: "forecastRegression",
  initialState:{
    dependentValue:'',
    originalDependentValue:'',
    enablePredict:false,
    predictClicked:false,
    regressionOutput:null,
    runTimePredictClick:false,
    toolTipValue:null
  },
  reducers: {
    setDependentValue: (state, action) => {
      state.dependentValue = action.payload;
    },
    setOriginalDependentValue: (state, action) => {
      state.originalDependentValue = action.payload;
    },
    setEnablePredict: (state, action) => {
      state.enablePredict = action.payload;
    },
    setPredictClicked: (state, action) => {
      state.predictClicked = action.payload;
    },
    setRunTimePredictClick: (state, action) => {
      state.runTimePredictClick = action.payload;
    },
    setRegressionOutput: (state, action) => {
      state.regressionOutput = action.payload;
    },
    setToolTipValue: (state, action) => {
      state.toolTipValue = action.payload;
    },
  },
});
export const { setEnablePredict,setPredictClicked,setRegressionOutput,setRunTimePredictClick,setToolTipValue, setDependentValue, setOriginalDependentValue } = forecastRegressionSlice.actions;
export default forecastRegressionSlice.reducer;
