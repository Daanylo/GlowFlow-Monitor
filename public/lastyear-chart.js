// Global variable for the chart
let lastYearChart;

function initializeLastYearChart() {
    const canvas = document.getElementById('lastyear-chart');
    const ctx = canvas.getContext('2d');

    if (lastYearChart) {
        lastYearChart.destroy();
    }

    // Generate labels for the last 12 months
    const labels = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i)); // Get each month timestamp for the last year
        return date.toLocaleString('default', { month: 'short', year: 'numeric' }); // Format as "MMM YYYY"
    });

    lastYearChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Power Usage (kWh)',
                data: Array(12).fill(0), // Initial empty data for 12 months
                backgroundColor: 'rgba(255, 196, 0, 0.2)',
                borderColor: 'rgba(255, 196, 0, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Power Usage (kWh)'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 50, // Set an appropriate step size
                        callback: function(value) {
                            return value.toFixed(1); // Format the y-axis numbers to 1 decimal place
                        }
                    },
                    grid: {
                        display: true
                    },
                    min: 0
                }
            }
        }
    });
}

function updateLastYearChart(reportData) {
    if (!reportData || reportData.length === 0 || !lastYearChart) {
        return;
    }

    const now = new Date();
    const groupedData = new Map();

    // Group data points by month (formatted as "MMM YYYY")
    reportData.forEach(row => {
        const rowTime = new Date(row.datetime);
        const monthYear = rowTime.toLocaleString('default', { month: 'short', year: 'numeric' });

        if (!groupedData.has(monthYear)) {
            groupedData.set(monthYear, []);
        }

        // Calculate power usage and store it for averaging
        const wattage = row.voltage * row.amperage;
        groupedData.get(monthYear).push(wattage);
    });

    // Generate labels for the last 12 months again, to ensure consistency
    const labels = Array.from({ length: 12 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - (11 - i));
        return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    });

    // Update the chart data with the new average values for each month
    lastYearChart.data.labels = labels;
    lastYearChart.data.datasets[0].data = labels.map(label => {
        const dataPoints = groupedData.get(label) || [];
        if (dataPoints.length === 0) return 0; // No data for this month

        // Average of all data points within this month
        const sum = dataPoints.reduce((acc, value) => acc + value, 0);
        return sum / dataPoints.length;
    });

    lastYearChart.update();
}
