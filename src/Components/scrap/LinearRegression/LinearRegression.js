/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from 'axios';
import React, { useState } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Box, FormControl, InputLabel, Select, MenuItem, ListItemText, OutlinedInput, TableContainer, Paper } from '@mui/material';
import CardComponent from './CardComponent';
import AppliedFilters from '../../../Utilities/AppliedFilters';
import Dropdown from '../../../Utilities/Dropdown';
const LinearRegression = ({ fields, rows, dataBycolumn }) => {

    const [dependantField, setDependantField] = useState('')
    const [independantFields, setIndependantFields] = useState([])
    const [updateRow, setUpdateRow] = useState(false)
    const [regressionResult, setRegressionResult] = useState('')
    const [showFilters, setShowFilters] = useState(false);

    const numericFields = fields.filter((field) => field.type !== "string")
    const headerName = []
    // Data to server in linear regression
    const sendDataToServerForLinearRegression = () => {
        const dataSendToserver = {}

        // calculate dependant field data
        const dependantFieldIndex = headerName.indexOf(dependantField)
        dataSendToserver.dependentField = { [dependantField]: dataBycolumn[dependantFieldIndex] }

        // calculate independant field data
        const independentFieldsData = {}
        independantFields.map((fieldChoseByuser) => {
            const fieldInx = headerName.indexOf(fieldChoseByuser)
            independentFieldsData[fieldChoseByuser] = dataBycolumn[fieldInx]
        })
        dataSendToserver.independentFields = independentFieldsData


        // console.log(dataSendToserver)
        axios({
            url: 'http://10.97.103.197:8000/regression/',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: JSON.stringify(dataSendToserver)
        }).then(({ data }) => {
            const parsedData = JSON.parse(data.Response);
            setUpdateRow(true);
            setRegressionResult(parsedData.predictions);
            // console.log('regression data => ', data.Response);
        }).catch(e => {
            console.error(e);
        });
    }

    const handleLinearRegressionBtnClick = () => {
        if (independantFields.length === 0 || !dependantField) {
        } else {
            sendDataToServerForLinearRegression()
            setShowFilters(true);
        }
    };

    const handleDependentVarChange = (event) => {
        // console.log(event)
        setUpdateRow(false);

        setDependantField(event.target.value)
    }
    const handleIndependantVarChange = (e) => {
        let value = e.target.value;
        setUpdateRow(false);

        // setIndependantFields((prevFields) => {
        //     // Check if the value is already in the state
        //     if (prevFields.includes(value)) {
        //         // If it is, remove it
        //         return prevFields.filter((field) => field !== value);
        //     } else {
        //         // If it isn't, add it
        //         return [...prevFields, value];
        //     }
        // });
        setIndependantFields(value);
    }
    const removeBlankSpaces = (reference) => {
        if (reference === null) {
            return reference;
        }
        return reference.replace(/ /g, '');
    };
    const handleReset = () => {
        setDependantField('');
        setIndependantFields([]);
        setShowFilters(false);
    };
    return (
        <div className='linear-regression-wrapper'>
            <Box sx={{ minWidth: 120, maxHeight: '50vh', padding: 2 }}>
                {/* <FormControl sx={{ minWidth: 200, m: 1 }}>
                    <InputLabel id="dependent-select-label">Dependent-variable</InputLabel>
                    <Select
                        labelId="dependent-select-label"
                        id="dependent-select"
                        value={dependantField}
                        label="Dependent-variable"
                        onChange={handleDependentVarChange}
                    >

                        {numericFields.map((field,index) => (
                            field.type !== "string" && <MenuItem key={index} disabled={independantFields.indexOf(field.reference) > -1} value={field.reference} label={field.reference}>{field.reference}</MenuItem>
                        ))}

                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="independent-variable-select-label">Independent-variable</InputLabel>
                    <Select
                        labelId="independent-variable-select-label"
                        id="independent-variable-select"
                        multiple
                        value={independantFields}
                        input={<OutlinedInput label="Independent-variable" />}
                        renderValue={(selected) => selected.join(', ')}
                    // MenuProps={MenuProps}
                    >
                        {numericFields.map((field) => (
                            field.type !== "string" && (
                                <MenuItem key={field.reference} value={field.reference} onClick={() => handleIndependantVarChange(field.reference)} disabled={field.reference === dependantField}>
                                    <Checkbox checked={independantFields.indexOf(field.reference) > -1} name={field.reference} onChange={handleIndependantVarChange} />
                                    <ListItemText primary={field.reference} />
                                </MenuItem>
                            )
                        ))}

                    </Select>
                </FormControl> */}
                <Dropdown
                    labelId="dependent-select-label"
                    id="dependent-select"
                    value={dependantField}
                    label="Dependent-variable"
                    onChange={handleDependentVarChange}
                    options={numericFields}
                    disabledOptions={independantFields}
                />
                <Dropdown
                    labelId="independent-variable-select-label"
                    id="independent-variable-select"
                    value={independantFields}
                    label="Independent-variable"
                    onChange={handleIndependantVarChange}
                    options={numericFields}
                    multiple
                    checkbox
                    disabledOptions={[dependantField]}
                />
                <button
                    type="button"
                    className={`btn linear-graph-btn ${(independantFields.length === 0 || !dependantField) ? 'disabled' : ''}`}
                    onClick={handleLinearRegressionBtnClick}
                >
                    Show graph
                </button>
                {(independantFields.length === 0 || !dependantField) && (
                    <p style={{ color: 'red', marginTop: '5px' }}>Please choose atleast one dependent and one independent variable</p>
                )}
                {showFilters && (
                    <AppliedFilters
                        variable1={dependantField}
                        variable2={independantFields}
                        onReset={handleReset}
                    />
                )}
                <TableContainer component={Paper} className='linear-regression-table'>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {fields.map(field => {
                                    headerName.push(field.reference)
                                    return (
                                        <TableCell key={field.reference} scope="col">
                                            {removeBlankSpaces(field.reference)}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {updateRow && <TableRow>
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

                            }

                            {rows.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        {row.map((s, newIdx) => {
                                            dataBycolumn[newIdx].push(s)
                                            return (
                                                <TableCell key={newIdx * 9500}>{removeBlankSpaces(s)}</TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

        </div>
    );
};

export default LinearRegression;