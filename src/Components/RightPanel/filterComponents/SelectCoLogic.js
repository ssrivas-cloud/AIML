import React, { useState, useEffect, useCallback } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectCoLogic = ({ name, handleChange, data, CoLogic, disabled }) => {
  const [value, setValue] = useState(CoLogic); // Initialize state for the input value

  // Update local state when CoLogic prop changes
  useEffect(() => {
    setValue(CoLogic);
  }, [CoLogic]);

  const handleInputChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      setValue(newValue); // Update local state
      handleChange(newValue); // Notify parent component of the change
    },
    [handleChange]
  );
  return (
    <div className="filter-box">
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <InputLabel id="demo-select-small-label">{name}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label={name}
          onChange={handleInputChange}
          disabled={disabled}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {data?.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCoLogic;
