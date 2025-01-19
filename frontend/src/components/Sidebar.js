import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { GiLandMine, GiWaterDrop, GiFactory, GiSprout } from 'react-icons/gi';
import { FaUsers, FaCaretDown, FaCaretUp, FaHome, FaChartBar, FaSearch } from 'react-icons/fa';
import { TextField, InputAdornment, Dialog, DialogTitle, DialogContent } from '@mui/material';

const Sidebar = ({
  section,
  setSection,
  setScenario,
  setSubsection,
  setChartType,
  setYearFilter,
  influence,
  setInfluence,
  setCropCode,
  setProvinceCode,
}) => {
  const [nestedDropdowns, setNestedDropdowns] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();

  const optionsData = {
    'Land Allocation': [
      { name: 'Reduction in Large Farms', description: 'Policies or actions aimed at redistributing land from large-scale farms to smaller holdings, often to promote equity and support smallholder farmers.' },
      { name: 'Increase in Large Farms', description: 'Encouraging the consolidation of smaller farms into larger operations, potentially to benefit from economies of scale and increased mechanization.' },
      { name: 'Reduction in Small Farms', description: 'Policies that reduce the number of small farms, either by consolidation or conversion of agricultural land to non-agricultural uses.' },
      { name: 'Increase in Small Farms', description: 'Promoting the establishment or support of smaller agricultural units, which can be beneficial for localized economies and sustainability.' },
    ],
    'Water Allocation': [
      { name: 'Tubewell Extraction Limits', description: 'Regulations to control the amount of groundwater extracted via tubewells, addressing concerns like aquifer depletion and maintaining long-term water security.' },
    ],
    'Resource Efficiency Policies': [
      { name: 'Water Use Efficiency', description: 'Strategies to optimize water use in agriculture, such as promoting drip irrigation, sprinklers, or drought-resistant crops to maximize productivity per unit of water.' },
      { name: 'Energy Use Efficiency', description: 'Measures to reduce energy consumption in agricultural practices, including promoting renewable energy, efficient machinery, and reduced reliance on fossil fuels.' },
    ],
    'Crop-Specific Strategies': [
      { name: 'Wheat Strategy', description: 'Policies and practices aimed at enhancing wheat production, such as improved seed varieties, irrigation techniques, or pest control measures.' },
      { name: 'Rice Strategy', description: 'Focused on sustainable and high-yield rice cultivation, often addressing water use, soil fertility, and resistance to climate stressors.' },
    ],
    'Macro Policies': [
      { name: 'Subsidies', description: 'Financial incentives provided by the government to reduce costs for farmers, such as subsidies for fertilizers, seeds, water, or energy, aimed at making farming more viable.' },
      { name: 'Trade Policies', description: 'Rules and regulations governing the import and export of agricultural goods, designed to protect domestic producers, ensure food security, or take advantage of global markets.' },
    ],
  };

  const toggleNestedDropdown = (key) => {
    setNestedDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleOptionClick = (description) => {
    setSelectedInfo(description);
    setDialogOpen(true);
  };

  const handleVisualizationClick = () => {
    navigate('/visualization');
  };

  const renderNestedOptions = (options, section) =>
    options.map((option, index) => (
      <li key={`${section}-${index}`} className="option-item flex items-center justify-between p-2 rounded-lg cursor-pointer">
        <div
          className="flex-grow"
          onClick={() => handleOptionClick(option.description)}
          style={{ fontFamily: 'Arial', cursor: 'pointer' }}
        >
          {option.name}
        </div>
      </li>
    ));

  const filteredOptionsData = Object.entries(optionsData).reduce((acc, [section, options]) => {
    const filteredOptions = options.filter(option =>
      option.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredOptions.length > 0) {
      acc[section] = filteredOptions;
    }
    return acc;
  }, {});

  return (
    <div className="sidebar" style={{ fontFamily: 'Arial' }}>
      <ul>
        <li>
          <Link to="/home" className="sidebar-link">
            <FaHome className="sidebar-icon" /> Home
          </Link>
        </li>
        <li>
          <button
            onClick={handleVisualizationClick}
            className="sidebar-link data-visualization-button"
            style={{ display: 'flex', justifyContent: 'center', color: 'white' }}
          >
            <FaChartBar className="sidebar-icon" style={{ color: 'white' }} /> Data Visualization
          </button>
        </li>
      </ul>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '0px' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <FaSearch />
            </InputAdornment>
          ),
        }}
      />
      <ul>
        <li>
          <div className="dropdown-toggle" style={{ fontWeight: 'bold' }}>
            <span>Decisions and Policies</span>
          </div>
          <ul className="dropdown-menu">
            {Object.entries(filteredOptionsData).map(([section, options]) => (
              <li key={section}>
                <div
                  className="dropdown-toggle"
                  onClick={() => toggleNestedDropdown(section)}
                  style={{ fontFamily: 'Arial' }}
                >
                  {section === 'Land Allocation' && <GiLandMine className="sidebar-icon" />}
                  {section === 'Water Allocation' && <GiWaterDrop className="sidebar-icon" />}
                  {section === 'Resource Efficiency Policies' && <GiSprout className="sidebar-icon" />}
                  {section === 'Crop-Specific Strategies' && <GiSprout className="sidebar-icon" />}
                  {section === 'Macro Policies' && <GiFactory className="sidebar-icon" />}
                  {section}
                  {nestedDropdowns[section] ? <FaCaretUp /> : <FaCaretDown />}
                </div>
                {nestedDropdowns[section] && (
                  <ul className="dropdown-menu nested-menu" style={{ fontFamily: 'Arial' }}>
                    {renderNestedOptions(options, section)}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </li>
      </ul>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>About this</DialogTitle>
        <DialogContent>
          <p>{selectedInfo}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Sidebar;
