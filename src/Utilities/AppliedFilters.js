import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
const AppliedFilters = ({
  variable1,
  variable2,
  onReset,
  onRemoveVariable1,
  onRemoveVariable2,
}) => {
  return (
    <div className="applied-filters">
      <h6>Applied variable</h6>
      <button onClick={onReset}>Reset all</button>
      <div className="chips">
        {variable1 && (
          <div className="chip">
            {variable1}
            <IconButton size="small" onClick={() => onRemoveVariable1()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        )}
        {variable2 &&
          variable2.map((field, index) => (
            <div key={index} className="chip">
              {field}
              <IconButton size="small" onClick={() => onRemoveVariable2(index)}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AppliedFilters;
