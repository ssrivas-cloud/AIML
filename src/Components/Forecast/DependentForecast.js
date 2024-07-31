import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { setGlobalDependent } from "../../Features/dependentSlice";
import { useDispatch, useSelector } from "react-redux";

const DependentForecast = ({ queryResults }) => {
  console.log(queryResults);
  const { dependent } = useSelector((state) => state.dependent);
  const dispatch = useDispatch();
  const handleDependentChange = () => {
    console.log(dependent);
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
            label={dependent ? dependent : "Dependent variable"}
            onChange={handleDependentChange}
          >
            {queryResults?.dataset?.fields?.map((column) => (
              <MenuItem value={column.reference}>{column.reference}</MenuItem>
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
