import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Checkbox, ListItemText, FormHelperText } from '@mui/material';
const Dropdown = ({
  labelId,
  id,
  value,
  label,
  onChange,
  options,
  multiple = false,
  renderValue = (selected) => selected.join(', '),
  error = false,
  helperText = '',
  MenuProps = {},
  disabledOptions = [],
  checkbox = false,
  fullWidth = false,
  minWidth = 200,
  m = 1
}) => {
  // console.log(options)
  return (
    <FormControl sx={{ minWidth, m }} error={error} fullWidth={fullWidth}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={multiple ? value || [] : value || ''}
        label={label}
        onChange={onChange}
        multiple={multiple}
        input={<OutlinedInput label={label} />}
        renderValue={multiple ? renderValue : undefined}
        MenuProps={MenuProps}
      >
        {
          labelId == 'filter-column' ? options.map((option, index) => (
            <MenuItem key={index} value={option.element.name} >
              {checkbox && multiple ? <Checkbox checked={value.includes(option.element.name)} /> : null}
              <ListItemText primary={option.element.name} />
            </MenuItem>
          )) : options.map((option, index) => (
            <MenuItem key={index} value={option.reference} disabled={disabledOptions.some(opt => opt === option.reference)}>
              {checkbox && multiple ? <Checkbox checked={value.includes(option.reference)} /> : null}
              <ListItemText primary={option.reference} />
            </MenuItem>
          ))
        }

      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Dropdown;
