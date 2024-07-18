/*
* Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
* Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
*/

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Modal, Typography, TextField, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const TabularChart = (data) => {

  const description = data?.edaData?.description
  const correlation_matrix = data?.edaData?.correlation_matrix
  const analysis = data?.edaData?.analysis
  const anomaly = data?.edaData?.anomaly
  const message = data?.edaData?.message;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const handleModalOpen = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  }
  const handleModalClose = () => setIsModalOpen(false);

  const filteredAnalysis = analysis ? Object.keys(analysis).filter((key) => key.toLowerCase().includes(searchQuery.toLowerCase())) : [];
  return (
    <>
      <div className="row h-100">
        <div className="col h-100">
          {description && correlation_matrix && analysis && (<section className="container-fluid h-100 eda-wrapper" style={{ scroll: "auto", overflow: "auto" }}>
            <div className='anomaly'>
              <h4 style={{ marginBottom: "16px", marginTop: "10px" }}>Anomalies</h4>
              <div>
                {Object.keys(anomaly).map((key) => (
                  <ul key={key}>
                    <h6>{key}</h6>
                    {anomaly[key].map((paragraph, index) => (
                      <li key={index}>{paragraph}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div className='summary'>
              <h4 style={{ marginBottom: "16px", marginTop: "10px", display: "inline" }}>Summary</h4>
              <a href="#" className='modal-btn' onClick={(e) => handleModalOpen(e)}>
                View All
              </a>
              <div>
                {Object.keys(analysis).map((key) => (
                  <ul key={key}>
                    <h6>{key}</h6>
                    {analysis[key].map((paragraph, index) => (
                      <li key={index}>{paragraph}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ marginBottom: "16px", marginTop: "10px" }}>Descriptive Statistics</h4>

              {/* Descriotion in tabular format */}
              <Table >
                <TableHead>
                  <TableRow className="colored-row stickyColumn">
                    <TableCell className="bordered-cell"></TableCell>
                    <TableCell className="bordered-cell" align="left">Min</TableCell>
                    <TableCell className="bordered-cell" align="left">Max</TableCell>
                    <TableCell className="bordered-cell" align="left">Mean</TableCell>
                    <TableCell className="bordered-cell" align="left">Standard Deviation</TableCell>
                    <TableCell className="bordered-cell" align="left">Coefficient of Variance (CoV)</TableCell>
                    <TableCell className="bordered-cell" align="left">Skewness</TableCell>
                    <TableCell className="bordered-cell" align="left">kurtosis</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(description).map(([columnName, analysis]) => (
                    <TableRow
                      key={columnName}
                    >
                      <TableCell className="bordered-cell stickyColumn">
                        {columnName}
                      </TableCell>
                      <TableCell className="bordered-cell" align="left">{analysis.min}</TableCell>
                      <TableCell className="bordered-cell" align="left">{analysis.max}</TableCell>
                      <TableCell className="bordered-cell" align="left">{analysis.mean}</TableCell>
                      <TableCell className="bordered-cell" align="left">{analysis.std}</TableCell>
                      <TableCell className="bordered-cell" align="left">{analysis.CoV}</TableCell>
                      <TableCell className="bordered-cell" align="left">{analysis.skewness}</TableCell>
                      <TableCell className="bordered-cell" align="left">{analysis.kurtosis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              {/* Correlation Matrix Table format*/}
              <h4 style={{ marginBottom: "16px", marginTop: "10px" }}>Correlation Matrix</h4>
              <Table>
                <TableHead>
                  <TableRow className="colored-row">
                    <TableCell className="bordered-cell" align="left"></TableCell>
                    {Object.entries(correlation_matrix).map(([columnName], index) => (
                      <TableCell className="bordered-cell stickyColumn" align="left" key={'correlation' + index}>{columnName}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(correlation_matrix).map(([key, value]) => (
                    <TableRow
                      key={key}

                    >
                      <TableCell className="bordered-cell" align="left">{key}</TableCell>
                      {Object.entries(value).map(([key1, value1]) => <TableCell className="bordered-cell" align="left" key={key1}>{value1}</TableCell>)}
                    </TableRow>
                  ))}

                </TableBody>
              </Table>
            </div>
          </section>
          )
          }
          {/* {!data.eda && !message &&  <div className="text-center mt-4">No data for EDA.</div>} */}
          {message && <div className="text-center mt-4">{message}</div>}
        </div>
      </div>
      {/* Modal for Summary */}
      <Modal open={isModalOpen} onClose={handleModalClose} aria-labelledby="summary-modal-title" aria-describedby="summary-modal-description">
        <div className='modal-wrapper'>

          <Typography id="summary-modal-title" variant="h6" component="h2">
            Summary
            <IconButton onClick={handleModalClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Typography>
          <div style={{ position: 'relative', margin: '20px 0' }}>
            <TextField
              fullWidth
              placeholder="Search by Variable"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="outlined"
              margin="normal"
            />
              <img className='search-icon' src="/assets/magnifying-glass.png" alt="search icon"/>

            {/* <SearchIcon style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }} /> */}
          </div>
          <div>
            {filteredAnalysis.map((key) => (
              <ul key={key}>
                <h6>{key}</h6>
                {analysis[key].map((paragraph, index) => (
                  <li key={index}>{paragraph}</li>
                ))}
              </ul>
            ))}
          </div>
          
        <Button
          className='btn close-btn'
          variant="contained"
          color="primary"
          onClick={handleModalClose}
        >
          Close
        </Button >

        </div>

      </Modal>
    </>
  );
};

export default TabularChart;


