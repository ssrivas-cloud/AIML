/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Eda from './Eda/Eda';
import Dropdown from '../Utilities/Dropdown';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Drawer, Button, Box } from '@mui/material';
import TabularReport from '../Components/TabularReport/TabularReport'
import AppliedFilters from '../Utilities/AppliedFilters';
import RightPanel from './RightPanel/RightPanel';

const VisualizationQueryComponent = () => {
  const [queryResults, setQueryResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryExecutedSuccessfully, setIsQueryExecutedSuccessfully] = useState(false);
  const [stringFieldIndexes, setStringFieldIndexes] = useState([])
  const [tabValue, setTabValue] = React.useState(0);
  const [filterColumn, setFilterColumn] = useState([]);
  const [originalData, setOriginalData] = useState();
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const selectedVisualization = useSelector((state) => state.visualization.selectedVisualization);
  const fieldsOfSelectedVisualization = useSelector((state) => state.visualization.fieldsOfSelectedVisualization);
  const updatedColumns = useSelector((state) => state.visualization.updatedColumns);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const tabs = ['Linear regression', 'Cluster', 'Analysis'];
  const dataBycolumn = new Array(queryResults?.dataset?.fields?.length).fill(null).map(() => new Array())
  const headerName = []
  const removeBlankSpaces = (reference) => {
    if (reference === null) {
      return reference;
    }
    return reference.replace(/ /g, '');
  };

  console.log(updatedColumns)
  useEffect(() => {
    const executeQuery = () => {
      return axios({
        url: '/jasperserver-pro/rest_v2/queryExecutions',
        method: 'post',
        headers: {
          'Content-Type': 'application/execution.multiLevelQuery+json',
          'Accept': 'application/flatData+json'
        },
        data: fieldsOfSelectedVisualization.query ? fieldsOfSelectedVisualization : {
          query: {
            select: {
              fieldsOfSelectedVisualization
            }
          },
          dataSource: {
            reference: {
              uri: selectedVisualization.uri
            }
          }
        }
      }).then(({ data }) => (data));
    };


    setIsLoading(true);
    executeQuery()
      .then(response => {
        if (!response.dataset.fields || !response.dataset.rows) {
          // we cannot use this visualization to predict or show data.
          setIsQueryExecutedSuccessfully(false);
        } else {
          setIsQueryExecutedSuccessfully(true);
          setQueryResults(response);
          setOriginalData(response)
        }
        const getStringColumns = response.dataset.fields.reduce((acc, field, index) => {
          if (field.type === "string") {
            acc.push({ index, name: field.reference });
          }
          return acc;
        }, []);
        response.dataset.fields.filter((field) => field.type !== "string")


        setStringFieldIndexes(getStringColumns)
      })
      .catch(e => {
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
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleFilterColumn = (e) => {
    const { value } = e.target;
    const newFilterColumn = typeof value === 'string' ? value.split(',') : value;
    setFilterColumn(newFilterColumn);
    setQueryResults(prevState => {
      const columnIndexes = newFilterColumn.map(col => originalData.dataset.fields.findIndex(field => field.reference === col));
      const newRows = originalData.dataset.rows.map(row => columnIndexes.map(index => row[index]));
      const newFields = columnIndexes.map(index => originalData.dataset.fields[index]);
      return { ...prevState, dataset: { ...prevState.dataset, fields: newFields,
        rows: newRows  } }; 
    });
    setShowFilters(true);

  }
  const toggleRightPanel = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setRightPanelOpen(open);
  };
  const handleReset = () => {
    setFilterColumn([]);
    setQueryResults(originalData);
    setShowFilters(false);
  };
  const removeSingleFilter = (index) => {
    const newFilterColumn = filterColumn.filter((_, i) => i !== index);
    setFilterColumn(newFilterColumn);
    setQueryResults(prevState => {
      const columnIndexes = newFilterColumn.map(col => originalData.dataset.fields.findIndex(field => field.reference === col));
      const newRows = originalData.dataset.rows.map(row => columnIndexes.map(index => row[index]));
      const newFields = columnIndexes.map(index => originalData.dataset.fields[index]);
      return { ...prevState, dataset: { ...prevState.dataset, fields: newFields,
        rows: newRows  } }; 
    });
    setShowFilters(true);
  };
  return (

    <section className="container-fluid h-100 query-component">
      <div className="row h-100">
        <div className="col h-100">
          <div style={{ height: "95px" }} className='filter-dropdowns'>
            {!isLoading && isQueryExecutedSuccessfully &&
              <Box sx={{ width: '100%' }}>
                <Dropdown
                  labelId="filter-column"
                  id="filter-column"
                  value={filterColumn}
                  label="Filter column"
                  onChange={handleFilterColumn}
                  options={updatedColumns.elements}
                  multiple
                  checkbox
                />
                <Button variant="contained" color="primary" className='btn adv-filter' onClick={toggleRightPanel(true)}>
                  Advanced Filter
                </Button>
                <RightPanel onOpen={rightPanelOpen} handleEvent={toggleRightPanel(false)}/>
                {showFilters && (
                <AppliedFilters
                    variable2={filterColumn}
                    onReset={handleReset}
                    onRemoveVariable2={removeSingleFilter}
                />
            )}
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Workspace" {...a11yProps(0)} />
                    <Tab label="Analysis" {...a11yProps(1)} />
                  </Tabs>
                </Box>
            
                <CustomTabPanel value={tabValue} index={0} style={{ padding: "0" }} >
                  {/* <LinearRegression fields={queryResults.dataset.fields} rows={queryResults.dataset.rows} dataBycolumn={dataBycolumn} /> */}
                  <TabularReport fields={queryResults.dataset.fields} rows={queryResults.dataset.rows} dataBycolumn={dataBycolumn} />
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1} style={{ padding: "0" }}>
                  {/* <Clustering fields={queryResults.dataset.fields} rows={queryResults.dataset.rows} stringFieldIndexes={stringFieldIndexes} /> */}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                  <Eda dataset={queryResults.dataset} />
                </CustomTabPanel>


              </Box>

            }
           
          </div>
          {isLoading && <h2 className="text-center">Loading...</h2>}
          {!isLoading && !isQueryExecutedSuccessfully && <h4 className="text-center">Query does not return any data.</h4>}
        </div>
      </div>
    </section>

  );
};

export default VisualizationQueryComponent;