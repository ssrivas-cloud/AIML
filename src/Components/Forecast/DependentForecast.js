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
import { setDependentValue } from "../../Features/forecastRegressionSlice";
const DependentForecast = ({ numericFields }) => {
  const dependentValue  = useSelector((state) => state.forecastRegression.dependentValue);
  const dispatch = useDispatch();
  const handleDependentChange = (e) => {
    dispatch(setDependentValue(e.target.value));
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
