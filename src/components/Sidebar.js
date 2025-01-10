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
