// Features/reportListSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch report list
export const fetchReportList = createAsyncThunk(
  'reportList/fetchReportList',
  async () => {
    const loginSuperUser = async () => {
      return axios({
        url: '/jasperserver-pro/rest_v2/login?j_username=superuser&j_password=superuser',
        method: 'get',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
    };

    await loginSuperUser();
    const response = await axios({
      url: `/jasperserver-pro/rest_v2/resources?offset=0&limit=100&folderUri=/AI_ML`,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true,
    });

    const filterVisualizationsOnly = (resources) => {
      const visualizationTypes = ['reportUnit'];
      return resources.filter(({ resourceType }) => visualizationTypes.includes(resourceType));
    };

    return filterVisualizationsOnly(response.data.resourceLookup);
  }
);

const reportListSlice = createSlice({
  name: 'reportList',
  initialState: {
    reportList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReportList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReportList.fulfilled, (state, action) => {
        state.loading = false;
        state.reportList = action.payload;
      })
      .addCase(fetchReportList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default reportListSlice.reducer;
