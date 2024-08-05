/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from 'axios';
import React, { useState } from 'react';
import Dropdown from '../../Utilities/Dropdown';

import { Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Button, TextField, OutlinedInput, FormHelperText } from '@mui/material';
import ClusteringTableComponent from './ClusteringTableComponent';
import AppliedFilters from '../../Utilities/AppliedFilters';

const Clustering = ({ fields, rows, stringFieldIndexes }) => {
    const [clusterFields, setClusterFields] = useState([])
    const [clusterData, setClusterData] = useState([])
    const [noOfClusters, setNoOfClusters] = useState([])
    const [inputError, setInputError] = useState('');
    const [clusterError, setClusterError] = useState(false);
    const [showClusterTable, setShowClusterTable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [error, setError] = useState(null)
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const dataBycolumn = new Array(fields?.length).fill(null).map(() => new Array())
    rows.map((row, index) => {

        row.map((s, newIdx) => {
            dataBycolumn[newIdx].push(s)
        })
    })
    const numericFields = fields.filter((field) => field.type !== "string")
    const headerName = fields.map(field =>
        field.reference
    )

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        if (isNaN(inputValue) || parseInt(inputValue) <= 2) {
            setInputError('The value should be a number greater than 2');
        } else {
            setInputError('');
            setNoOfClusters(inputValue);
        }
    };
    const sendDataToServerForClustering = () => {

        const dataSendToserver = {}
        dataSendToserver.clusterFields = []
        const ClusteringFieldsData = {}

        clusterFields.map((fieldChoseByuser) => {
            const fieldInx = headerName.indexOf(fieldChoseByuser)
            ClusteringFieldsData[fieldChoseByuser] = dataBycolumn[fieldInx]
        })
        dataSendToserver.clusterFields = ClusteringFieldsData
        dataSendToserver.clusterCount = noOfClusters
        stringFieldIndexes.forEach(({ index, name }) => {
            if (index >= 0 && index < dataBycolumn.length) {
                dataSendToserver.clusterFields[name] = dataSendToserver.clusterFields[name] || [];
                dataBycolumn[index].forEach(value => {
                    dataSendToserver.clusterFields[name].push(value);
                });
            }
        });

        // console.log(dataSendToserver)
        setIsLoading(true);
        axios({
            url: 'http://10.97.103.197:8000/cluster/',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify(dataSendToserver)
        }).then(({ data }) => {
            setClusterData(JSON.parse(data.Response))
            setIsLoading(false);
        }).catch(e => {
            console.error(e);
        }).finally(() => setIsLoading(false));
    }
    const handleUpdateTableBtn = () => {
        if (clusterFields.length < 2) {
            setClusterError(true);
            setShowClusterTable(false);

        } else {
            setShowClusterTable(true);
            setClusterError(false);
            sendDataToServerForClustering();
            setShowFilters(true);
        }
    }

    const handleClusteringVarChange = (e) => {

        // setClusterFields((prevFields) =>
        //     prevFields.includes(fieldReference)
        //         ? prevFields.filter((field) => field !== fieldReference)
        //         : [...prevFields, fieldReference]
        // );
        let value = e.target.value;
        setClusterFields(value)
    };
    const handleReset = () => {
        setClusterFields([]);
        setShowFilters(false);
    };
    const handleRemoveFilter = (index) => {
        const newFilter = clusterFields.filter((_, i) => i !== index);
        setClusterFields(newFilter);
    };

    return (
        <div className='clustering-wrapper'>

            <Box sx={{ minWidth: 120, maxWidth: '50vw', maxHeight: '50vh', overflow: 'auto', padding: 2 }}>

                {/* <FormControl sx={{ m: 1, width: 300 }} error={clusterError}>
                    <InputLabel id="clustering-variable-select-label">Data to cluster</InputLabel>
                    <Select
                        labelId="clustering-variable-select-label"
                        id="clustering-variable-select"
                        multiple
                        value={clusterFields}
                        input={<OutlinedInput label="Data to cluster" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >

                        {numericFields.map((field) => (
                            field.type !== "string" && (
                                <MenuItem key={field.reference} value={field.reference} onClick={() => handleClusteringVarChange(field.reference)} id="">
                                    <Checkbox checked={clusterFields.indexOf(field.reference) > -1} name={field.reference} onChange={handleClusteringVarChange} />
                                    <ListItemText primary={field.reference} />
                                </MenuItem>
                            )
                        ))}
                    </Select>
                    {clusterError && <FormHelperText>Please choose two or more data</FormHelperText>}
                </FormControl> */}
                <Dropdown
                    labelId="clustering-variable-select-label"
                    id="clustering-variable-select"
                    value={clusterFields}
                    label="Data to cluster"
                    onChange={handleClusteringVarChange}
                    options={numericFields.filter(field => field.type !== 'string')}
                    multiple
                    checkbox
                />

                <Box mt={2}>
                    <TextField
                        fullWidth
                        id="number-of-clusters"
                        label="Number of Clusters"
                        type="text"
                        value={noOfClusters}
                        onChange={handleInputChange}
                        error={Boolean(inputError)}
                        helperText={inputError}
                    />
                    {inputError && <FormHelperText></FormHelperText>}
                </Box>
                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                <Box mt={2}>
                    <Button
                        className={`btn ${(clusterFields.length === 0 || noOfClusters.length === 0) ? 'disabled' : ''}`}
                        variant="contained"
                        color="primary"
                        onClick={handleUpdateTableBtn}
                    >
                        Update table
                    </Button>
                </Box>
            </Box>
            {showFilters && (
                <AppliedFilters
                    variable2={clusterFields}
                    onReset={handleReset}
                />
            )}
            {showClusterTable && (
                !isLoading
                    ? <ClusteringTableComponent noOfClustersCount={noOfClusters} numericFieldColumn={numericFields} clusterData={clusterData} />
                    : <p>Loading...</p>
            )}


        </div>
    );
};

export default Clustering;