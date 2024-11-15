// Global variable where the report data is stored
let realtime_chart;

async function initializeRealtimeChart() {
    const canvas = document.getElementById('wattage-chart');
    const ctx = canvas.getContext('2d');

    if (realtime_chart) {
        realtime_chart.destroy();
    }

    realtime_chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [], // Will be populated with timestamps later
            datasets: [{
                label: 'Wattage (W)',
                data: Array(31).fill(0), // Initial empty data
                backgroundColor: 'rgba(255, 196, 0, 0.2)',
                borderColor: 'rgba(255, 196, 0, 1)',
                borderWidth: 2,
                fill: true, // Fill the area below the graph
                tension: 0, // Smooth the line
                pointRadius: 0, // Remove dots from the line
            }]
        },
        options: {
            responsive: true,
            animation: false,
            scales: {
                x: {
                    type: 'time', // Time scale for the x-axis
                    time: {
                        unit: 'second', // Each tick is one second
                        tooltipFormat: 'll HH:mm:ss', // Tooltip format for readability
                    },
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    grid: {
                        display: false, // Hide the gridlines
                    }
                },
                y: {
                    ticks: {
                        beginAtZero: true,
                        stepSize: 1, // Set a step size for readability
                        callback: function(value) {
                            return value.toFixed(1); // Format the y-axis numbers to 1 decimal place
                        }
                    },
                    title: {
                        display: true,
                        text: 'Wattage (W)'
                    },
                    grid: {
                        display: false, // Hide the gridlines
                    },
                    min: 0,
                    max: 10
                }
            },
            plugins: {
                legend: {
                    display: false // Hide the legend
                },
                tooltip: {
                    enabled: false // Disable tooltips if not needed
                }
            }
        }
    });
    const reportData = await getReportsLast60Seconds();
    updateRealtimeChart(reportData);
}

// Update the chart
function updateRealtimeChart(reportData) {
    if (!reportData || reportData.length === 0 || !realtime_chart) {
        return;
    }

    const now = new Date();
    const data = Array(31).fill(0); // Initialize with 0s (no data means 0 wattage)
    const labels = []; // Will store the timestamps for the x-axis

    // Adjust time to allow for 2 seconds of delay
    const shiftedTime = new Date(now - 2 * 1000); // Shift the current time by 2 seconds

    // Collect data for the last 30 seconds (shifted time)
    for (let i = 0; i < 30; i++) {
        const pastTime = new Date(shiftedTime - (30 - i) * 1000); // 30, 29, ..., 1, 0 seconds ago
        labels.push(pastTime); // Add the timestamp for each second

        // Get data for the respective second
        const dataForSecond = reportData.filter(row => {
            const rowTime = new Date(row.datetime);
            const secondsAgo = Math.floor((shiftedTime - rowTime) / 1000);
            return secondsAgo === (30 - i); // Match the second timestamp
        });

        // Calculate the wattage if data exists for the specific second
        if (dataForSecond.length > 0) {
            const totalWattage = dataForSecond.reduce((sum, row) => sum + (row.voltage * row.amperage), 0);
            data[i] = totalWattage / dataForSecond.length; // Calculate the average for the second
        }
    }

    // Add the most recent timestamp (Now) - This will be 0 if no new data exists
    const currentLabel = new Date(shiftedTime);
    labels.push(currentLabel);

    // Add the current data point (for Now) - This will be 0 if no new data exists
    const recentData = reportData.filter(row => {
        const rowTime = new Date(row.datetime);
        const secondsAgo = Math.floor((shiftedTime - rowTime) / 1000);
        return secondsAgo === 0; // Match the current second
    });

    if (recentData.length > 0) {
        const totalWattage = recentData.reduce((sum, row) => sum + (row.voltage * row.amperage), 0);
        data[30] = totalWattage / recentData.length; // Average for the current second
    }

    // Update the chart with the new labels and data
    realtime_chart.data.labels = labels;
    realtime_chart.data.datasets[0].data = data;
    realtime_chart.update();
}


