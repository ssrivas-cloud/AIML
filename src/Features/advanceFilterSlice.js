import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: [],
};

const advanceFilterSlice = createSlice({
  name: "advanceFilters",
  initialState,
  reducers: {
    addColumnFilters: (state, action) => {
      // const {
      //   filterColumn,
      //   columnIndex,
      //   selectedLogic,
      //   textValue,
      //   newfirstInteger,
      //   newsecondInteger,
      //   newBoolean,
      // } = action.payload;
      const newFilters = action.payload;

      // clearing the initial filters
      state.filters = [];

      // add complete new filters
      const nFilters = newFilters.filter((filter) => filter.columnName);
      state.filters = nFilters;
      // If the filter exists, update it
      // state.filters[columnIndex] = {
      //   index: columnIndex,
      //   logic: [
      //     {
      //       name: selectedLogic,
      //       value: textValue
      //         ? [textValue]
      //         : newfirstInteger && !newsecondInteger
      //         ? [newfirstInteger]
      //         : newfirstInteger && newsecondInteger
      //         ? [newfirstInteger, newsecondInteger]
      //         : newBoolean
      //         ? [newBoolean]
      //         : [], // Default empty array if no value is provided
      //     },
      //   ],
      // };
    },
    clearExistingFilters: (state) => {
      state.filters = [];
    },
    updateExistingLogic: (state, action) => {
      const {
        filterColumn,
        selectedLogic,
        textValue,
        newfirstInteger,
        newsecondInteger,
        newBoolean,
      } = action.payload;

      // Ensure filters[filterColumn] and filters[filterColumn].logic exist
      if (!state.filters[filterColumn]) {
        state.filters[filterColumn] = { logic: [] };
      }

      // Check if the logic array contains a filter with the name `selectedLogic`
      const filterIndex = state.filters[filterColumn].logic.findIndex(
        (filter) => filter.name === selectedLogic
      );

      if (filterIndex !== -1) {
        // If the filter exists, update it
        state.filters[filterColumn].logic[filterIndex] = {
          ...state.filters[filterColumn].logic[filterIndex],
          value: textValue
            ? [textValue]
            : newfirstInteger && !newsecondInteger
            ? [newfirstInteger]
            : newfirstInteger && newsecondInteger
            ? [newfirstInteger, newsecondInteger]
            : newBoolean
            ? [newBoolean]
            : state.filters[filterColumn].logic[filterIndex].value, // Keep existing value if none of the conditions are met
        };
      } else {
        // If the filter does not exist, add a new filter
        state.filters[filterColumn].logic.push({
          name: selectedLogic,
          value: textValue
            ? [textValue]
            : newfirstInteger && !newsecondInteger
            ? [newfirstInteger]
            : newfirstInteger && newsecondInteger
            ? [newfirstInteger, newsecondInteger]
            : newBoolean
            ? [newBoolean]
            : [], // Default empty array if no value is provided
        });
      }
    },
  },
});

export const {
  addColumnFilters,
  clearExistingFilters,
  updateExistingLogic,
  addListofColumnFilters,
} = advanceFilterSlice.actions;
export default advanceFilterSlice.reducer;
