/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { setGlobalDataset } from "../../Features/globalDatasetSlice";
import { useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  TableContainer,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import CardComponent from "../LinearRegression/CardComponent";
import AppliedFilters from "../../Utilities/AppliedFilters";
import Dropdown from "../../Utilities/Dropdown";
import Chatbot from "../Chatbot/Chatbot";
import RegressionAnalysisPopup from "../RegressionAnalysisPopup/RegressionAnalysisPopup";
import { fetchBackendDataFromApi } from "../../Utilities/backendApi";

const TabularReport = ({ fields, rows, dataBycolumn }) => {
  const [updateRow, setUpdateRow] = useState(false);
  const [regressionResult, setRegressionResult] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const dispatch = useDispatch();

  const numericFields = fields.filter((field) => field.type !== "string");
  const headerName = [];

  const removeBlankSpaces = (reference) => {
    if (reference === null) {
      return reference;
    }
    return reference.replace(/ /g, "");
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setChatOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChatBot = () => {
    setChatOpen(true);
  };

  useEffect(() => {
    dispatch(
      setGlobalDataset({ "column Names": headerName, "data Rows": rows })
    );
  }, [dispatch, headerName, rows]);

  return (
    <div className="tabular-report-wrapper">
      <Box sx={{ minWidth: 120, maxHeight: "50vh", padding: 2 }}>
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
              {/* {updateRow && <TableRow>
                                {fields.map(field => {
                                    if (independantFields?.includes(field.reference)) {
                                        const matchingData = regressionResult.filter(result => result.X_axis === field.reference);
                                        return (
                                            <TableCell key={field.reference} scope="col">
                                                <CardComponent linearRegressionResult={matchingData} />
                                            </TableCell>
                                        );
                                    }
                                    return (
                                        <TableCell></TableCell>
                                    )
                                })}
                            </TableRow>

                            } */}

              {rows.map((row, index) => {
                return (
                  <TableRow key={index}>
                    {row.map((s, newIdx) => {
                      dataBycolumn[newIdx].push(s);
                      return (
                        <TableCell key={newIdx * 9500}>
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

        {chatOpen ? (
          <Chatbot setChatOpen={setChatOpen} chatOpen={chatOpen} />
        ) : (
          ""
        )}

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
            onClick={handleChatBot}
          >
            Ask questions
          </button>
          <button
            className={`btn ${openDialog ? "" : "adv-filter"}`}
            variant="outlined"
            onClick={handleOpenDialog}
          >
            Forecast
          </button>
        </div>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="regression-analysis-dialog-title"
        className="regression-dialog"
      >
        <DialogTitle id="regression-analysis-dialog-title">
          Run regression analysis
        </DialogTitle>

        <p>
          To run the regression analysis please select a dependent and
          independent variable.
        </p>
        <DialogContent>
          <RegressionAnalysisPopup numericFields={numericFields} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TabularReport;
