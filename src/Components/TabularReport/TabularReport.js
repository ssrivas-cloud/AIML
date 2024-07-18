/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from 'axios';
import React, { useState } from 'react';
import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow, Box, FormControl, InputLabel, Select, MenuItem, ListItemText, OutlinedInput, TableContainer, Paper } from '@mui/material';
import CardComponent from '../LinearRegression/CardComponent';
import AppliedFilters from '../../Utilities/AppliedFilters';
import Dropdown from '../../Utilities/Dropdown';
const TabularReport = ({ fields, rows, dataBycolumn }) => {

    const [updateRow, setUpdateRow] = useState(false)
    const [regressionResult, setRegressionResult] = useState('')
    const [showFilters, setShowFilters] = useState(false);

    const numericFields = fields.filter((field) => field.type !== "string")
    const headerName = []

    const removeBlankSpaces = (reference) => {
        if (reference === null) {
            return reference;
        }
        return reference.replace(/ /g, '');
    };
    return (
        <div className='tabular-report-wrapper'>
            <Box sx={{ minWidth: 120, maxHeight: '50vh', padding: 2 }}>
           
                <TableContainer component={Paper} className='tabular-report-table'>
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

export default TabularReport;