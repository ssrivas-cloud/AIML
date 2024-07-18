/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TabularChart from './TabularChart';
const Eda = ({ dataset }) => {
  const rawData = {
    "Response": {
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
      "correlation_matrix": {
        "totalsales": {
          "totalsales": 1.0,
          "femalesales": 1.0,
          "malesales": 1.0
        },
        "femalesales": {
          "totalsales": 1.0,
          "femalesales": 1.0,
          "malesales": 1.0
        },
        "malesales": {
          "totalsales": 1.0,
          "femalesales": 1.0,
          "malesales": 1.0
        }
      },
      "analysis": {
        "totalsales": [
          "totalsales have a mean of 25626.93, with a standard deviation of 24345.97",
          "The CoV for totalsales is (0.9500151602952972), this indicates substantial variability",
          "The Skewness for totalsales is (0.9419126558254409), this indicates moderately positively skewed",
          "The Kurtosis for totalsales is (-0.2733910610687649), Moderately platykurtic (flatter distribution)"
        ],
        "femalesales": [
          "femalesales have a mean of 12728.54, with a standard deviation of 12033.49",
          "The CoV for femalesales is (0.9453940188565296), this indicates substantial variability",
          "The Skewness for femalesales is (0.9452071329960905), this indicates moderately positively skewed",
          "The Kurtosis for femalesales is (-0.23562620455397232), Moderately platykurtic (flatter distribution)"
        ],
        "malesales": [
          "malesales have a mean of 12898.39, with a standard deviation of 12317.2",
          "The CoV for malesales is (0.954940836275107), this indicates substantial variability",
          "The Skewness for malesales is (0.9386902696152647), this indicates moderately positively skewed",
          "The Kurtosis for malesales is (-0.3079468797642151), Moderately platykurtic (flatter distribution)"
        ],
        "Correlation": [
          "The correlation matrix shows perfect correlation (1.0) between femalesales and totalsales. This perfect correlation suggests that these variables move together perfectly.",
          "The correlation matrix shows perfect correlation (1.0) between malesales and totalsales. This perfect correlation suggests that these variables move together perfectly.",
          "The correlation matrix shows perfect correlation (1.0) between malesales and femalesales. This perfect correlation suggests that these variables move together perfectly."
        ]
      },
      "anomaly": {
        "totalsales": [
          "3 outliers found in totalsales, which have been removed. Below are the outliers found:",
          "            productdep  totalsales  femalesales  malesales\n0                  All   565238.13    280226.21  285011.92\n1  Alcoholic Beverages   414029.08      7047.14    6981.94\n3         Baking Goods  -386870.41     18608.22   20062.19"
        ],
        "femalesales": ["No outliers found in femalesales"],
        "malesales": ["No outliers found in malesales"]
      }
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [edaData, setEdaData] = useState([]);

  useEffect(() => {
    sendDataToEDA();

  }, [dataset])
  const sendDataToEDA = () => {
    // axios({
    //   url: 'http://10.97.103.197:8000/eda/',
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   data: JSON.stringify({
    //     fields: dataset?.fields?.map(field => field.reference),
    //     rows: dataset?.rows
    //   })
    // }).then(({ data }) => {
    //     if(data.Response.Message){
    //       setEdaData(data.Response.Message)
    //     } else {
    //       setEdaData(JSON.parse(data.Response))
    //     }
    setIsLoading(false)

    // }).catch(e => {
    //     console.log(e)
    // });
    // const parsedData = JSON.parse(rawData.Response);
    setEdaData(rawData.Response);
  }

  return (
    <>{isLoading ? <p>Loading...</p> : <TabularChart edaData={edaData} />}</>
  );
};

export default Eda;