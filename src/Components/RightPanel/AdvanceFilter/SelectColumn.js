import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

const SelectColumn = () => {
  const { data } = useSelector((state) => state.globalDataset);
  const [selectColumn, setSelectColumn] = useState("");
  const handleChange = (event) => {
    setSelectColumn(event.target.value);
  };

  return (
    <div className="filter-box">
      <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
        <InputLabel id="demo-select-small-label">Select Column</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={selectColumn}
          label="Select Column"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {data.headerNames?.map((column, index) => (
            <MenuItem key={index} value={column}>
              {column}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectColumn;
