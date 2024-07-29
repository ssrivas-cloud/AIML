// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

// const ListReports = ({ onVisualizationSelected, visualizationSelected }) => {

//   const [reportList, setReportList] = useState([]);

//   const filterVisualizationsOnly = (resources) => {
//     const visualizationTypes = ['reportUnit'];
//     return resources.filter(({ resourceType }) => visualizationTypes.includes(resourceType));
//   };

//   useEffect(() => {

//     const loginSuperUser = async () => {
//       return axios({
//         url: '/jasperserver-pro/rest_v2/login?j_username=superuser&j_password=superuser',
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       });
//     };

//     const fetchReportList = async () => {
//       await loginSuperUser();
//       const request = await axios({
//         url: `/jasperserver-pro/rest_v2/resources?offset=0&limit=100&folderUri=/AI_ML`,
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json'

//         },
//         withCredentials: true
//       }
//       );
//       return request.data;
//     };

//     fetchReportList().then(({ resourceLookup }) =>
//       setReportList(filterVisualizationsOnly(resourceLookup)))
//       .catch(e => console.error(e));

//   }, []);
//   return (

//     <>
//       <h1>
//         AIML
//       </h1>
//       <FormControl fullWidth>
//       <InputLabel id="report-select-label">Report</InputLabel>
//       <Select
//         labelId="report-select-label"
//         id="report-select"
//         value={visualizationSelected}
//         label="Report"
//         onChange={(event, visualization) => onVisualizationSelected(event.target.value)}
//       >
//         {reportList.map((report) => (
//           <MenuItem key={report.version} value={report}>
//             {report.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//     </>
//   );
// }

// export default ListReports;
import React, { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchReportList } from "../Features/reportListSlice";
import { setSelectedVisualization } from "../Features/visualizationSlice";
import { setChatOpen } from "../Features/chatOpenSlice";
import { fetchBackendDataFromApi } from "../Utilities/backendApi";

const ListReports = () => {
  const dispatch = useDispatch();
  const { reportList, loading, error } = useSelector(
    (state) => state.reportList
  );
  const selectedVisualization = useSelector(
    (state) => state.visualization.selectedVisualization
  );
  useEffect(() => {
    dispatch(fetchReportList());
  }, [dispatch]);

  const handleChange = (event) => {
    dispatch(setSelectedVisualization(event.target.value));

    // send delete request to the backend and handle response
    fetchBackendDataFromApi("DELETE", "/delete-questions-answers/")
      .then(() => {
        dispatch(setChatOpen(false));
      })
      .catch((error) => {
        console.error("Error deleting questions and answers:", error);
      });
  };
  return (
    <>
      <h1>Jaspersoft AI explorer</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <FormControl fullWidth>
        <InputLabel id="report-select-label">Report</InputLabel>
        <Select
          labelId="report-select-label"
          id="report-select"
          value={selectedVisualization}
          label="Report"
          onChange={handleChange}
        >
          {reportList.map((report) => (
            <MenuItem key={report.version} value={report}>
              {report.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default ListReports;
