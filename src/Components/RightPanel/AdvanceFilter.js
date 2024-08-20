import { v4 as uuidv4 } from "uuid";
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import FilterComponent from "./filterComponents/FilterComponent";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { addColumnFilters } from "../../Features/advanceFilterSlice";

const AdvanceFilter = ({ handleClose }) => {
  const [applyFilter, setApplyFilter] = useState(false);
  const filtersEndRef = useRef(null);
  const [filtersCompo, setFiltersCompo] = useState([
    {
      id: uuidv4(),
      columnName: null,
      indexOfColumn: null,
      dataSample: null,
      dataTypeOfValue: null,
      dataSample: null,
      columnConditions: [],
    },
  ]); // Initialize with one filter component

  const { data } = useSelector((state) => state.globalDataset);
  const filtersFromStore = useSelector((state) => state.advanceFilters.filters);

  const dispatch = useDispatch();

  // track all selected columns
  const usedColumns = useMemo(() => {
    return new Set(
      filtersCompo.map((filter) => filter.columnName).filter(Boolean)
    );
  }, [filtersCompo]);

  // get available columns
  const getAvailableColumns = useCallback(
    (currentFilterID) => {
      const usedColumnsForCurrentFilter = new Set(
        filtersCompo
          .filter(
            (filter) => filter.id !== currentFilterID && filter.columnName
          )
          .map((filter) => filter.columnName)
      );

      return data.headerNames.filter(
        (header) => !usedColumnsForCurrentFilter.has(header)
      );
    },
    [filtersCompo, data.headerNames]
  );

  // Initialize filtersCompo from Redux store on component mount
  useEffect(() => {
    if (filtersFromStore && filtersFromStore.length > 0) {
      setFiltersCompo(filtersFromStore);
    } else {
      // Initialize with a default filter if no filters are in the store
      setFiltersCompo([
        {
          id: uuidv4(),
          columnName: null,
          indexOfColumn: null,
          dataSample: null,
          dataTypeOfValue: null,
          dataSample: null,
          columnConditions: [],
        },
      ]);
    }
  }, [filtersFromStore]);

  const handleAddFilter = useCallback(() => {
    setFiltersCompo((prevFiltersCompo) => [
      ...prevFiltersCompo,
      {
        id: uuidv4(),
        columnName: null,
        indexOfColumn: null,
        dataSample: null,
        dataTypeOfValue: null,
        dataSample: null,
        columnConditions: [],
      },
    ]); // Add a new filter component
  }, []);

  const handleConditionsUpdate = useCallback((filterID, updatedConditions) => {
    setFiltersCompo((prevFiltersCompo) =>
      prevFiltersCompo.map((filter) =>
        filter.id === filterID
          ? { ...filter, columnConditions: updatedConditions }
          : filter
      )
    );
  }, []);

  const handleConditionsUpdateForNewColumn = useCallback(
    (filterID, filterColumn, columnIndex, sampleValue, columnConditions) => {
      setFiltersCompo((prevFiltersCompo) =>
        prevFiltersCompo.map((filter) =>
          filter.id === filterID
            ? {
                ...filter,
                columnName: filterColumn,
                indexOfColumn: columnIndex,
                dataSample: sampleValue,
                dataTypeOfValue: typeof sampleValue,
                columnConditions: columnConditions,
              }
            : filter
        )
      );
    },
    []
  );

  const handleDeleteFilter = useCallback((filterID) => {
    // Update the state to remove the filter with the specified filterID
    setFiltersCompo((prevFiltersCompo) =>
      prevFiltersCompo.length > 1
        ? prevFiltersCompo.filter((filter) => filter.id !== filterID)
        : [
            {
              id: uuidv4(),
              columnName: null,
              indexOfColumn: null,
              dataSample: null,
              dataTypeOfValue: null,
              dataSample: null,
              columnConditions: [],
            },
          ]
    );
  }, []);

  const handleAddFiltersToTable = useCallback(() => {
    dispatch(addColumnFilters(filtersCompo));
    handleClose();
  }, [filtersCompo, dispatch]);

  useEffect(() => {
    if (filtersEndRef.current) {
      filtersEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [filtersCompo]);

  return (
    <div className="advance-filter">
      <h4>Advance Filter</h4>
      <Box className="filter-list">
        {filtersCompo?.map((filter, index) => (
          <FilterComponent
            key={filter.id}
            data={data}
            filterID={filter.id}
            filter={filter}
            filtersCompo={filtersCompo}
            availableColumns={getAvailableColumns(filter.id)}
            columnConditions={filter.columnConditions}
            handleConditionsUpdate={handleConditionsUpdate}
            handleConditionsUpdateForNewColumn={
              handleConditionsUpdateForNewColumn
            }
            handleDeleteFilter={handleDeleteFilter}
          />
        ))}
        <div ref={filtersEndRef} />
      </Box>

      <div className="filter-buttons">
        <button
          className={`btn ${applyFilter ? "adv-filter" : ""}`}
          variant="contained"
          onClick={handleAddFiltersToTable}
        >
          Apply advance filter
        </button>

        <button
          className={`btn ${applyFilter ? "" : "adv-filter"}`}
          variant="outlined"
          onClick={handleAddFilter}
        >
          Add more filter
        </button>
      </div>
    </div>
  );
};

export default AdvanceFilter;
