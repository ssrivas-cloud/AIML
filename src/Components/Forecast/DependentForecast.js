import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button 
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setDependentValue, setAlgorithmValue } from "../../Features/forecastRegressionSlice";
const DependentForecast = ({ numericFields }) => {
  const dependentValue  = useSelector((state) => state.forecastRegression.dependentValue);
  const algorithm  = useSelector((state) => state.forecastRegression.algorithm);
  const algos = ['Linear Regression', 'Polynomial Regression', 'Logistic Regression', 'Ridge Regression', 'Lasso Regression', 'Elastic Net Regression', 'Random Forest Regression', 'Gradient Boosting Regression', 'Support Vector Regression', 'K-Nearest Neighbors Regression', 'Decision Tree Regression', 'Neural Network Regression'];
  const dispatch = useDispatch();
  const handleDependentChange = (e) => {
    dispatch(setDependentValue(e.target.value));
  };
  const handleAlgorithmChange = (e) => {
    dispatch(setAlgorithmValue(e.target.value));
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ m: 1, ml: 0, minWidth: 200 }}>
          <InputLabel id="simple-select-helper-label">
            Algorithm
          </InputLabel>
          <Select
            labelId="simple-select-helper-label"
            id="simple-select-helper"
            value={algorithm || ""}
            label={"Algorithm"}
            onChange={handleAlgorithmChange}
          >
            {algos.map((column, index) => (
              <MenuItem key={index} value={column}>{column}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, ml: 0, minWidth: 200 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Dependent variable
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={dependentValue || ""}
            label={"Dependent variable"}
            onChange={handleDependentChange}
          >
            {numericFields.map((column, index) => (
              <MenuItem key={index} value={column.reference}>{column.reference}</MenuItem>
            ))}
          </Select>
        </FormControl>
       
          <Button
            variant="contained"
            color="primary"
            className="btn adv-filter"
            onClick={() => console.log("click")}
          >
            Forecast
          </Button>
      </Box>
    </>
  );
};

export default DependentForecast;
