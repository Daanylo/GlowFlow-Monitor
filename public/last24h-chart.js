// Globale variabele voor de 24-uurs grafiek
let last24HourChart;

// Initialiseer de 24-uurs grafiek en stel labels in voor de afgelopen 24 uur
async function initializeLast24HourChart() {
    const canvas = document.getElementById('last24h-chart');
    const ctx = canvas.getContext('2d');

    if (last24HourChart) {
        last24HourChart.destroy();
    }

    // Genereer labels voor de afgelopen 24 uur
    const labels = Array.from({ length: 24 }, (_, i) => {
        const date = new Date();
        date.setHours(date.getHours() - (23 - i), 0, 0, 0); // Normalize to the start of the hour
        return date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    });

    last24HourChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Average Power Usage (kWh)',
                data: Array(24).fill(0),
                backgroundColor: 'white',
                borderWidth: 1,
                hoverBackgroundColor: '#0d3840'
            }]
        },
        options: {
            responsive: true,
            animation: false,
            color: '#f29f05',
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Hour',
                        color: 'white'
                    },
                    ticks: {
                        color: '#f29f05'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        color: 'white',
                        text: 'Power Usage (kWh)'
                    },
                    ticks: {
                        beginAtZero: true,
                        color: '#f29f05',
                        stepSize: 10,
                        callback: function(value) {
                            return value.toFixed(1); // Formatteer de y-as waarden op 1 decimaal
                        }
                    },
                    grid: {
                        display: true,
                        color: '#f29f05'
                    },
                    min: 0,
                    max: 100
                }
            }
        }
    });
    updateLast24HourChart();
}

// Werk de 24-uurs grafiek bij met nieuwe gemiddelde waarden per uur
function updateLast24HourChart() {
    if (!reportData || reportData.length === 0 || !last24HourChart) {
        return;
    }

    const now = new Date();
    const groupedData = new Map();

    // Filter reportData to include only entries from the last 24 hours
    const last24HoursData = reportData.filter(row => {
        const rowTime = new Date(row.datetime);
        return (now - rowTime) <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    });

    // Groepeer datapunten per uur voor de afgelopen 24 uur
    last24HoursData.forEach(row => {
        const rowTime = new Date(row.datetime);
        // Normalize to start of the hour
        rowTime.setMinutes(0, 0, 0); // Set minutes, seconds, and milliseconds to 0
        const hourLabel = rowTime.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });

        if (!groupedData.has(hourLabel)) {
            groupedData.set(hourLabel, []);
        }

        // Bereken het stroomverbruik en sla het op voor het gemiddelde
        const wattage = row.voltage * row.amperage;
        groupedData.get(hourLabel).push(wattage);
    });

    // Genereer labels opnieuw voor consistentie (for the last 24 hours)
    const labels = Array.from({ length: 24 }, (_, i) => {
        const date = new Date();
        date.setHours(date.getHours() - (23 - i));
        date.setMinutes(0, 0, 0); // Normalize to the start of the hour
        return date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    });

    // Werk de grafiekgegevens bij met de nieuwe gemiddelde waarden per uur
    last24HourChart.data.labels = labels;
    last24HourChart.data.datasets[0].data = labels.map(label => {
        const dataPoints = groupedData.get(label) || [];
        if (dataPoints.length === 0) return 0;

        // Bereken het gemiddelde van alle datapunten binnen dit uur
        const sum = dataPoints.reduce((acc, value) => acc + value, 0);
        return sum / dataPoints.length;
    });

    last24HourChart.update();
}

document.getElementById('refresh-last24h').addEventListener('click', function() {
    this.stop();
    this.seek(0);
    this.play();
    updateLast24HourChart();
});

