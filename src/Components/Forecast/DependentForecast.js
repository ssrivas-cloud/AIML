import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const DependentForecast = () => {
  const [dependentVarible, setDependentVarible] = useState("");

  const handleChange = (event) => {
    setDependentVarible(event.target.value);
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
            value={dependentVarible}
            label="Dependent variable"
            onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
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
