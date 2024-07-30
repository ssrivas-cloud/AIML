/*
* Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
* Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
*/

import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Modal, Typography, TextField, IconButton, Button } from '@mui/material';

const Eda = ({ panelContent }) => {
  const description = panelContent?.description
  const description_with_outliers = panelContent?.description_with_outliers
  const correlation_matrix = panelContent?.correlation_matrix
  const analysis = panelContent?.analysis
  const anomaly = panelContent?.anomaly


  const isAnomaly = (key, value) => {
    return Object.keys(anomaly).some(anomalyKey =>
      anomaly[anomalyKey]?.some(anomaly => anomaly[key] === value)
    );
  };
  const buildAnomalyMap = () => {
    const anomalyMap = {};

    Object.keys(anomaly).forEach(key => {
      anomalyMap[key] = new Set();
      anomaly[key].forEach(item => {
        Object.keys(item).forEach(subKey => {
          if (key === subKey) {
            anomalyMap[subKey].add(item[subKey]);
          }
        });
      });
    });

    return anomalyMap;
  };

  const anomalyMap = buildAnomalyMap();
  const gatherAllData = () => {
    const allData = Object.values(anomaly).flat();
    const uniqueData = Array.from(new Set(allData.map(JSON.stringify))).map(JSON.parse);
    return uniqueData.map(item => {
      const newItem = { ...item };
      Object.keys(newItem).forEach(key => {
        if (anomalyMap[key] && anomalyMap[key].has(newItem[key])) {
          newItem[key] = `<b>${newItem[key]}</b>`;
        }
      });
      return newItem;
    });
  };
  const renderTableHeaders = () => {
    const uniqueData = gatherAllData();
    const keys = uniqueData.length > 0 ? Object.keys(uniqueData[0]) : [];
    return keys.map((key, index) => (
      <TableCell key={index}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</TableCell>
    ));
  };
  const renderTableData = () => {
    const uniqueData = gatherAllData();
    return uniqueData.map((item, index) => {
      return (
        <TableRow key={index}>
          {Object.keys(item).map((key, i) => (
            <TableCell key={i} className={isAnomaly(key, item[key]) ? 'anomaly' : ''} style={{ backgroundColor: "#FEFACC" }} dangerouslySetInnerHTML={{ __html: item[key] }}></TableCell>
          ))}
        </TableRow>
      );
    });
  }
  return (
    <>
      <div className='eda-wrapper'>
        <h4>Anomalies</h4>

        <Table>
          <TableHead>
            <TableRow>
              {renderTableHeaders()}
            </TableRow>
          </TableHead>
          <TableBody>
            {renderTableData()}
          </TableBody>
        </Table>
        <h4> Descriptive statistics</h4>
        <Table >
          <TableHead>
            <TableRow className="colored-row stickyColumn">
              <TableCell className="bordered-cell"></TableCell>
              <TableCell className="bordered-cell" align="center" colSpan={2}>Min</TableCell>
              <TableCell className="bordered-cell" align="center" colSpan={2}>Max</TableCell>
              <TableCell className="bordered-cell" align="center" colSpan={2}>Mean</TableCell>
              <TableCell className="bordered-cell" align="center" colSpan={2}>Standard Deviation</TableCell>
              <TableCell className="bordered-cell" align="center" colSpan={2}>Coefficient of Variance (CoV)</TableCell>
              <TableCell className="bordered-cell" align="center" colSpan={2}>Skewness</TableCell>
              <TableCell className="bordered-cell" align="center" colSpan={2}>kurtosis</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="bordered-cell"></TableCell>
              <TableCell className="bordered-cell" align="center">With anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">Without anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">With anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">Without anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">With anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">Without anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">With anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">Without anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">With anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">Without anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">With anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">Without anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">With anomalies</TableCell>
              <TableCell className="bordered-cell" align="center">Without anomalies</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {Object.keys(description).map(columnName => (
              <TableRow key={columnName}>
                <TableCell className="bordered-cell stickyColumn">{columnName}</TableCell>
                <TableCell className="bordered-cell" align="left">{description[columnName].min}</TableCell>
                <TableCell className="bordered-cell" align="left">{description_with_outliers[columnName]?.min}</TableCell>
                <TableCell className="bordered-cell" align="left">{description[columnName].max}</TableCell>
                <TableCell className="bordered-cell" align="left">{description_with_outliers[columnName]?.max}</TableCell>
                <TableCell className="bordered-cell" align="left">{description[columnName].mean}</TableCell>
                <TableCell className="bordered-cell" align="left">{description_with_outliers[columnName]?.mean}</TableCell>
                <TableCell className="bordered-cell" align="left">{description[columnName].std}</TableCell>
                <TableCell className="bordered-cell" align="left">{description_with_outliers[columnName]?.std}</TableCell>
                <TableCell className="bordered-cell" align="left">{description[columnName].CoV}</TableCell>
                <TableCell className="bordered-cell" align="left">{description_with_outliers[columnName]?.CoV}</TableCell>
                <TableCell className="bordered-cell" align="left">{description[columnName].skewness}</TableCell>
                <TableCell className="bordered-cell" align="left">{description_with_outliers[columnName]?.skewness}</TableCell>
                <TableCell className="bordered-cell" align="left">{description[columnName].kurtosis}</TableCell>
                <TableCell className="bordered-cell" align="left">{description_with_outliers[columnName]?.kurtosis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Eda;


