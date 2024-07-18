// /*
//  * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
//  * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
//  */
import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const ClusterChart = ({ isOpen, handleClose, xAxisColumn, yAxisColumn, noOfClustersCount, clusterColors, queryResults }) => {
  const [error, setError] = useState('');
  const [chartOptions, setChartOptions] = useState(null);

  // Sample data provided
  // const data = [
  //   ["malesales", "femalesales", "totalsales", "cluster"],
  //   [285011.92, 280226.21, 565238.13, 1],
  //   [6981.94, 7047.14, 14029.08, 0],
  //   [8517.05, 7938.38, 16455.43, 0],
  //   [20062.19, 18608.22, 38670.41, 2],
  //   [13816.06, 13932.47, 27748.53, 0],
  //   [3101.16, 3840.3, 6941.46, 0],
  //   [19910.19, 19864.15, 39774.34, 2],
  //   [1763.22, 1551.3, 3314.52, 0],
  //   [844.56, 655.55, 1500.11, 0],
  //   [1892.89, 1874.82, 3767.71, 0],
  //   [18485.85, 19081.6, 37567.45, 2],
  //   [12726.54, 12592.39, 25318.93, 0],
  //   [4845.08, 4355.68, 9200.76, 0],
  //   [28038.98, 27168.52, 55207.5, 2],
  //   [16752.13, 15819.73, 32571.86, 0],
  //   [30728.4, 29741.49, 60469.89, 2],
  //   [1872.29, 1797.6, 3669.89, 0],
  //   [4473.68, 4583.08, 9056.76, 0],
  //   [41179.03, 41069.39, 82248.42, 2],
  //   [1713.59, 2095.55, 3809.14, 0],
  //   [34489.37, 33120.45, 67609.82, 2],
  //   [7119.75, 7430.3, 14550.05, 0],
  //   [5697.97, 6058.1, 11756.07, 0]
  // ];
  const data = queryResults

  useEffect(() => {
    if (noOfClustersCount < 1) {
      setError('Number of clusters must be at least 1');
      setChartOptions(null);
      return;
    }

    const columns = data[0];
    const rows = data.slice(1);
    // Find indexes of selected columns
    const xAxisIndex = columns.indexOf(xAxisColumn);
    const yAxisIndex = columns.indexOf(yAxisColumn);
    const clusterIndex = columns.indexOf("cluster"); // Assuming 'cluster' column name

    if (xAxisIndex === -1 || yAxisIndex === -1 || clusterIndex === -1) {
      setError('Invalid column selection');
      setChartOptions(null);
      return;
    }

    const points = rows.map(row => ({
      x: row[xAxisIndex],
      y: row[yAxisIndex],
      cluster: row[clusterIndex] // Assuming cluster is always at the last index
    }));

    const series = [];
    for (let i = 0; i < noOfClustersCount; i++) {
      series.push({
        name: `Cluster ${i}`,
        color: clusterColors[i % Object.keys(clusterColors).length], // Cycle through available colors
        data: points.filter(point => point.cluster === i).map(point => ({
          x: point.x,
          y: point.y
        }))
      });
    }

    setChartOptions({
      chart: {
        type: 'scatter',
        zoomType: 'xy'
      },
      title: {
        text: `Scatter Plot of ${yAxisColumn} vs ${xAxisColumn}`
      },
      xAxis: {
        title: {
          text: xAxisColumn
        }
      },
      yAxis: {
        title: {
          text: yAxisColumn
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        scatter: {
          marker: {
            symbol: 'circle', // Marker symbol for points
            radius: 5 // Adjust marker size as needed
          },
          states: {
            hover: {
              marker: {
                enabled: true
              }
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: `${xAxisColumn}: {point.x}, ${yAxisColumn}: {point.y}`
          }
        }
      },
      series: series
    });

    setError('');
  }, [isOpen, xAxisColumn, yAxisColumn, noOfClustersCount]);

  return (
    // <Modal
    //   open={isOpen}
    //   onClose={handleClose}
    //   aria-labelledby="graph-modal-title"
    //   aria-describedby="graph-modal-description"
    // >
      <Paper
        sx={{
          width: "100%",
          p: 4,
          backgroundColor:"#F2F2F3",
          borderRadius:0
        }}
      >
        {/* <Typography variant="h6" id="graph-modal-title" gutterBottom>
          Clustering Chart
        </Typography> */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {chartOptions && (
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        )}
      </Paper>
    // </Modal>
  );
};

export default ClusterChart;

