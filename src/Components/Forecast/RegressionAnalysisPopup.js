/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */
import axios from "axios";
import React, { useState } from "react";
import {
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
import { setForecastOpen } from "../../Features/forecastOpenSlice";
import { useDispatch } from "react-redux";
import { setRegressionOutput, setToolTipValue,setDependentValue, setOriginalDependentValue } from "../../Features/forecastRegressionSlice";
const RegressionAnalysisPopup = ({
  fields,
  openDialog,
  setOpenDialog,
  handleCloseDialog,
  dataBycolumn
}) => {
  const [dependentField, setDependantField] = useState("");
  const dispatch = useDispatch();
  const numericFields = fields?.filter((field) => field.type !== "string");
  const handleDependentVarChange = (event) => {
    setDependantField(event.target.value);
  };
  const sendDataToPredict = () => {
    const dataSendToserver = {}
    const independentFieldsData = {}
    // calculate dependant field data
    const dependentFieldIndex = fields.findIndex(obj => obj.reference === dependentField);
    dataSendToserver.dependentField = { [dependentField]: dataBycolumn[dependentFieldIndex] }

    numericFields.forEach((field, index) => {
      const independentFieldIndex = fields.findIndex(obj => obj.reference === field.reference);
      if (field.reference !== dependentField) {
        independentFieldsData[field.reference] = dataBycolumn[independentFieldIndex];
      }
    });
    dataSendToserver.independentFields = independentFieldsData


    console.log(dataSendToserver)
    axios({
      url: 'http://10.118.29.163:8000/regression/',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: dataSendToserver
    }).then(({ data }) => {
      const parsedData = JSON.parse(data.Response);
      dispatch(setRegressionOutput(parsedData))
      const { intercept, coefficients } = parsedData;
      let formula = `Price = ${intercept.toFixed(2)}`;
      for (let key in coefficients) {
        formula += ` + ${coefficients[key].toFixed(2)} * ${key}`;
      }
      dispatch(setToolTipValue(formula))
      // console.log('regression data => ', data.Response);
    }).catch(e => {
      console.error(e);
    });
    // const output = '{"intercept": -6.2717298316973, "coefficients": {"malesales": 1.2624957864839115, "femalesales": 0.054596499453860414}}'
    // const parsedOutput = JSON.parse(output);
    // dispatch(setRegressionOutput(parsedOutput))
    // const { intercept, coefficients } = parsedOutput;
    // let formula = `Price = ${intercept.toFixed(2)}`;
    // for (let key in coefficients) {
    //   formula += ` + ${coefficients[key].toFixed(2)} * ${key}`;
    // }
    // dispatch(setToolTipValue(formula))
  };
  const handleForecastEquation = () => {
    dispatch(setDependentValue(dependentField));
    dispatch(setOriginalDependentValue(dependentField));

    dispatch(setForecastOpen(true));
    setOpenDialog(false);
    setDependantField("");
    sendDataToPredict();
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
              aria-labelledby='demo-controlled-radio-buttons-group'
              name='controlled-radio-buttons-group'
              value={dependentField}
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
            className={`btn ${dependentField ? "" : "disabled"}`}
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
