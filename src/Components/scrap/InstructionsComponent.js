/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import React from 'react';

const InstructionsComponent = ({ children }) => {
  return (
    <div className="col border">
      <h2>Instructions</h2>
      <ol>
        <li>Select any visualization from the table.</li>
        <li>Wait for the columns and the visualization to be loaded.</li>
        <li>Pick and choose which columns should be sent to perform further analysis.</li>
        <li>Click on 'Predict' button to start the analysis.</li>
      </ol>
    </div>
  );
};

export default InstructionsComponent;