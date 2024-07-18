/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import { useEffect } from 'react';

const VisualizationComponent = ({ visualizationSelected }) => {

  useEffect(() => {

    
    window.visualize({
      auth: {
        name: 'superuser',
        password: 'superuser'
      }
    }, function (v) {
      if (visualizationSelected.resourceType === 'reportUnit') {
        // render report from provided resource
        v.report({
          container: '#container',
          resource: visualizationSelected.uri,
          error: handleError,
          success: () => {
            console.log("report data in viz ", window.pageComponentsMetaData)
          }
        });
      } 
      // else if (visualizationSelected.resourceType === 'adhocDataView') {
      //   v.adhocView({
      //     container: '#container',
      //     resource: visualizationSelected.uri,
      //     error: handleError
      //   });
      // } else {
      //   // dashboard
      //   v.dashboard({
      //     error: handleError,
      //     resource: visualizationSelected.uri
      //   });
      // }

      //show error
      function handleError(err) {
        alert(err.message);
      }

    });

  }, [ visualizationSelected ]);

  return (
    <div id="container"
         className="h-100 w-100"></div>
  );
};

export default VisualizationComponent;