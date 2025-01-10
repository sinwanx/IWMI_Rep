<<<<<<< HEAD
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { GiLandMine, GiWaterDrop, GiFactory, GiSprout } from 'react-icons/gi';
import { FaUsers, FaCaretDown, FaCaretUp, FaHome } from 'react-icons/fa';
import Slider from '@mui/material/Slider';

function Sidebar({ section, setScenario, setSection, setSubsection, setChartType, setMetric, setYearFilter }) {
  const [nestedDropdowns, setNestedDropdowns] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [percentage, setPercentage] = useState(0); // State for slider percentage
  const navigate = useNavigate();

  const handleSectionChange = (section) => {
    setSection(section);
    setSubsection(null); // Reset subsection
    setScenario(null); // Reset scenario
    setYearFilter({ start: 0, end: 0 }); // Reset year filter
    console.log(`Section changed to: ${section}`);
  };

  const handleScenarioSelection = (section, subsection, scenario) => {
    console.log('Selected Scenario:', { section, subsection, scenario });
    if (section && subsection && scenario) {
      setSelectedOption(`${section}-${subsection}-${scenario}`);
      setSection(section);
      setSubsection(subsection);
      setScenario(scenario);
      setMetric('Production'); // Default metric
      setYearFilter(percentage === 15 ? { start: 2014, end: 2030 } : { start: 0, end: 0 }); // Apply year filter based on slider
      navigate('/visualization');
    } else {
      console.warn('Invalid selection:', { section, subsection, scenario });
    }
  };

  const handleYearRangeChange = (value) => {
    console.log('Slider value:', value); // Debug log
    setPercentage(value);
    if (section === 'Land Allocation') {
      setYearFilter(value === 15 ? { start: 2014, end: 2030 } : { start: 0, end: 0 });
      console.log('Year filter updated for Land Allocation:', value === 15 ? { start: 2014, end: 2030 } : { start: 0, end: 0 });
    } else {
      console.warn('Slider only affects Land Allocation');
    }
  };

  const optionsData = {
    'Land Allocation': [
      { name: 'Reduction in Large Farms', subOptions: ['Historical', 'Climate'] },
      { name: 'Increase in Large Farms', subOptions: ['Historical', 'Climate'] },
      { name: 'Reduction in Small Farms', subOptions: ['Historical', 'Climate'] },
      { name: 'Increase in Small Farms', subOptions: ['Historical', 'Climate'] },
    ],
    'Water Allocation': [
      {
        name: 'Tubewell Extraction Limits',
        subOptions: [
          '30 MAF - Historical',
          '30 MAF - Climate',
          '40 MAF - Historical',
          '40 MAF - Climate',
          '50 MAF - Historical',
          '50 MAF - Climate',
        ],
      },
    ],
    'Resource Efficiency': [
      { name: 'Land Productivity', subOptions: ['10% Growth Rate', '20% Growth Rate'] },
    ],
    'Crop Strategies': [
      { name: 'TFP', subOptions: ['10% from Base Growth', '20% from Base Growth'] },
    ],
    'Macro Policies': [
      {
        name: 'International Price Changes',
        subOptions: ['Rice', 'Textile', 'Oilseed', 'Petroleum'],
      },
      { name: 'Labor', subOptions: ['10% Growth Rate', '20% Growth Rate'] },
      { name: 'Tax and Fertilizer', subOptions: ['10%', '20%', '30%'] },
    ],
  };

  const toggleNestedDropdown = (key) => {
    setNestedDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderNestedOptions = (options, section) =>
    options.map((option, index) => (
      <li key={`${section}-${index}`}>
        {option.subOptions && option.subOptions.length > 0 ? (
          <>
            <div
              className="dropdown-toggle"
              onClick={() => toggleNestedDropdown(option.name)}
            >
              {option.name}
              {nestedDropdowns[option.name] ? <FaCaretUp /> : <FaCaretDown />}
            </div>
            {nestedDropdowns[option.name] && (
              <ul className="dropdown-menu">
                {option.subOptions.map((subOption, subIndex) => (
                  <li key={`${section}-${index}-${subIndex}`}>
                    <label>
                      <input
                        type="radio"
                        name={section}
                        value={subOption}
                        checked={selectedOption === `${section}-${option.name}-${subOption}`}
                        onChange={() =>
                          handleScenarioSelection(section, option.name, subOption)
                        }
                      />
                      {subOption}
                    </label>
                  </li>
                ))}
                {section === 'Land Allocation' && (
                  <div className="slider-container">
                    <Slider
                      aria-label="Percentage"
                      value={percentage}
                      getAriaValueText={(value) => `${value}%`}
                      valueLabelDisplay="auto"
                      step={5}
                      marks
                      min={0}
                      max={30}
                      onChange={(e, value) => handleYearRangeChange(value)}
                    />
                  </div>
                )}
              </ul>
            )}
          </>
        ) : (
          <label>
            <input
              type="radio"
              name={section}
              value={option.name}
              checked={selectedOption === `${section}-${option.name}-null`}
              onChange={() => handleScenarioSelection(section, option.name, null)}
            />
            {option.name}
          </label>
        )}
      </li>
    ));

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">HEDSS-IWMI</h2>
      <ul>
        <li>
          <Link to="/home" className="sidebar-link">
            <FaHome className="sidebar-icon" /> Home
          </Link>
        </li>
        <li>
          <div className="dropdown-toggle">
            <span>Decisions and Policies</span>
          </div>
          <ul className="dropdown-menu">
            {Object.entries(optionsData).map(([section, options]) => (
              <li key={section}>
                <div
                  className="dropdown-toggle"
                  onClick={() => toggleNestedDropdown(section)}
                >
                  {section === 'Land Allocation' && <GiLandMine className="sidebar-icon" />}
                  {section === 'Water Allocation' && <GiWaterDrop className="sidebar-icon" />}
                  {section === 'Resource Efficiency' && <FaUsers className="sidebar-icon" />}
                  {section === 'Crop Strategies' && <GiSprout className="sidebar-icon" />}
                  {section === 'Macro Policies' && <GiFactory className="sidebar-icon" />}
                  {section}
                  {nestedDropdowns[section] ? <FaCaretUp /> : <FaCaretDown />}
                </div>
                {nestedDropdowns[section] && (
                  <ul className="dropdown-menu nested-menu">
                    {renderNestedOptions(options, section)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
=======
// ...existing code...

const handleSectionChange = (section) => {
  setSection(section);
  setSubsection(null); // Reset subsection
  setScenario(null); // Reset scenario
  setYearFilter({ start: 0, end: 0 }); // Reset year filter
};

const handleScenarioSelection = (section, subsection, scenario) => {
  setSection(section); // Update main section
  setSubsection(subsection); // Update subsection
  setScenario(scenario); // Update scenario
  setYearFilter({ start: 0, end: 0 }); // Reset year filter to avoid conflicts
};

const handleLandAllocationSlider = (value) => {
  if (section === 'Land Allocation') {
    setYearFilter({ start: 2014, end: 2030 });
  } else {
    console.warn('Slider is only functional for Land Allocation');
  }
};

// Add a dropdown or selection handler for sections
<select onChange={(e) => handleSectionChange(e.target.value)}>
  <option value="Water Allocation">Water Allocation</option>
  <option value="Land Allocation">Land Allocation</option>
</select>

// ...existing code...
>>>>>>> 149da53a7a1ca36a8ff5ba399b6915e7e470da9a
