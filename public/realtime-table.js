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
  } catch (error) {
    console.error('Error fetching the data:', error);
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
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
  reportData.forEach(row => {
    const rowElement = document.createElement('tr');
    rowElement.innerHTML = `
      <td>${row.id}</td>
      <td>${formatDate(row.datetime)}</td>
      <td>${row.voltage}</td>
      <td>${row.amperage}</td>
    `;
    tableBody.appendChild(rowElement);
  });
}

// Update de tabel elke seconde
window.onload = function () {
  initializeChart();
  initializeLastHourChart();
  fetchReports();
  setInterval(fetchReports, 1000); 
}

  