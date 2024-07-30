/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFieldsOfSelectedVisualization, setUpdatedColumns } from '../Features/visualizationSlice';
import 'react18-json-view/src/style.css';

function VisualizationColumnsComponent() {
  const dispatch = useDispatch();
  const selectedVisualization = useSelector((state) => state.visualization.selectedVisualization);
  const updatedColumns = useSelector((state) => state.visualization.updatedColumns);
  const fetchVisualizationsColumns = async () => {
    const request = await axios({
      url: `/jasperserver-pro/rest_v2/contexts`,
      method: 'post',
      headers: {
        'Content-Type': 'application/repository.resourceLookup+json',
        'Accept': 'application/repository.resourceLookup.metadata+json'
      },
      data: JSON.stringify({
        uri: selectedVisualization.uri
      })
    }
    );
    return request.data;
  };

  const getResourceData = async () => {
    const request = await axios({
      url: `/jasperserver-pro/rest_v2/resources${selectedVisualization.uri}?expanded=true`,
      method: 'GET',

      headers: {
        'Accept': 'application/repository.reportUnit+json'
      }
    }
    );
    return request.data;
  };

  const checkWhetherItIsADhocBased = (resourceData) => {
    if (resourceData.dataSource.advDataSource?.component?.components?.[0]?.componentType === 'table') {
      return {
        "dataSource": {
          "reference": {
            "uri": resourceData.dataSource.advDataSource.uri
          }
        },
        "query": resourceData.dataSource.advDataSource.query.multiLevel
      }

    }
    if (resourceData.dataSource.advDataSource?.component?.components?.[0]?.componentType === 'crosstab') {
      return {
        "dataSource": {
          "reference": {
            "uri": resourceData.dataSource.advDataSource.uri
          }
        },
        "query": resourceData.dataSource.advDataSource.query.multiAxis
      }

    }
    if (resourceData.dataSource.advDataSource?.component?.components?.[0]?.componentType === 'chart') {
      return {
        "dataSource": {
          "reference": {
            "uri": resourceData.dataSource.advDataSource.uri
          }
        },
        "query": resourceData.dataSource.advDataSource.query.multiAxis
      }

    }
    return null;
  }

  useEffect(() => {
    onPredict()
  }, [updatedColumns])

  function setResultsForJsonEditor(result) {

    if (result.elements.length === 0 || result.elements[0].group) {

      getResourceData().then((resourceData) => {
        const adhocQueryData = checkWhetherItIsADhocBased(resourceData);
        if (adhocQueryData) {
      dispatch(setUpdatedColumns(adhocQueryData))
        }
      })
    } else {
      dispatch(setUpdatedColumns(result))
    }
  }

  useEffect(() => {
    fetchVisualizationsColumns()
      .then((result) => {
        setResultsForJsonEditor(result);
      })
      .catch(e => {
        console.error(e);
      })
      .finally(() => {
      });
  }, [selectedVisualization]);


  const onPredict = () => {
    if (updatedColumns.elements) {
      const fields = updatedColumns.elements.map(({ element }) => {
        return { field: element.name};
      });
      const query = {
        query: {
          select: {
            fields
          }
        },
        dataSource: {
          reference: {
            uri: selectedVisualization.uri
          }
        }
      }
      // before predicting, we will to execute the query to get the data:
      dispatch(setFieldsOfSelectedVisualization(query))
    } else if (updatedColumns.query) {
      dispatch(setFieldsOfSelectedVisualization(updatedColumns))

    }
    return;
  };

  return (
    <></>
  );
}

export default VisualizationColumnsComponent;