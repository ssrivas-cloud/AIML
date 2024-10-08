import React from 'react';

import './App.css';
import './styles.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Breadcrumbs, Link, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Header from './Components/Header/Header';
import ListReports from "./Components/ListReports"
import VisualizationColumnsComponent from './Components/VisualizationColumnsComponent';
import VisualizationQueryComponent from './Components/VisualizationQueryComponent';
import { setForecastOpen } from "./Features/forecastOpenSlice";

function App() {
  const selectedVisualization = useSelector((state) => state.visualization.selectedVisualization);
  const fieldsOfSelectedVisualization = useSelector((state) => state.visualization.fieldsOfSelectedVisualization);
  const { forecastOpen } = useSelector((state) => state.forecastOpen);
  const dispatchEvent = useDispatch();
  const handleBreadCrumClick = () => {
    dispatchEvent(setForecastOpen(false))
  };

  return (
    <>
      <Header />
      <main>
        <section className="app-section list-report">
          {!forecastOpen ? <ListReports /> : <div className='breadcrumb-wrapper'>
            <div className='breadcrumb-content'>

              {/* Back Arrow */}
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>

              {/* Breadcrumbs */}
              <Breadcrumbs separator=" / " aria-label="breadcrumb">
                <Link
                  color="inherit"
                  onClick={handleBreadCrumClick}
                  style={{ cursor: 'pointer' }}
                  className='breadcrumb-link'
                >
                  Bangalore real estate
                </Link>
                <Typography color="textPrimary">Forecast</Typography>
              </Breadcrumbs>
            </div>
            <h1>Forecast</h1>

          </div>
          }
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
