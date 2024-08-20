import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";

import SelectCoLogic from "./SelectCoLogic";
import Condition from "./Condition";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import convertDataTypes from "../../../Utilities/convertDataTypes";

const FilterComponent = ({
  filter,
  data,
  filtersCompo,
  availableColumns,
  handleConditionsUpdate,
  handleConditionsUpdateForNewColumn,
  handleDeleteFilter,
}) => {
  const [filterColumn, setFilterColumn] = useState(filter.columnName || null);
  const [selectedColumnData, setSelectedColumnData] = useState(null);
  const [disabledColumns, setDisabledColumns] = useState(() =>
    filter.columnConditions.length > 0 ? true : false
  );
  const [columnConditions, setColumnConditions] = useState(() => {
    if (filterColumn) {
      if (filter.columnConditions && filter.columnConditions.length > 0) {
        return filter.columnConditions;
      } else {
        return [
          {
            id: uuidv4(),
            filterColumn: filterColumn,
            selectedLogic: null,
            textValue: null,
            firstInteger: null,
            secondInteger: null,
            booleanValue: null,
          },
        ];
      }
    }
    return [];
  });
  const [columnIndex, setColumnIndex] = useState(null);

  useEffect(() => {
    if (filterColumn !== null) {
      const columnIndex = data.headerNames.indexOf(filterColumn);
      setColumnIndex(columnIndex);
      if (columnIndex !== -1) {
        const sampleValue = convertDataTypes(data.dataRows[0][columnIndex]);
        setSelectedColumnData(sampleValue);

        // Reinitialize columnConditions when filterColumn changes
        if (filter.columnConditions && filter.columnConditions.length > 0) {
          setColumnConditions(filter.columnConditions);
        } else {
          const newConditions = [
            {
              id: uuidv4(),
              filterColumn: filterColumn,
              selectedLogic: null,
              textValue: null,
              firstInteger: null,
              secondInteger: null,
              booleanValue: null,
            },
          ];
          setColumnConditions(newConditions);
          handleConditionsUpdateForNewColumn(
            filter.id,
            filterColumn,
            columnIndex,
            sampleValue,
            newConditions
          );
        }
      }
    }
  }, [
    filterColumn,
    data,
    filter.columnConditions,
    filter.id,
    handleConditionsUpdateForNewColumn,
  ]);

  const handleConditionChange = useCallback(
    (id, key, value) => {
      const updatedConditions = columnConditions.map((con) =>
        con.id === id ? { ...con, [key]: value } : con
      );
      handleConditionsUpdate(filter.id, updatedConditions);
    },
    [columnConditions, handleConditionsUpdate, filter.id]
  );

  const addCondition = useCallback(() => {
    if (filterColumn !== null) {
      handleConditionsUpdate(filter.id, [
        ...columnConditions,
        {
          id: uuidv4(),
          filterColumn: filterColumn,
          selectedLogic: null,
          textValue: null,
          firstInteger: null,
          secondInteger: null,
          booleanValue: null,
        },
      ]);

      setDisabledColumns(true);
    }
  }, [filterColumn, columnConditions, handleConditionsUpdate, filter.id]);

  const deleteCondition = useCallback(
    (id) => {
      handleConditionsUpdate(
        filter.id,
        columnConditions.filter((colCon) => colCon.id !== id)
      );
    },
    [columnConditions, handleConditionsUpdate, filter.id]
  );

  const deleteColumnConditions = useCallback(() => {
    handleDeleteFilter(filter.id);
  }, [handleDeleteFilter, filter.id]);

  const handleColumnChange = useCallback(
    (value) => {
      const sampleValue = convertDataTypes(data.dataRows[0][columnIndex]);
      setFilterColumn(value);
      setColumnConditions([]);
      handleConditionsUpdateForNewColumn(
        filter.id,
        value,
        columnIndex,
        sampleValue,
        []
      );
    },
    [columnIndex, data.dataRows, filter.id, handleConditionsUpdateForNewColumn]
  );

  return (
    <>
      <div className="filter-component">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SelectCoLogic
            name="Select Column"
            handleChange={handleColumnChange}
            data={availableColumns}
            CoLogic={filter.columnName || filterColumn}
            disabled={disabledColumns}
          />
          <div>
            {filtersCompo.length > 1 ||
            filtersCompo[0].columnConditions.length > 0 ? (
              <IconButton
                onClick={deleteColumnConditions}
                sx={{ color: "red" }}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
            ) : null}
          </div>
        </div>
        {filterColumn &&
          columnConditions.map((condition) => (
            <Condition
              key={condition.id}
              condition={condition}
              selectedColumnData={selectedColumnData}
              data={data}
              handleChange={handleConditionChange}
              handleRemove={() => deleteCondition(condition.id)}
            />
          ))}

        <Button variant="text" onClick={addCondition} sx={{ fontSize: "16px" }}>
          + Add condition
        </Button>
      </div>
    </>
  );
};

export default FilterComponent;
