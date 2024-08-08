import React from "react";
import { ReactComponent as DownloadPredict } from "../../assets/download-file.svg";
import { Box, Typography, Tooltip  } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TableForecast from "./TableForecast";
import { useSelector, useDispatch } from "react-redux";
import { setAddToList, setPredictClick } from "../../Features/forecastRegressionSlice";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
const DependentPredict = ({ queryResults, numericFields }) => {
  const enablePredict = useSelector((state) => state.forecastRegression.enablePredict);
  const toolTipValue  = useSelector((state) => state.forecastRegression.toolTipValue);

  const dispatch = useDispatch();
  const handlePredictClick = () => {
    dispatch(setPredictClick(true));
  };
  const handleAddClick = () => {
    dispatch(setAddToList(true));
  };
  const handleDownloadPdf = () => {
    const input = document.getElementById("table-forecast");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("forecast-comparison.pdf");
    });
  }
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
            <Typography variant="h5">
              Forecast and comparison <DownloadPredict onClick={handleDownloadPdf} style={{cursor:"pointer"}}/>
            </Typography>
            <Typography variant="body2">
              Change the independent variable to forecast the prediction
            </Typography>
            <Tooltip title={toolTipValue || 'No formula available'} sx={{ fontSize: '2.25rem' }}>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#0076AD",
                  gap: "5px",
                  cursor: "pointer"
                }}
              >
                Formula <InfoOutlinedIcon fontSize="small" />
              </p>
            </Tooltip>
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <button
              className={`btn ${enablePredict ? "" : "disabled"}`}
              variant="outlined"
              onClick={handlePredictClick}
              disabled={!enablePredict}
            >
              Predict
            </button>
            <button
              className={`btn ${enablePredict ? "" : "disabled"}`}
              variant="outlined"
              onClick={handleAddClick}
              disabled={!enablePredict}
            >
              Add to list
            </button>
          </Box>
        </Box>

        <Box id="table-forecast">
          <TableForecast
            queryResults={queryResults}
            numericFields={numericFields}
          />
        </Box>
      </Box>
    </>
  );
};

export default DependentPredict;
