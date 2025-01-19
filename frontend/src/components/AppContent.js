import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import LandAllocationStrategies from './components/LandAllocationStrategies';
import WaterAllocationStrategies from './components/WaterAllocationStrategies';
import LaborProductivity from './components/LaborProductivity';
import CropStrategies from './components/CropStrategies';
import PopulationDynamics from './components/PopulationDynamics';
import LoginPage from './components/LoginPage';
import DataVisualization from './components/DataVisualization';
import Sidebar from './components/Sidebar';
import TopBar from './components/Topbar';
import Visualization from './components/Visualization';
import FileUpload from './components/FileUpload';

function AppContent() {
  const [section, setSection] = useState(null);
  const [subsection, setSubsection] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [chartType, setChartType] = useState('Line');
  const [metric, setMetric] = useState('Production');
  const [yearFilter, setYearFilter] = useState({ start: 2014, end: 2023 });

  // NEW: Influence state for the slider
  const [influence, setInfluence] = useState(0);

  const location = useLocation();

  const noSidebarRoutes = ['/login'];
  const showTopBar = location.pathname !== '/login';

  return (
    <div className="app-container">
      {showTopBar && <TopBar />}
      {!noSidebarRoutes.includes(location.pathname) && (
        <Sidebar
          // Existing props
          setSection={setSection}
          setSubsection={setSubsection}
          setScenario={setScenario}
          setChartType={setChartType}
          setMetric={setMetric}
          setYearFilter={setYearFilter}
          // NEW PROPS for influence
          influence={influence}
          setInfluence={setInfluence}
        />
      )}

      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Examples of passing yearFilter unchanged, if needed */}
          <Route
            path="/landAllocation"
            element={
              <LandAllocationStrategies
                section={section}
                subsection={subsection}
                scenario={scenario}
                chartType={chartType}
                yearFilter={yearFilter}
                influence={influence}
              />
            }
          />
          <Route
            path="/waterAllocation"
            element={
              <WaterAllocationStrategies
                section={section}
                subsection={subsection}
                scenario={scenario}
                chartType={chartType}
                influence={influence}
              />
            }
          />
          {/* ...other Routes... */}

          <Route
            path="/visualization"
            element={
              <Visualization
                section={section}
                subsection={subsection}
                scenario={scenario}
                chartType={chartType}
                metric={metric}
                setMetric={setMetric}
                setChartType={setChartType}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
                influence={influence}
                setInfluence={setInfluence} // Ensure setInfluence is passed
              />
            }
          />

          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
