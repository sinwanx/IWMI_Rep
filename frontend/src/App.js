import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './components/Home';
import LandAllocationStrategies from './components/LandAllocationStrategies';
import WaterAllocationStrategies from './components/WaterAllocationStrategies';
import Sidebar from './components/Sidebar';
import TopBar from './components/Topbar';
import Visualization from './components/Visualization';
import LoginPage from './components/LoginPage';
import FAQPage from './components/FAQPage';
import ContactUsPage from './components/ContactUsPage';
import PublicationsPage from './components/PublicationsPage';
import RegisterPage from './components/RegisterPage';

function AppContent() {
  // Application-wide state
  const [section, setSection] = useState(null);
  const [subsection, setSubsection] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [chartType, setChartType] = useState('Line');
  const [metric, setMetric] = useState('Production');
  const [yearFilter, setYearFilter] = useState({ start: 2014, end: 2023 });
  const [influence, setInfluence] = useState(0); // Influence state for slider
  const [cropCode, setCropCode] = useState(null); // Crop code for crop-specific data
  const [provinceCode, setProvinceCode] = useState(null); // Province code for province-specific data

  const location = useLocation();

  // Determine routes where Sidebar should not render
  const noSidebarRoutes = ['/login'];

  // Conditionally render TopBar based on the route
  const showTopBar = location.pathname !== '/login';

  return (
    <div className="app-container">
      {/* Conditionally render TopBar */}
      {showTopBar && <TopBar />}

      {/* Conditionally render Sidebar */}
      {!noSidebarRoutes.includes(location.pathname) && (
        <Sidebar
          setSection={setSection}
          setSubsection={setSubsection}
          setScenario={setScenario}
          setChartType={setChartType}
          setMetric={setMetric}
          setYearFilter={setYearFilter}
          influence={influence}
          setInfluence={setInfluence}
          cropCode={cropCode}
          setCropCode={setCropCode}
          setProvinceCode={setProvinceCode}
        />
      )}

      <div className="content">
        <Routes>
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Land Allocation Strategies Route */}
          <Route
            path="/landAllocation"
            element={
              <LandAllocationStrategies
                section={section}
                subsection={subsection}
                scenario={scenario}
                chartType={chartType}
                setChartType={setChartType}
                yearFilter={yearFilter}
                influence={influence}
                setInfluence={setInfluence}
                cropCode={cropCode}
                provinceCode={provinceCode}
              />
            }
          />

          {/* Water Allocation Strategies Route */}
          <Route
            path="/waterAllocation"
            element={
              <WaterAllocationStrategies
                section={section}
                subsection={subsection}
                scenario={scenario}
                chartType={chartType}
                yearFilter={yearFilter}
                influence={influence}
                cropCode={cropCode}
                provinceCode={provinceCode}
              />
            }
          />

          {/* Visualization Route */}
          <Route
            path="/visualization"
            element={
              <Visualization
                section={section}
                setSection={setSection}
                subsection={subsection}
                setSubsection={setSubsection}
                scenario={scenario}
                setScenario={setScenario}
                chartType={chartType}
                setChartType={setChartType}
                metric={metric}
                setMetric={setMetric}
                yearFilter={yearFilter}
                setYearFilter={setYearFilter}
                influence={influence}
                setInfluence={setInfluence}
                cropCode={cropCode}
                setCropCode={setCropCode}
                provinceCode={provinceCode}
                setProvinceCode={setProvinceCode}
              />
            }
          />

          {/* Fallback Route */}
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
