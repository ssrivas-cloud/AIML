import { createSlice } from "@reduxjs/toolkit";


const forecastRegressionSlice = createSlice({
  name: "forecastRegression",
  initialState:{
    enablePredict:false,
    predictClicked:false,
    regressionOutput:null,
    runTimePredictClick:false,
    toolTipValue:null
  },
  reducers: {
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
export const { setEnablePredict,setPredictClicked,setRegressionOutput,setRunTimePredictClick,setToolTipValue } = forecastRegressionSlice.actions;
export default forecastRegressionSlice.reducer;
