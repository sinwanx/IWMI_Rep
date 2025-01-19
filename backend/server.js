const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve the API route
const jsonData = require('./complete_json_with_province_crop_data.json');
app.get('/api/data', (req, res) => {
  res.json(jsonData);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../frontend/build')));

// Handle React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/build/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
