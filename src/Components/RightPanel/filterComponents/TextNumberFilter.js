import React, { useState } from "react";
import { TextField } from "@mui/material";

const TextNumberFilter = ({ type, value, handleChange }) => {
  const [newValue, setNewValue] = useState(value); // Initialize state for the input value

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    setNewValue(newValue); // Update local state
    handleChange(newValue); // Notify parent component of the change
  };

  return (
    <>
      <TextField
        id="outlined-basic"
        label={type == "number" ? "Number" : "Text"}
        variant="outlined"
        type={type} // Restricts input to numbers
        value={newValue}
        onChange={handleInputChange}
        InputProps={{
          inputProps: { min: 0 }, // Restrict input to positive numbers
        }}
      />
    </>
  );
};

export default TextNumberFilter;
