import React, {useState} from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip 
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalDependent } from "../../Features/dependentSlice";
const DependentForecast = ({ queryResults, numericFields }) => {
  const { dependent } = useSelector((state) => state.dependent);
  const dispatch = useDispatch();
  const handleDependentChange = (e) => {
    dispatch(setGlobalDependent(e.target.value));
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
            value={dependent || ""}
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
