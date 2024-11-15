// Global variable for the chart
let lasthour_chart;

async function initializeLastHourChart() {
    const canvas = document.getElementById('lasthour-chart');
    const ctx = canvas.getContext('2d');

    if (lasthour_chart) {
        lasthour_chart.destroy();
    }

    // Initialize labels with the last 60 minutes
    const labels = Array.from({ length: 60 }, (_, i) => {
        const date = new Date();
        date.setMinutes(date.getMinutes() - (59 - i), 0, 0); // Get each minute timestamp for the last hour
        return date.toTimeString().slice(0, 5); // Format as HH:MM
    });

    lasthour_chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Power Usage (kWh)',
                data: Array(60).fill(0), // Initial empty data for 60 minutes
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
                        text: 'Time (HH:MM)'
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
                        stepSize: 1, // Set a step size for readability
                        callback: function(value) {
                            return value.toFixed(1); // Format the y-axis numbers to 1 decimal place
                        }
                    },
                    grid: {
                        display: true
                    },
                    min: 0,
                    max: 10
                }
            }
        }
    });
    const reportData = await getReportsLast1Hour();
    updateLastHourChart(reportData);
}

function updateLastHourChart(reportData) {
    if (!reportData || reportData.length === 0 || !lasthour_chart) {
        return;
    }
    const now = new Date();
    const groupedData = new Map();

    // Group data points by minute timestamp (formatted as "HH:MM")
    reportData.forEach(row => {
        const rowTime = new Date(row.datetime);
        const minuteTimestamp = rowTime.toTimeString().slice(0, 5); // "HH:MM" format

        if (!groupedData.has(minuteTimestamp)) {
            groupedData.set(minuteTimestamp, []);
        }

        // Calculate power usage and store it for averaging
        const wattage = row.voltage * row.amperage;
        groupedData.get(minuteTimestamp).push(wattage);
    });

    // Shift the labels and data for the last 60 minutes
    const labels = Array.from({ length: 60 }, (_, i) => {
        const date = new Date(now - (59 - i) * 60 * 1000); // Get each minute timestamp for the last hour
        return date.toTimeString().slice(0, 5); // Format as HH:MM
    });

    // Update the chart data with the new average values
    lasthour_chart.data.labels = labels;
    lasthour_chart.data.datasets[0].data = labels.map(label => {
        const dataPoints = groupedData.get(label) || [];
        if (dataPoints.length === 0) return 0; // No data for this minute

        // Average of all data points within this minute
        const sum = dataPoints.reduce((acc, value) => acc + value, 0);
        return sum / dataPoints.length;
    });

    lasthour_chart.update();
}
