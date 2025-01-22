<<<<<<< HEAD
// ...existing code...
// Remove unused imports
// import logo1 from 'path/to/logo1';
// import logo2 from 'path/to/logo2';
// ...existing code...
=======
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

// Ensure the file paths to the images are correct
import logo1 from '../assets/nexusgainslogo.png';
import logo2 from '../assets/iwmi.png';
import landAllocationImage from '../assets/landAllocation.jpg';
import waterAllocationImage from '../assets/waterAllocation.jpg';
import laborProductivityImage from '../assets/laborProductivity.jpg';
import cropStrategiesImage from '../assets/cropStrategies.jpg';
import populationDynamicsImage from '../assets/populationDynamics.jpg';

const modules = [
  { name: 'Land Allocation', route: '/visualization?section=landAllocation', image: landAllocationImage },
  { name: 'Water Allocation', route: '/visualization?section=waterAllocation', image: waterAllocationImage },
  { name: 'Resource Efficiency', route: '/visualization?section=resourceEfficiency', image: laborProductivityImage },
  { name: 'Crop Strategies', route: '/visualization?section=cropStrategies', image: cropStrategiesImage },
  { name: 'Macro Policies', route: '/visualization?section=macroPolicies', image: populationDynamicsImage },
];

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <header className="home-header">
        <img src={logo1} alt="Nexus Gains Logo" className="logo" />
        <img src={logo2} alt="IWMI Logo" className="logo" />
      </header>
      <div className="home-content">
        <h1>Hydro-economic Decision Support System</h1>
        <p>
          This dashboard provides insights into the Water-Energy-Food-Environment (WEFE) Nexus in Pakistan.
          Explore different policy scenarios and their impacts on resources.
        </p>
        <div className="modules-grid">
          {modules.map((module, index) => (
            <div
              key={index}
              className="module-thumbnail"
              onClick={() => navigate(module.route)}
            >
              <img src={module.image} alt={`${module.name} Thumbnail`} />
              <h3>{module.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
>>>>>>> 154afc000dc9fe61219ce03cd5369e0cb6ef87a8
