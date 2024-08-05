import { createSlice } from "@reduxjs/toolkit";


const forecastRegressionSlice = createSlice({
  name: "forecastRegression",
  initialState:{
    dependentValue:'',
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
export const { setEnablePredict,setPredictClicked,setRegressionOutput,setRunTimePredictClick,setToolTipValue, setDependentValue } = forecastRegressionSlice.actions;
export default forecastRegressionSlice.reducer;
