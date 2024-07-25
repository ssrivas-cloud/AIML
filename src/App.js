import React, { useState } from 'react';

import './App.css';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedVisualization, setFieldsOfSelectedVisualization } from './Features/visualizationSlice';
import Header from './Components/Header/Header';
import ListReports from "./Components/ListReports"
import VisualizationColumnsComponent from './Components/VisualizationColumnsComponent';
import VisualizationQueryComponent from './Components/VisualizationQueryComponent';


function App() {
  // const [selectedVisualization, setSelectedVisualization] = useState('');
  // const [fieldsOfSelectedVisualization, setFieldsOfSelectedVisualization] = useState([]);
  // console.log('1')
  const dispatch = useDispatch();
  const selectedVisualization = useSelector((state) => state.visualization.selectedVisualization);
  const fieldsOfSelectedVisualization = useSelector((state) => state.visualization.fieldsOfSelectedVisualization);
  // console.log(selectedVisualization)
  // const whenVisualizationIsSelected = (vis) => {
  //   dispatch(setSelectedVisualization(vis));
  //   // setSelectedVisualization(vis);
  //   // setFieldsOfSelectedVisualization([]);
  // };
  const whenFieldsArePopulated = (fields) => {
    dispatch(setFieldsOfSelectedVisualization(fields));
    // setFieldsOfSelectedVisualization(fields);
  };
  console.log(fieldsOfSelectedVisualization)

  return (
    <>
      <Header />
      <main>
        <section className="app-section list-report">
          {/* <ListReports onVisualizationSelected={whenVisualizationIsSelected} visualizationSelected={selectedVisualization} /> */}
          <ListReports />
        </section>
        {!selectedVisualization &&
          <div className="app-section no-report">
            <img src="/assets/select_report_img.png" alt="select report to continue image"></img>
            <p>Select a report to continue</p>
          </div>
        }
        {selectedVisualization && <section className="app-section">

          {/* <VisualizationColumnsComponent visualizationSelected={selectedVisualization} onFieldsPopulated={whenFieldsArePopulated} /> */}
          <VisualizationColumnsComponent/>


          <div className="col box-section-container">
            {(fieldsOfSelectedVisualization?.length > 0 || fieldsOfSelectedVisualization.query) &&
              <VisualizationQueryComponent
                // visualizationSelected={selectedVisualization}
                // fields={fieldsOfSelectedVisualization}

              />
            }
            {(fieldsOfSelectedVisualization?.length <= 0 || !fieldsOfSelectedVisualization.query) && <div className="text-center mt-4">No execution available yet (Loading...)</div>}
          </div>
        </section>
        }
        </main>

    </>
  );
}

export default App;
