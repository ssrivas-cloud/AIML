/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from "axios";
import React, { useState } from "react";
import Dropdown from "../../Utilities/Dropdown";
import {
  Box,
  Dialog,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setGlobalDependent } from "../../Features/dependentSlice";
import { setForecastOpen } from "../../Features/forecastOpenSlice";
import { useDispatch, useSelector } from "react-redux";

const RegressionAnalysisPopup = ({
  numericFields,
  openDialog,
  setOpenDialog,
  handleCloseDialog,
}) => {
  const [dependantField, setDependantField] = useState("");
  const dispatch = useDispatch();
  const { dependent } = useSelector((state) => state.dependent);

  const handleDependentVarChange = (event) => {
    setDependantField(event.target.value);
  };

  const handleForecastEquation = () => {
    dispatch(setGlobalDependent(dependantField));
    dispatch(setForecastOpen(true));
    setOpenDialog(false);
    setDependantField("");
  };
  const handleCloseDialogDependent = () => {
    handleCloseDialog();
    setDependantField("");
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialogDependent}
      aria-labelledby="regression-analysis-dialog-title"
      className="regression-dialog"
    >
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <DialogTitle
          id="regression-analysis-dialog-title"
          sx={{
            padding: 0,
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Forecast
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseDialogDependent}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <p>
          To get a forecast please select a dependent variable (The value which
          you want to be forecasted).
        </p>
        <div className="regression-analysis-wrapper">
          <FormControl>
            <RadioGroup
              // aria-labelledby='demo-controlled-radio-buttons-group'
              // name='controlled-radio-buttons-group'
              value={dependantField}
              onChange={handleDependentVarChange}
            >
              {numericFields?.map((dependent, index) => (
                <FormControlLabel
                  value={dependent.reference}
                  control={<Radio />}
                  label={dependent.reference}
                  key={index}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <div>
          <button
            className={`btn ${dependantField ? "" : "disabled"}`}
            variant="outlined"
            onClick={handleForecastEquation}
            style={{ margin: "0" }}
          >
            Forecast
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegressionAnalysisPopup;
