import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Switch,
  Paper,
  IconButton
} from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { useSelector, useDispatch } from "react-redux";
import {
  setEnablePredict,
  setPredictClicked,
  setRunTimePredictClick
} from "../../Features/forecastRegressionSlice";

const TableForecast = ({ queryResults, numericFields }) => {
  const [inputValues, setInputValues] = useState({});
  const [tableRows, setTableRows] = useState([]);
  const [predictValue, setPredictValue] = useState('-');
  const { dependent } = useSelector((state) => state.dependent);
  const dispatch = useDispatch();
  const forecastFields = queryResults.dataset.fields.filter(item => item.reference !== dependent && item.type !== 'string');
  const predictClicked = useSelector((state) => state.forecastRegression.predictClicked);
  const runTimePredictClick = useSelector((state) => state.forecastRegression.runTimePredictClick);

  const formulaData = useSelector((state) => state.forecastRegression.regressionOutput);

  useEffect(() => {
    const allFilled = forecastFields.every(field => {
      const value = inputValues[field.reference];
      return value !== undefined && value !== '' && !isNaN(value);

    });
    dispatch(setEnablePredict(allFilled));

  }, [inputValues]);

  useEffect(() => {
    if (predictClicked) {
      const predictedValue = calculatePredictedValue(inputValues);

      setTableRows(prevRows => [...prevRows, { ...inputValues, predictedValue }]);
      setInputValues({});
      dispatch(setEnablePredict(false));
      dispatch(setPredictClicked(false));
      setPredictValue('-');
      dispatch(setRunTimePredictClick(false));

    } else if (runTimePredictClick) {
      const predictedValue = calculatePredictedValue(inputValues);

      setPredictValue(predictedValue);
      
    }
  }, [predictClicked, runTimePredictClick]);

  const calculatePredictedValue = (inputValues) => {
    const { intercept, coefficients } = formulaData;
    let predictedValue = intercept;
    for (let key in coefficients) {
      predictedValue += coefficients[key] * inputValues[key];
    }
    return predictedValue.toFixed(2);
  };

  const renderInputField = (item) => {
    const handleInputChange = (e) => {
      const value = e.target.value;
      const reference = item.reference;
      setInputValues(prevValues => ({
        ...prevValues,
        [reference]: value
      }));
    };
    switch (item.type) {
      case 'string':
        const fieldIndex = queryResults.dataset.fields.indexOf(item.reference);
        if (fieldIndex !== -1) {
          const options = queryResults.dataset.rows.map(row => row[fieldIndex]);
          return (
            <Select>
              {options.map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
            </Select>
          );
        }
      case 'integer':
      case 'bigDecimal':
        return (
          <TextField type="number" value={inputValues[item.reference] || 0} onChange={handleInputChange} />
        );
      case 'date':
        return (
          <TextField type="date" value={inputValues[item.reference] || ''} onChange={handleInputChange} />
        );
      case 'boolean':
        return (
          <Switch checked={Boolean(inputValues[item.reference])} onChange={handleInputChange} />
        );
      default:
        return null;
    }

  };
  const handleDeleteRow = (rowIndex) => {
    setTableRows(prevRows => prevRows.filter((_, index) => index !== rowIndex));
  };
  return (
    <Paper sx={{ minWidth: "70%", overflow: "hidden", paddingBottom: "74px" }}>
      <TableContainer sx={{ maxHeight: "100%" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>{dependent}</TableCell>
              {numericFields.map(
                (column, index) =>
                  column.reference !== dependent && (
                    <TableCell key={index} align="center">
                      {column.reference}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableHead>
          <TableBody>

            <TableRow>
              <TableCell>{predictValue}</TableCell>
              {forecastFields.map((item, index) => (
                <TableCell align="center" key={index}>{renderInputField(item)}</TableCell>
              ))}

            </TableRow>
            {tableRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>
                  <IconButton onClick={() => handleDeleteRow(rowIndex)} sx={{ color: 'red' }}>
                    <DeleteOutlineRoundedIcon />
                  </IconButton>
                  <span>{row.predictedValue}</span>
                </TableCell>
                {forecastFields.map((item, colIndex) => (
                  <TableCell align="center" key={colIndex}>{row[item.reference]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableForecast;
