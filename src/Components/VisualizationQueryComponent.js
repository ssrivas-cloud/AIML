/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button, Box } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText } from '@mui/material';

import TabularReport from "../Components/TabularReport/TabularReport";
import AppliedFilters from "../Utilities/AppliedFilters";
import RightPanel from "./RightPanel/RightPanel";

const VisualizationQueryComponent = () => {
  const [queryResults, setQueryResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryExecutedSuccessfully, setIsQueryExecutedSuccessfully] =
    useState(false);
  const [stringFieldIndexes, setStringFieldIndexes] = useState([]);
  const [tabValue, setTabValue] = React.useState(0);
  const [originalData, setOriginalData] = useState();
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [currentSelection, setCurrentSelection] = useState([]);
  const [edaData, setEdaData] = useState([]);
  const [panelContent, setPanelContent] = useState('');
  const [anomalies, setAnomalies] = useState({});
  const [isAnomalyLoaded, setIsAnomalyLoaded] = useState(false);
  const selectedVisualization = useSelector(
    (state) => state.visualization.selectedVisualization
  );
  const fieldsOfSelectedVisualization = useSelector(
    (state) => state.visualization.fieldsOfSelectedVisualization
  );
  const updatedColumns = useSelector(
    (state) => state.visualization.updatedColumns
  );
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const rawData = `{
    "description": {
        "totalsales": {
            "min": 1500.11,
            "max": 82248.42,
            "mean": 25626.93,
            "std": 24345.97,
            "CoV": 0.9500151602952972,
            "skewness": 0.9419126558254409,
            "kurtosis": -0.2733910610687649
        },
        "femalesales": {
            "min": 655.55,
            "max": 41069.39,
            "mean": 12728.54,
            "std": 12033.49,
            "CoV": 0.9453940188565296,
            "skewness": 0.9452071329960905,
            "kurtosis": -0.23562620455397232
        },
        "malesales": {
            "min": 844.56,
            "max": 41179.03,
            "mean": 12898.39,
            "std": 12317.2,
            "CoV": 0.954940836275107,
            "skewness": 0.9386902696152647,
            "kurtosis": -0.3079468797642151
        }
    },
    "description_with_outliers": {
        "totalsales": {
            "min": -386870.41,
            "max": 565238.13,
            "mean": 48040.67,
            "std": 166773.89,
            "CoV": 3.471514628341921,
            "skewness": 1.0458034272980499,
            "kurtosis": 4.69730985486024
        },
        "femalesales": {
            "min": 655.55,
            "max": 280226.21,
            "mean": 24367.5,
            "std": 56911.99,
            "CoV": 2.3355698547058807,
            "skewness": 4.197142417608651,
            "kurtosis": 16.422419613950428
        },
        "malesales": {
            "min": 844.56,
            "max": 285011.92,
            "mean": 24783.65,
            "std": 57904.97,
            "CoV": 2.336418711262063,
            "skewness": 4.192140142176316,
            "kurtosis": 16.39435286124076
        }
    },
    "analysis": {
        "totalsales": [
            "totalsales has a mean of 25626.93, with a standard deviation of 24345.97",
            "The CoV for totalsales is 0.95, indicating substantial variability",
            "The Skewness for totalsales is 0.94, indicating moderately positively skewed",
            "The Kurtosis for totalsales is -0.27, indicating Moderately platykurtic (flatter distribution)"
        ],
        "femalesales": [
            "femalesales has a mean of 12728.54, with a standard deviation of 12033.49",
            "The CoV for femalesales is 0.95, indicating substantial variability",
            "The Skewness for femalesales is 0.95, indicating moderately positively skewed",
            "The Kurtosis for femalesales is -0.24, indicating Moderately platykurtic (flatter distribution)"
        ],
        "malesales": [
            "malesales has a mean of 12898.39, with a standard deviation of 12317.2",
            "The CoV for malesales is 0.95, indicating substantial variability",
            "The Skewness for malesales is 0.94, indicating moderately positively skewed",
            "The Kurtosis for malesales is -0.31, indicating Moderately platykurtic (flatter distribution)"
        ]
    },
    "anomaly": {
        "totalsales": [
            {
                "productdep": "All",
                "totalsales": 565238.13,
                "femalesales": 280226.21,
                "malesales": 285011.92
            },
            {
                "productdep": "Alcoholic Beverages",
                "totalsales": 414029.08,
                "femalesales": 7047.14,
                "malesales": 6981.94
            },
            {
                "productdep": "Baking Goods",
                "totalsales": -386870.41,
                "femalesales": 18608.22,
                "malesales": 20062.19
            }
        ],
        "femalesales": [
            {
                "productdep": "All",
                "totalsales": 565238.13,
                "femalesales": 280226.21,
                "malesales": 285011.92
            }
        ],
        "malesales": [
            {
                "productdep": "All",
                "totalsales": 565238.13,
                "femalesales": 280226.21,
                "malesales": 285011.92
            }
        ]
    }
}`;
const parsedData  = JSON.parse(rawData)
// const anomalies = parsedData.anomaly;
  // const tabs = ['Linear regression', 'Cluster', 'Analysis'];
  const dataBycolumn = new Array(queryResults?.dataset?.fields?.length)
    .fill(null)
    .map(() => new Array());
  const headerName = [];
  const removeBlankSpaces = (reference) => {
    if (reference === null) {
      return reference;
    }
    return reference.replace(/ /g, "");
  };
  const sendDataToEDA = () => {
    axios({
      url: 'http://10.97.103.197:8000/eda/',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      data: JSON.stringify({
        fields: queryResults?.dataset?.fields?.map(field => field.reference),
        rows: queryResults?.dataset?.rows
      })
    }).then(({ data }) => {
        if(data.Response.Message){
          setAnomalies(data.Response.Message)
        } else {
          setAnomalies(JSON.parse(data.Response))
        }
        setIsAnomalyLoaded(true)
    }).catch(e => {
        console.log(e)
    });
    // const parsedData = JSON.parse(rawData.Response);
    // setEdaData(rawData.Response);
  }
  useEffect(() => {
    if(queryResults){
      sendDataToEDA();
    }
  }, [queryResults]);
  useEffect(() => {
    const executeQuery = async () => {
      const { data } = await axios({
        url: "/jasperserver-pro/rest_v2/queryExecutions",
        method: "post",
        headers: {
          "Content-Type": "application/execution.multiLevelQuery+json",
          Accept: "application/flatData+json",
        },
        data: fieldsOfSelectedVisualization.query
          ? fieldsOfSelectedVisualization
          : {
            query: {
              select: {
                fieldsOfSelectedVisualization,
              },
            },
            dataSource: {
              reference: {
                uri: selectedVisualization.uri,
              },
            },
          },
      });
      return data;
    };
  
    setIsLoading(true);
    executeQuery()
      .then((response) => {
        if (!response.dataset.fields || !response.dataset.rows) {
          // we cannot use this visualization to predict or show data.
          setIsQueryExecutedSuccessfully(false);
        } else {
          setIsQueryExecutedSuccessfully(true);
          setQueryResults(response);
          setOriginalData(response);
        
        }
        const getStringColumns = response.dataset.fields.reduce(
          (acc, field, index) => {
            if (field.type === "string") {
              acc.push({ index, name: field.reference });
            }
            return acc;
          },
          []
        );
        response.dataset.fields.filter((field) => field.type !== "string");

        setStringFieldIndexes(getStringColumns);
      })
      .catch((e) => {
        setIsQueryExecutedSuccessfully(false);
        console.error(e);
      })
      .finally(() => setIsLoading(false));
  }, [fieldsOfSelectedVisualization, selectedVisualization]);

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleFilterColumn = (e) => {
    const { value } = e.target;
    const newSelection = typeof value === "string" ? value.split(",") : value;
    setCurrentSelection(newSelection);
  };
  const applyFilterColumn = () => {
    setQueryResults((prevState) => {
      const columnIndexes = currentSelection.map((col) =>
        originalData.dataset.fields.findIndex((field) => field.reference === col)
      );
      const newRows = originalData.dataset.rows.map((row) =>
        columnIndexes.map((index) => row[index])
      );
      const newFields = columnIndexes.map(
        (index) => originalData.dataset.fields[index]
      );
      return {
        ...prevState,
        dataset: { ...prevState.dataset, fields: newFields, rows: newRows },
      };
    });
    setShowFilters(true);
  };
  const cancelFilterColumn = () => {
    setCurrentSelection([...currentSelection]);
  };

  const toggleRightPanel = (open, content = null ) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setRightPanelOpen(open);
    setPanelContent(content);

  };
  const handleReset = () => {
    setCurrentSelection([]);
    setQueryResults(originalData);
    setShowFilters(false);
  };
  const removeSingleFilter = (index) => {
    const newFilterColumn = currentSelection.filter((_, i) => i !== index);
    setCurrentSelection(newFilterColumn);
    setQueryResults((prevState) => {
      const columnIndexes = newFilterColumn.map((col) =>
        originalData.dataset.fields.findIndex(
          (field) => field.reference === col
        )
      );
      const newRows = originalData.dataset.rows.map((row) =>
        columnIndexes.map((index) => row[index])
      );
      const newFields = columnIndexes.map(
        (index) => originalData.dataset.fields[index]
      );
      return {
        ...prevState,
        dataset: { ...prevState.dataset, fields: newFields, rows: newRows },
      };
    });
    setShowFilters(true);
  };
  return (
    <section className="container-fluid h-100 query-component">
      <div className="row h-100">
        <div className="col h-100">
          <div style={{ height: "95px" }} className="filter-dropdowns">
            {!isLoading && isAnomalyLoaded && isQueryExecutedSuccessfully && (
              <Box sx={{ width: "100%" }}>

                <FormControl sx={{ minWidth: 200, m: 1 }}>
                  <InputLabel id="filter-column">Select column</InputLabel>
                  <Select
                    labelId="filter-column"
                    id="filter-column"
                    value={currentSelection}
                    label="Select column"
                    multiple
                    onChange={handleFilterColumn}
                    input={<OutlinedInput label="Select column" />}
                    renderValue={(selected) => selected.join(', ')}
                  >
                    {
                      originalData.dataset.fields.map((option, index) => (
                        <MenuItem key={index} value={option.reference} >
                          <Checkbox checked={currentSelection.includes(option.reference)} />
                          <ListItemText primary={option.reference} />
                        </MenuItem>
                      ))
                    }
                    {<div className='apply-btn-wrapper'>
                      <button className='btn' onClick={applyFilterColumn}>Apply</button>
                      <button className='btn' onClick={cancelFilterColumn}>Cancel</button>
                    </div>}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  className="btn adv-filter"
                  onClick={toggleRightPanel(true, "advFilter")}
                >
                  Advanced Filter
                </Button>
                { isAnomalyLoaded && <Button
                  variant="contained"
                  color="primary"
                  className="btn anomaly-btn"
                  onClick={toggleRightPanel(true, "anomalies")}
                >
                  View all anomalies ({ Object.keys(anomalies.anomaly).length})
                </Button>
                }
              
                <RightPanel
                  onOpen={rightPanelOpen}
                  handleEvent={toggleRightPanel(false)}
                  content={panelContent}
                />
                {showFilters && (
                  <AppliedFilters
                    variable2={currentSelection}
                    onReset={handleReset}
                    onRemoveVariable2={removeSingleFilter}
                  />
                )}

             <TabularReport
                  fields={queryResults.dataset.fields}
                  rows={queryResults.dataset.rows}
                  dataBycolumn={dataBycolumn}
                  anomalies = {anomalies.anomaly}
                />
                {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                  >
                    <Tab label="Workspace" {...a11yProps(0)} />
                    <Tab label="Analysis" {...a11yProps(1)} />
                  </Tabs>
                </Box>

                <CustomTabPanel
                  value={tabValue}
                  index={0}
                  style={{ padding: "0" }}
                >
                  <TabularReport
                    fields={queryResults.dataset.fields}
                    rows={queryResults.dataset.rows}
                    dataBycolumn={dataBycolumn}
                  />
                </CustomTabPanel>
                <CustomTabPanel
                  value={tabValue}
                  index={1}
                  style={{ padding: "0" }}
                >
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                  <Eda dataset={queryResults.dataset} />
                </CustomTabPanel> */}
              </Box>
            )}
          </div>
          {!isAnomalyLoaded && <h2 className="text-center">Loading...</h2>}
          {!isLoading && !isQueryExecutedSuccessfully && (
            <h4 className="text-center">Query does not return any data.</h4>
          )}
        </div>
      </div>
    </section>
  );
};

export default VisualizationQueryComponent;
