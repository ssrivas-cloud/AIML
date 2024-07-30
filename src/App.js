import React from 'react';

import './App.css';
import './styles.scss';
import { useSelector } from 'react-redux';
import Header from './Components/Header/Header';
import ListReports from "./Components/ListReports"
import VisualizationColumnsComponent from './Components/VisualizationColumnsComponent';
import VisualizationQueryComponent from './Components/VisualizationQueryComponent';


function App() {
  const selectedVisualization = useSelector((state) => state.visualization.selectedVisualization);
  const fieldsOfSelectedVisualization = useSelector((state) => state.visualization.fieldsOfSelectedVisualization);


  return (
    <>
      <Header />
      <main>
        <section className="app-section list-report">
          <ListReports />
        </section>
        {!selectedVisualization &&
          <div className="app-section no-report">
            <img src="/assets/select_report_img.png" alt="select report to continue image"></img>
            <p>Select a report to continue</p>
          </div>
        }
        {selectedVisualization && <section className="app-section">
          <VisualizationColumnsComponent />
          <div className="col box-section-container">
            {(fieldsOfSelectedVisualization?.length > 0 || fieldsOfSelectedVisualization.query) &&
              <VisualizationQueryComponent />
            }
            {(fieldsOfSelectedVisualization?.length <= 0 || !fieldsOfSelectedVisualization.query) && <div className="text-center mt-4">No execution available yet</div>}
          </div>
        </section>
        }
      </main>

    </>
  );
}

export default App;
