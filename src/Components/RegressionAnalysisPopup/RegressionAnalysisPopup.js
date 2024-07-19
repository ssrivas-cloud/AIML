/*
 * Copyright © 2005-2024. Cloud Software Group, Inc. All rights reserved. Confidential & Proprietary.
 * Licensed pursuant to commercial Cloud Software Group, Inc End User License Agreement.
 */

import axios from 'axios';
import React, { useState } from 'react';
import Dropdown from '../../Utilities/Dropdown';
import {  Box } from '@mui/material';
const RegressionAnalysisPopup = ({numericFields}) => {

    const [dependantField, setDependantField] = useState('')
    const [independantFields, setIndependantFields] = useState([])
    const [updateRow, setUpdateRow] = useState(false)
    // const [regressionResult, setRegressionResult] = useState('')
    // const [showFilters, setShowFilters] = useState(false);
    
    const handleDependentVarChange = (event) => {
        setUpdateRow(false);
        setDependantField(event.target.value)
    }
    const handleIndependantVarChange = (e) => {
        let value = e.target.value;
        setUpdateRow(false);
        setIndependantFields(value);
    }
    return (
        <div className='regression-analysis-wrapper'>
            <Box sx={{ minWidth: 120, maxHeight: '50vh', padding: 2 }}>
                <Dropdown
                    labelId="dependent-select-label"
                    id="dependent-select"
                    value={dependantField}
                    label="Dependent-variable"
                    onChange={handleDependentVarChange}
                    options={numericFields}
                    disabledOptions={independantFields}
                />
                <Dropdown
                    labelId="independent-variable-select-label"
                    id="independent-variable-select"
                    value={independantFields}
                    label="Independent-variable"
                    onChange={handleIndependantVarChange}
                    options={numericFields}
                    multiple
                    checkbox
                    disabledOptions={[dependantField]}
                />
            </Box>

        </div>

    );
};

export default RegressionAnalysisPopup;