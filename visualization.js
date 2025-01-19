document.addEventListener('DOMContentLoaded', function() {
    // ...existing code...

    // Populate year selection dynamically
    const yearSelection = document.getElementById('year-selection');
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelection.appendChild(option);
    }

    // Ensure graph titles are visible
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
        const title = chart.querySelector('.chart-title');
        if (title) {
            title.style.display = 'block';
        }
    });

    // Improve chart colors and ensure consistency
    const chartColors = {
        water: 'blue',
        land: 'brown'
    };

    // Assuming a chart library is used, apply the colors
    // Example for Chart.js
    const chartConfig = {
        type: 'bar', // or 'line', etc.
        data: {
            labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [
                {
                    label: 'Water',
                    backgroundColor: chartColors.water,
                    borderColor: chartColors.water,
                    data: [12, 19, 3, 5, 2, 3, 10, 15, 20, 25]
                },
                {
                    label: 'Land',
                    backgroundColor: chartColors.land,
                    borderColor: chartColors.land,
                    data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, chartConfig);

    // Adjust the placement of line and bar charts
    const lineCharts = document.querySelectorAll('.line-chart');
    const barCharts = document.querySelectorAll('.bar-chart');
    lineCharts.forEach(chart => {
        chart.style.float = 'left';
    });
    barCharts.forEach(chart => {
        chart.style.float = 'right';
    });

    // Add tooltips for each control/selection
    const controls = document.querySelectorAll('select, input');
    controls.forEach(control => {
        control.setAttribute('title', `Select ${control.id.replace('-', ' ')}`);
    });

    // Add crop selection dropdown
    const cropSelection = document.createElement('select');
    cropSelection.id = 'crop-selection';
    const crops = ['Wheat', 'Rice', 'Maize'];
    crops.forEach(crop => {
        const option = document.createElement('option');
        option.value = crop;
        option.textContent = crop;
        cropSelection.appendChild(option);
    });
    document.body.insertBefore(cropSelection, document.body.firstChild);

    // Add province selection dropdown
    const provinceSelection = document.createElement('select');
    provinceSelection.id = 'province-selection';
    const provinces = ['Province 1', 'Province 2', 'Province 3'];
    provinces.forEach(province => {
        const option = document.createElement('option');
        option.value = province;
        option.textContent = province;
        provinceSelection.appendChild(option);
    });
    document.body.insertBefore(provinceSelection, document.body.firstChild);

    // Event listener for crop selection
    cropSelection.addEventListener('change', function() {
        const selectedCrop = this.value;
        const selectedScenario = document.getElementById('land-allocation').value;
        const selectedProvince = document.getElementById('province-selection').value;
        renderGraphs(selectedScenario, selectedCrop, selectedProvince);
    });

    // Event listener for scenario selection
    const scenarioSelection = document.getElementById('land-allocation');
    scenarioSelection.addEventListener('change', function() {
        const selectedScenario = this.value;
        const selectedCrop = document.getElementById('crop-selection').value;
        const selectedProvince = document.getElementById('province-selection').value;
        renderGraphs(selectedScenario, selectedCrop, selectedProvince);
    });

    // Event listener for province selection
    provinceSelection.addEventListener('change', function() {
        const selectedProvince = this.value;
        const selectedScenario = document.getElementById('land-allocation').value;
        const selectedCrop = document.getElementById('crop-selection').value;
        renderGraphs(selectedScenario, selectedCrop, selectedProvince);
    });

    // Function to render graphs
    function renderGraphs(scenario, crop, province) {
        const graphContainer = document.getElementById('graph-container');
        graphContainer.innerHTML = ''; // Clear existing graphs

        // Example data for different scenarios, crops, and provinces
        const data = {
            'Province 1': {
                historical: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
                climate: [12, 18, 22, 28, 32, 38, 42, 48, 52, 58],
                base: [14, 16, 24, 26, 34, 36, 44, 46, 54, 56]
            },
            'Province 2': {
                historical: [8, 12, 18, 22, 28, 32, 38, 42, 48, 52],
                climate: [10, 14, 20, 24, 30, 34, 40, 44, 50, 54],
                base: [12, 14, 22, 24, 32, 34, 42, 44, 52, 54]
            },
            'Province 3': {
                historical: [6, 10, 16, 20, 26, 30, 36, 40, 46, 50],
                climate: [8, 12, 18, 22, 28, 32, 38, 42, 48, 52],
                base: [10, 12, 20, 22, 30, 32, 40, 42, 50, 52]
            }
        };

        // Example for rendering a graph
        const chart = document.createElement('canvas');
        graphContainer.appendChild(chart);

        // Example for Chart.js
        new Chart(chart, {
            type: 'bar', // or 'line', etc.
            data: {
                labels: ['2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: `${crop} - Historical (${province})`,
                        backgroundColor: 'blue',
                        borderColor: 'blue',
                        data: data[province].historical
                    },
                    {
                        label: `${crop} - Climate (${province})`,
                        backgroundColor: 'green',
                        borderColor: 'green',
                        data: data[province].climate
                    },
                    {
                        label: `${crop} - Base (${province})`,
                        backgroundColor: 'red',
                        borderColor: 'red',
                        data: data[province].base
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Initial render
    const initialScenario = scenarioSelection.value;
    const initialCrop = cropSelection.value;
    const initialProvince = provinceSelection.value;
    renderGraphs(initialScenario, initialCrop, initialProvince);

    // Move chart type selection buttons to the top right corner
    const chartTypeButtons = document.querySelector('.chart-type-buttons');
    const visualizationContainer = document.querySelector('.visualization-container');
    visualizationContainer.insertBefore(chartTypeButtons, visualizationContainer.firstChild);

    // Style the slider
    const slider = document.querySelector('.slider');
    if (slider) {
        slider.style.width = '100%';
        slider.style.margin = '20px 0';
    }

    // ...existing code...
});
