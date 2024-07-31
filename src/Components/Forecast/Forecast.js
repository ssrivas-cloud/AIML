import { Box } from "@mui/material";
import React from "react";

// components import
import DependentForecast from "./DependentForecast";
import DependentPredict from "./DependentPredict";

const Forecast = ({ queryResults }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <DependentForecast queryResults={queryResults} />
      <DependentPredict queryResults={queryResults} />
    </Box>
  );
};

export default Forecast;
