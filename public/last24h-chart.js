// Globale variabele voor de 24-uurs grafiek
let last24HourChart;

// Initialiseer de 24-uurs grafiek en stel labels in voor de afgelopen 24 uur
function initializeLast24HourChart() {
    const canvas = document.getElementById('last24h-chart');
    const ctx = canvas.getContext('2d');

    if (last24HourChart) {
        last24HourChart.destroy();
    }

    // Genereer labels voor de afgelopen 24 uur
    const labels = Array.from({ length: 24 }, (_, i) => {
        const date = new Date();
        date.setHours(date.getHours() - (23 - i)); // Elk label is een uur geleden
        return date.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });
    });

    last24HourChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gemiddeld stroomverbruik (kWh)',
                data: Array(24).fill(0),
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
                        text: 'Uur'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Stroomverbruik (kWh)'
                    },
                    ticks: {
                        beginAtZero: true,
                        stepSize: 10,
                        callback: function(value) {
                            return value.toFixed(1); // Formatteer de y-as waarden op 1 decimaal
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

// Werk de 24-uurs grafiek bij met nieuwe gemiddelde waarden per uur
function updateLast24HourChart(reportData) {
    if (!reportData || reportData.length === 0 || !last24HourChart) {
        return;
    }

    const now = new Date();
    const groupedData = new Map();

    // Groepeer datapunten per uur voor de afgelopen 24 uur
    reportData.forEach(row => {
        const rowTime = new Date(row.datetime);
        const hourLabel = rowTime.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });

        if (!groupedData.has(hourLabel)) {
            groupedData.set(hourLabel, []);
        }

        // Bereken het stroomverbruik en sla het op voor het gemiddelde
        const wattage = row.voltage * row.amperage;
        groupedData.get(hourLabel).push(wattage);
    });

    // Genereer labels opnieuw voor consistentie
    const labels = Array.from({ length: 24 }, (_, i) => {
        const date = new Date();
        date.setHours(date.getHours() - (23 - i));
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
