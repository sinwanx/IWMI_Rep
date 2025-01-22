<<<<<<< HEAD
// ...existing code...
useEffect(() => {
  // ...existing code...
}, [scenarioKeyMapping]); // Add scenarioKeyMapping to dependencies
// ...existing code...
=======
import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import mockData from '../data/mockData';

const LandAllocationStrategies = ({ section, subsection, scenario, chartType, yearFilter }) => {
  const [selectedChartType, setSelectedChartType] = useState(chartType || 'Production');
  const [data, setData] = useState([]);

  // Mapping of scenarios to mock data keys
  const scenarioKeyMapping = {
    'Reduction in Large Farms': 'reduction_large',
    'Increase in Large Farms': 'increase_large',
    'Reduction in Small Farms': 'reduction_small',
    'Increase in Small Farms': 'increase_small',
  };

  useEffect(() => {
    const fetchData = () => {
      console.log('Fetching data for:', { subsection, scenario, selectedChartType, yearFilter });

      // Validate year filter
      if (!yearFilter || yearFilter.start >= yearFilter.end) {
        console.warn('Invalid year filter:', yearFilter);
        setData([]);
        return;
      }

      // Map scenario to the correct data key
      const scenarioKey = scenarioKeyMapping[scenario] || scenario;
      const scenarioData = mockData[subsection]?.[scenarioKey]?.[selectedChartType];

      if (scenarioData) {
        const filteredData = scenarioData
          .map((value, index) => ({
            year: 2014 + index,
            value,
          }))
          .filter((d) => d.year >= yearFilter.start && d.year <= yearFilter.end);

        setData(filteredData);
        console.log('Filtered data:', filteredData);
      } else {
        console.warn('No data found for the selected options:', { subsection, scenarioKey });
        setData([]);
      }
    };

    fetchData();
  }, [subsection, scenario, selectedChartType, yearFilter]);

  if (!data.length) {
    return <p>No data available for the selected options.</p>;
  }

  const getBarColor = (scenario) => {
    const colors = {
      'Reduction in Large Farms': '#ff6384',
      'Increase in Large Farms': '#36a2eb',
      'Reduction in Small Farms': '#ffcd56',
      'Increase in Small Farms': '#4bc0c0',
      default: '#8884d8',
    };
    return colors[scenario] || colors.default;
  };

  const renderChart = () => {
    switch (selectedChartType) {
      case 'Bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={getBarColor(scenario)} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>
        Visualization for {subsection} - {scenario} ({selectedChartType})
      </h2>
      <div>
        <button onClick={() => setSelectedChartType('Acreage')}>Acreage</button>
        <button onClick={() => setSelectedChartType('Water')}>Water</button>
        <button onClick={() => setSelectedChartType('Production')}>Production</button>
        <button onClick={() => setSelectedChartType('Income')}>Income</button>
        <button onClick={() => setSelectedChartType('Trade')}>Trade</button>
        <button onClick={() => setSelectedChartType('Consumption')}>Consumption</button>
      </div>
      {renderChart()}
    </div>
  );
};

export default LandAllocationStrategies;
>>>>>>> 154afc000dc9fe61219ce03cd5369e0cb6ef87a8
