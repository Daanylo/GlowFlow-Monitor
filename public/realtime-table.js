let reportData = [];
// Haalt de data op van de /api/reports
async function fetchReports() {
    const response = await fetch(`/api/reports`);
    if (!response.ok) throw new Error("Error fetching data from server");
    const data = await response.json();
    reportData = data; 
}

function formatDate(dateString) {
  const date = new Date(dateString);
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

function initializeTable() {
  const tableBody = document.querySelector("#report-table tbody");
  tableBody.innerHTML = '';
  
  const initialRow = document.createElement('tr');
  initialRow.innerHTML = `
    <td>Loading...</td>
    <td>Loading...</td>
    <td>Loading...</td>
  `;
  tableBody.appendChild(initialRow);
}

// Function to update the table with new data
function updateTable() {
  const tableBody = document.querySelector("#report-table tbody");
  tableBody.innerHTML = '';
  if (!reportData || reportData.length === 0) {
    return;
  }

  const sortedData = reportData.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  // Get the 5 most recent reports
  const recentReports = sortedData.slice(0, 5);

  recentReports.forEach(row => {
    const rowElement = document.createElement('tr');
    rowElement.innerHTML = `
      <td>${row.id}</td>
      <td>${formatDate(row.datetime)}</td>
      <td>${(row.voltage * row.amperage).toFixed(2)}</td>
    `;
    tableBody.appendChild(rowElement);
  });
}

window.onload = async function () {
  await fetchReports();
  initializeRealtimeChart();
  initializeLastHourChart();
  initializeLastYearChart();
  initializeLast24HourChart();
  initializeTable();

  setInterval(async () => {
    await fetchReports();
    updateTable();
    updateInfoBar();
    updateRealtimeChart();
  }, 1000);
};


  