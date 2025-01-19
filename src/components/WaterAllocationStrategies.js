
import React, { useState, useEffect } from 'react';
import { fetchData } from './api';

const MyComponent = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchData();
      setData(result);
    };

    getData();
  }, [fetchData, setData]); // Add missing dependencies

  return (
    <div>
      <h1>My Component</h1>
      {/* Render data here */}
    </div>
  );
};

export default MyComponent;