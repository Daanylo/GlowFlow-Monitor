let reportData = [];

// Haalt de data op van de /api/reports
async function fetchReports() {
  try {
    const response = await fetch('/api/reports');
    const data = await response.json();
    reportData = data;
    updateTable();
    updateChart();
    updateLastHourChart(reportData);
    updateInfoBar(reportData);
    updateLastYearChart(reportData);
    updateLast24HourChart(reportData);
  } catch (error) {
    console.error('Error fetching the data:', error);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 1);
  return date.toLocaleString('nl-NL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).replace(',', '');
}
function updateTable() {
  const tableBody = document.querySelector("#report-table tbody");
  tableBody.innerHTML = '';
  
  // Show only the last 5 reports
  const latestReports = reportData.slice(-5); // Get the last 5 reports
  
  latestReports.forEach(row => {
    const rowElement = document.createElement('tr');
    rowElement.innerHTML = `
      <td>${row.id}</td>
      <td>${formatDate(row.datetime)}</td>
      <td>${(row.voltage * row.amperage).toFixed(2)}</td>
    `;
    tableBody.appendChild(rowElement);
  });
}

// Update de tabel elke seconde
window.onload = function () {
  initializeChart();
  initializeLastHourChart();
  initializeLastYearChart();
  initializeLast24HourChart();
  fetchReports();
  setInterval(fetchReports, 1000); 
}

  