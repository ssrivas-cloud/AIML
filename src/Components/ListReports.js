import React, { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchReportList } from "../Features/reportListSlice";
import { setSelectedVisualization } from "../Features/visualizationSlice";
import { setChatOpen } from "../Features/chatOpenSlice";
import { fetchBackendDataFromApi } from "../Utilities/backendApi";
import { setForecastOpen } from "../Features/forecastOpenSlice";
import { setGlobalDependent } from "../Features/dependentSlice";

const ListReports = () => {
  const dispatch = useDispatch();
  const { reportList, loading, error } = useSelector(
    (state) => state.reportList
  );
  const selectedVisualization = useSelector(
    (state) => state.visualization.selectedVisualization
  );
  useEffect(() => {
    dispatch(fetchReportList());
  }, [dispatch]);

  const handleChange = (event) => {
    dispatch(setSelectedVisualization(event.target.value));
    dispatch(setForecastOpen(false));

    // send delete request to the backend and handle response
    fetchBackendDataFromApi("DELETE", "/delete-questions-answers/")
      .then(() => {
        dispatch(setChatOpen(false));
      })
      .catch((error) => {
        console.error("Error deleting questions and answers:", error);
      });

    dispatch(setGlobalDependent(""));
  };
  return (
    <>
      <h1>Jaspersoft AI explorer</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <FormControl fullWidth>
        <InputLabel id="report-select-label">Report</InputLabel>
        <Select
          labelId="report-select-label"
          id="report-select"
          value={selectedVisualization}
          label="Report"
          onChange={handleChange}
        >
          {reportList.map((report) => (
            <MenuItem key={report.version} value={report}>
              {report.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ListReports;
