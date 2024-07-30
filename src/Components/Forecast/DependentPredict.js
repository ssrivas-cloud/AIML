import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Import Components
import TableForecast from "./TableForecast";

const DependentPredict = () => {
  const [forecastPredict, setForecastPredict] = useState(false);
  return (
    <>
      <Box sx={{ minWidth: 500, maxWidth: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography variant="h5">Forecast and comparison</Typography>
            <Typography variant="body2">
              Change the independent variable to forecast the prediction
            </Typography>
            <p
              style={{
                display: "flex",
                alignItems: "centers",
                color: "#0076AD",
                gap: "5px",
              }}
            >
              Formula <InfoOutlinedIcon fontSize="small" />
            </p>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <button
              className={`btn ${forecastPredict ? "" : "disabled"}`}
              variant="outlined"
              onClick={() => setForecastPredict(!forecastPredict)}
            >
              Predict
            </button>
          </Box>
        </Box>

        <Box>
          <TableForecast />
        </Box>
      </Box>
    </>
  );
};

export default DependentPredict;
