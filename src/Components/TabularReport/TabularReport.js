/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import React, { useEffect, useState } from "react";
import { setGlobalDataset } from "../../Features/globalDatasetSlice";
import { useDispatch, useSelector } from "react-redux";
import { setChatOpen } from "../../Features/chatOpenSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
  Paper
} from "@mui/material";
import Chatbot from "../Chatbot/Chatbot";
import RegressionAnalysisPopup from "../Forecast/RegressionAnalysisPopup";
import Forecast from "../Forecast/Forecast";

const TabularReport = ({
  fields,
  rows,
  dataBycolumn,
  anomalies,
  queryResults,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const { chatOpen } = useSelector((state) => state.chatOpen);
  const { forecastOpen } = useSelector((state) => state.forecastOpen);
  const dispatch = useDispatch();
  const anomalyValues = {};
  const headerName = [];

  for (let key in anomalies) {
    anomalyValues[key] = anomalies[key].map((anomaly) => anomaly[key]);
  }

  const numericFields = fields.filter((field) => field.type !== "string");

  const removeBlankSpaces = (reference) => {
    if (reference === null) {
      return reference;
    }
    return reference.replace(/ /g, "");
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
    dispatch(setChatOpen(false));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const isAnomaly = (row) => {
    return row.some((cell, index) => {
      const key = fields[index].reference;
      return (
        anomalyValues[key] &&
        anomalyValues[key].includes(Number(cell) || cell.toString())
      );
    });
  };
  const isAnomalyCell = (cell, index) => {
    const key = fields[index].reference;
    return (
      anomalyValues[key] &&
      anomalyValues[key].includes(Number(cell) || cell.toString())
    );
  };
  useEffect(() => {
    dispatch(setGlobalDataset({ headerNames: headerName, dataRows: rows }));
  }, [dispatch, headerName, rows]);

  return (
    <div className="tabular-report-wrapper">
      <Box sx={{ minWidth: 120, maxHeight: "50vh" }}>
        {forecastOpen ? (
          <Forecast queryResults={queryResults} numericFields={numericFields} />
        ) : (
          <TableContainer component={Paper} className="tabular-report-table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {fields.map((field) => {
                    headerName.push(field.reference);
                    return (
                      <TableCell key={field.reference} scope="col">
                        {removeBlankSpaces(field.reference)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  const isRowAnomaly = isAnomaly(row);
                  return (
                    <TableRow key={index}>
                      {row.map((s, newIdx) => {
                        dataBycolumn[newIdx].push(s);
                        return (
                          <TableCell
                            key={newIdx * 9500}
                            style={{
                              backgroundColor: isRowAnomaly
                                ? "#FEFACC"
                                : "inherit",
                              fontWeight: isAnomalyCell(s, newIdx)
                                ? "bold"
                                : "normal",
                              color: isAnomalyCell(s, newIdx)
                                ? "#7A1106"
                                : "#61676B",
                            }}
                          >
                            {removeBlankSpaces(s)}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {chatOpen ? <Chatbot /> : ""}

        <div className="regression-btn">
          <button
            className={`btn ${
              chatOpen & !openDialog
                ? "inactive"
                : !chatOpen & openDialog
                ? "adv-filter"
                : ""
            }`}
            variant="contained"
            onClick={() => dispatch(setChatOpen(true))}
          >
            Ask questions
          </button>
          {forecastOpen ? (
            ""
          ) : (
            <button
              className={`btn ${openDialog ? "" : "adv-filter"}`}
              variant="outlined"
              onClick={handleOpenDialog}
            >
              Forecast
            </button>
          )}
        </div>
      </Box>

      <RegressionAnalysisPopup
        fields={fields}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        dataBycolumn={dataBycolumn}
      />
    </div>
  );
};

export default TabularReport;
