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
        // ...existing code...
        data: {
            datasets: [
                {
                    label: 'Water',
                    backgroundColor: chartColors.water,
                    borderColor: chartColors.water,
                    // ...existing code...
                },
                {
                    label: 'Land',
                    backgroundColor: chartColors.land,
                    borderColor: chartColors.land,
                    // ...existing code...
                }
            ]
        },
        // ...existing code...
    };

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

    // ...existing code...
});
