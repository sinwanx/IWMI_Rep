import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import mockData from '../data/mockData';

const LandAllocationStrategies = ({
  section,
  subsection,
  scenario,
  chartType,
  setChartType,
  yearFilter,
  influence,
  cropCode,
  provinceCode,
  setInfluence,
}) => {
  const [selectedMetric, setSelectedMetric] = useState(chartType || 'Production');
  const [data, setData] = useState([]);

  // Mapping scenarios to mock data keys
  const scenarioKeyMapping = {
    'Reduction in Large Farms': 'Reduction in Large Farms',
    'Increase in Large Farms': 'Increase in Large Farms',
    'Reduction in Small Farms': 'Reduction in Small Farms',
    'Increase in Small Farms': 'Increase in Small Farms',
  };

  useEffect(() => {
    console.log('Selected Options:', { subsection, scenario, selectedMetric, yearFilter });
    const scenarioKey = scenarioKeyMapping[scenario] || scenario;
    console.log('Mapped Scenario Key:', scenarioKey);
    const scenarioData = mockData[subsection]?.[scenarioKey]?.[selectedMetric];
    console.log('Fetched Data from MockData:', scenarioData);
    if (scenarioData) {
      const modifiedData = scenarioData.map(value => value * (1 + influence / 100));
      console.log('Modified Data:', modifiedData);
      const filteredData = modifiedData
        .map((value, index) => ({
          year: 2014 + index,
          value,
        }))
        .filter((d) => d.year >= yearFilter.start && d.year <= yearFilter.end);

      console.log('Filtered Data:', filteredData);
      setData(filteredData.length > 0 ? filteredData : []);
    } else {
      console.warn('No data found for the selected options:', { subsection, scenarioKey, selectedMetric });
      setData([]);
    }
  }, [subsection, scenario, selectedMetric, yearFilter, influence]);

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
    if (!data || data.length === 0) {
      return <p>No data available for the selected options.</p>;
    }

    switch (chartType) {
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
      case 'Spider':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="year" />
              <PolarRadiusAxis />
              <Radar name={scenario} dataKey="value" stroke={getBarColor(scenario)} fill={getBarColor(scenario)} fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
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
        Visualization for {subsection} - {scenario} ({selectedMetric})
      </h2>
      <div>
        <button onClick={() => setSelectedMetric('Acreage')}>Acreage</button>
        <button onClick={() => setSelectedMetric('Water')}>Water</button>
        <button onClick={() => setSelectedMetric('Production')}>Production</button>
        <button onClick={() => setSelectedMetric('Income')}>Income</button>
        <button onClick={() => setSelectedMetric('Trade')}>Trade</button>
        <button onClick={() => setSelectedMetric('Consumption')}>Consumption</button>
      </div>
      <div className="chart-type-buttons">
        <button onClick={() => setChartType('Line')}>Line</button>
        <button onClick={() => setChartType('Bar')}>Bar</button>
        <button onClick={() => setChartType('Spider')}>Spider</button>
      </div>
      {renderChart()}
    </div>
  );
};

export default LandAllocationStrategies;
