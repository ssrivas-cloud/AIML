import React, { useState } from "react";
import {
  FormGroup,
  Box,
  Typography,
  FormControlLabel,
  Switch,
} from "@mui/material";

const BooleanFilter = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <FormGroup>
        <Box display="flex" alignItems="center">
          <Typography variant="body1">No</Typography>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                color="primary"
              />
            }
            label=""
            labelPlacement="start"
          />
          <Typography variant="body1">Yes</Typography>
        </Box>
      </FormGroup>
    </>
  );
};

export default BooleanFilter;
