/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table,TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import ClusterChart from './ClusterChart';

const ClusteringTableComponent = ({ noOfClustersCount, numericFieldColumn, clusterData }) => {
    const queryResults = clusterData;
    const [isLoading, setIsLoading] = useState(false);
    const [xAxisColumn, setXAxisColumn] = useState('');
    const [yAxisColumn, setYAxisColumn] = useState('');
    const [xOptions, setXOptions] = useState([]);
    const [yOptions, setYOptions] = useState([]);
    const [clusterColors, setClusterColors] = useState({});
    const [showGraph, setShowGraph] = useState(false);

    const removeBlankSpaces = (reference) => {
        if (reference === null || reference === undefined) {
            return reference;
        }
        return reference.toString().replace(/ /g, '');
    };
    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const hue = (i * 360 / numColors) % 360;
            colors.push(`hsl(${hue}, 100%, 75%)`);
        }
        return colors;
    };
    useEffect(() => {
        if (!queryResults || queryResults.length === 0) {
            setXOptions([]);
            setYOptions([]);
            return;
        }
        const numericReferences = numericFieldColumn.map(field => field.reference);
        const options = queryResults[0].filter(header => header !== 'cluster' && numericReferences.includes(header));
        setXOptions(options.filter((header) => header !== yAxisColumn));
        setYOptions(options.filter((header) => header !== xAxisColumn));
    }, [queryResults, xAxisColumn, yAxisColumn]);

    useEffect(() => {
        // Generate colors for clusters
        if (queryResults && queryResults.length > 0) {
            const clusters = [...new Set(queryResults.slice(1).map(row => row[row.length - 1]))];
            const colors = generateColors(clusters.length);
            const clusterColorMap = clusters.reduce((acc, cluster, index) => {
                acc[cluster] = colors[index];
                return acc;
            }, {});
            setClusterColors(clusterColorMap);

        }
    }, [])
    const handleXAxisChange = (e) => {
        const selectedX = e.target.value;
        if (selectedX !== yAxisColumn) {
            setXAxisColumn(selectedX);
        }
    };

    const handleYAxisChange = (e) => {
        const selectedY = e.target.value;
        if (selectedY !== xAxisColumn) {
            setYAxisColumn(selectedY);
        }
    };

    const checkClusterGraph = () => {
        if (xAxisColumn && yAxisColumn) {
            setShowGraph(true); // Open the graph modal
        } else {
            // setError('Please select both X-axis and Y-axis.');
        }
    };

    const handleCloseGraph = () => {
        setShowGraph(false);
    };
    return (
        <section className="cluster-table-wrapper">
            <div className="row h-100">
                <div className="col h-100">
                    <div>
                        <div style={{ marginBottom: '10px' }} className='axes-wrapper'>

                            <FormControl >
                                <InputLabel id="xaxis-select-label">X-axis</InputLabel>
                                <Select
                                    labelId="xaxis-select-label"
                                    id="xaxis-select"
                                    value={xAxisColumn}
                                    label="X-axis"
                                    onChange={handleXAxisChange}
                                >
                                    {xOptions.map((header) => (
                                        <MenuItem key={header} value={header}>{header}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>


                            <FormControl  >
                                <InputLabel id="yaxis-select-label">Y-axis</InputLabel>
                                <Select
                                    labelId="yaxis-select-label"
                                    id="yaxis-select"
                                    value={yAxisColumn}
                                    label="Y-axis"
                                    onChange={handleYAxisChange}
                                >
                                    {yOptions.map((header) => (
                                        <MenuItem key={header} value={header}>{header}</MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                            <button
                                type="button"
                                className="axes-graph-btn btn btn-grey btn-primary"
                                onClick={checkClusterGraph}
                                disabled={!xAxisColumn || !yAxisColumn}
                            >
                                View graph
                            </button>
                            {(!xAxisColumn || !yAxisColumn) && (
                                <p style={{ color: 'red', marginTop: '5px' }}>Please select both X-axis and Y-axis.</p>
                            )}
                         


                        </div>

                    </div>
                    {isLoading && <h2 className="text-center">Loading...</h2>}
                    {
                               showGraph && <ClusterChart
                                   
                                    handleClose={handleCloseGraph}
                                    xAxisColumn={xAxisColumn}
                                    yAxisColumn={yAxisColumn}
                                    queryResults={queryResults}
                                    noOfClustersCount={noOfClustersCount}
                                    clusterColors={clusterColors}
                                />
                            }
                    {!isLoading && <TableContainer component={Paper} className="table-wrapper">
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table table-sm table-bordered">
                            <TableHead className="sticky-top">
                                <TableRow>
                                    {queryResults[0].map((field, index) => (
                                        <TableCell style={{ backgroundColor: "#F2F2F3" }} key={index}>{field}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {queryResults.slice(1).map((row, index) => {
                                    const cluster = row[row.length - 1];
                                    const rowStyle = { backgroundColor: clusterColors[cluster], color: 'black' };
                                    return (
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            {row.map((cell, newIdx) => (
                                                <TableCell align="left" key={newIdx} style={rowStyle}>
                                                    {removeBlankSpaces(cell)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    );
                                })

                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    }
                </div>
            </div>
        </section>
    );
};

export default ClusteringTableComponent;