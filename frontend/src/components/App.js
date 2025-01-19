import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Visualization from './Visualization';

const App = () => {
  const [subsection, setSubsection] = useState(null);
  const [cropCode, setCropCode] = useState(null);
  const [provinceCode, setProvinceCode] = useState(null);
  const [chartType, setChartType] = useState('Bar');
  const [metric, setMetric] = useState('Production');
  const [yearFilter, setYearFilter] = useState({ start: 0, end: 0 });
  const [influence, setInfluence] = useState(15);

  return (
    <div>
      <Sidebar
        section={section}
        setSubsection={setSubsection}
        setChartType={setChartType}
        setMetric={setMetric}
        setYearFilter={setYearFilter}
        influence={influence}
        setInfluence={setInfluence}
        setCropCode={setCropCode}
        setProvinceCode={setProvinceCode}
        setComparisonSubscenario={setComparisonSubscenario}
      />
      <Visualization
        section={section}
        scenario={scenario}
        subsection={subsection}
        setSubsection={setSubsection}
        cropCode={cropCode}
        setCropCode={setCropCode}
        provinceCode={provinceCode}
        setProvinceCode={setProvinceCode}
        chartType={chartType}
        setChartType={setChartType}
        metric={metric}
        setMetric={setMetric}
        yearFilter={yearFilter}
        setYearFilter={setYearFilter}
        influence={influence}
        setInfluence={setInfluence}
      />
    </div>
  );
};

export default App;
