// features/visualizationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const visualizationSlice = createSlice({
  name: 'visualization',
  initialState: {
    selectedVisualization: '',
    fieldsOfSelectedVisualization: [],
    updatedColumns: []
  },
  reducers: {
    setSelectedVisualization: (state, action) => {
      state.selectedVisualization = action.payload;
      state.fieldsOfSelectedVisualization = [];
    },
    setFieldsOfSelectedVisualization: (state, action) => {
      state.fieldsOfSelectedVisualization = action.payload;
    },
    setUpdatedColumns:(state, action)=>{
      state.updatedColumns = action.payload;
    }
  },
});

export const { setSelectedVisualization, setFieldsOfSelectedVisualization, setUpdatedColumns } = visualizationSlice.actions;

export default visualizationSlice.reducer;
