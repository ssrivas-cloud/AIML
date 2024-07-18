/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */
import axios from 'axios';
import React, { useEffect, useState } from 'react';


function ListVisualizations({ onVisualizationSelected, visualizationSelected }) {

  const [ visualizations, setVisualizations ] = useState([]);

  const filterVisualizationsOnly = (resources) => {
    // const visualizationTypes = [ 'dashboard', 'reportUnit', 'adhocDataView' ];
    const visualizationTypes = [ 'reportUnit' ];
    return resources.filter(({ resourceType }) => visualizationTypes.includes(resourceType));
  };

  const getVisualizationType = (resourceType) => {
    switch (resourceType) {
      case 'dashboard':
        return 'Dashboard';
      case 'reportUnit':
        return 'Report';
      case 'adhocDataView':
        return 'Ad Hoc View';
      default:
        return 'Unknown';
    }

  };

  useEffect(() => {

    const loginSuperUser = async () => {
      return axios({
        url: '/jasperserver-pro/rest_v2/login?j_username=superuser&j_password=superuser',
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    const fetchVisualizations = async () => {
      await loginSuperUser();
      const request = await axios({
          url: `/jasperserver-pro/rest_v2/resources?offset=0&limit=100&folderUri=/AI_ML`,
          method: 'get',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
  
          },
          withCredentials: true
        }
      );
      return request.data;
    };

    fetchVisualizations().then(({ resourceLookup }) =>
                           setVisualizations(filterVisualizationsOnly(resourceLookup)))
                         .catch(e => console.error(e));

  }, []);

  const onClickVisualization = (visualization) => {
    onVisualizationSelected(visualization);
  };

  return (
    <>
    <h3>Reports List</h3>
    <table className="table table-sm table-bordered">
      <thead className="sticky-top">
      <tr>
        <th scope="col">Name</th>
        {/* <th scope="col">URI</th> */}
        <th scope="col">Type</th>
      </tr>
      </thead>
      <tbody>
      {visualizations.map((visualization, index) => (
        <tr key={visualization.uri}
            className={`clickable ${visualizationSelected && visualization.uri === visualizationSelected.uri ? 'table-active' : ''}`}
            onClick={() => onClickVisualization(visualization)}>
          <th scope="row">{visualization.label}</th>
          {/* <td>{visualization.uri}</td> */}
          <td>{getVisualizationType(visualization.resourceType)}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </>
  );
}

export default ListVisualizations;