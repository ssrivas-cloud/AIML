/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */


import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';



const calDataForEachChart = (data) => {
  const testData = data.X_test.map((x, i) => [x, data.y_test[i]])
  const trainData = data.X_train.map((x, i) => [x, data.y_train[i]])
  
  const lineData = data.line

  return {testData, trainData, lineData}

}
const LinearRegressionChart = ({linearRegressionData: data}) => {

  return (
    <>
      <section className="container-fluid h-100" style={{ overflow: "auto"}}>
        <div className="row h-100">
            <div className="col h-100">
              {!data[0] && <div className="text-center mt-4">No Data for linear regression</div> }
                {data[0]?.map((d) => {
                  const {testData: testData1, trainData: trainData1, lineData: lineData1} = calDataForEachChart(d)
                  const chartOptions = {
                    chart: {
                      type: 'scatter',
                      zoomType: 'xy'
                    },
                    title: {
                      text: `Linear regression model ( ${d.y_axis} vs ${d.X_axis} )`
                    },
                    xAxis: { 
                      title: {
                        text: d.X_axis
                      }
                    },
                    yAxis: {
                      title: {
                        text: d.y_axis
                      }
                    },
                    series: [{
                      name: 'Testing Data',
                      color: '#2210a2',
                      data: testData1
                    }, {
                      name: 'Training Data',
                      color: '#f10505',
                      data: trainData1
                    },
                    {
                        name: 'Regression Line',
                        type: 'line',
                        data: lineData1,
                        marker: {
                          enabled: false
                        },
                        states: {
                          hover: {
                            lineWidth: 0
                        },
                        enableMouseTracking: false
                      }
                    }
                ]
                  };

                  return (
                      <HighchartsReact
                          highcharts={Highcharts}
                          options={chartOptions}
                      />
                  )
                })}                 
            </div>
        </div>
      </section>
    </>
  );
};

export default LinearRegressionChart;