// Haalt de data op van de /api/reports
async function fetchReportsWithinTimeRange(startTime, endTime) {
  try {
    const start = formatDateToMySQL(startTime);
    const end = formatDateToMySQL(endTime);
    
    const response = await fetch(`/api/reports?startTime=${encodeURIComponent(start)}&endTime=${encodeURIComponent(end)}`);
    if (!response.ok) throw new Error("Error fetching data from server");
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data from the database");
  }
}

async function fetchLatestReports() {
  try {
    const response = await fetch(`/api/reports/latest`);
    if (!response.ok) throw new Error("Error fetching latest reports from server");
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching latest reports:", error);
    throw new Error("Error fetching data from the database");
  }
}

// Utility function to format Date to MySQL-compatible string
function formatDateToMySQL(date) {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// Fetch data from the last 60 seconds
async function getReportsLast60Seconds() {
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 60 * 1000); // 60 seconds ago
  return fetchReportsWithinTimeRange(startTime, endTime);
}

// Fetch data from the last 1 hour
async function getReportsLast1Hour() {
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 60 * 60 * 1000); // 1 hour ago
  return fetchReportsWithinTimeRange(startTime, endTime);
}

// Fetch data from the last 24 hours
async function getReportsLast24Hours() {
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
  return fetchReportsWithinTimeRange(startTime, endTime);
}

// Fetch data from the last 1 year
async function getReportsLast1Year() {
  const endTime = new Date();
  const startTime = new Date(endTime.getTime() - 365 * 24 * 60 * 60 * 1000); // 1 year ago
  return fetchReportsWithinTimeRange(startTime, endTime);
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
function initializeTable() {
  const tableBody = document.querySelector("#report-table tbody");
  tableBody.innerHTML = '';  // Clear any existing rows
  
  // Optionally, add an initial loading row (which will be replaced later)
  const initialRow = document.createElement('tr');
  initialRow.innerHTML = `
    <td>Loading...</td>
    <td>Loading...</td>
    <td>Loading...</td>
  `;
  tableBody.appendChild(initialRow);
}

// Function to update the table with new data
function updateTable(reportData) {
  const tableBody = document.querySelector("#report-table tbody");
  
  // Clear the existing table data
  tableBody.innerHTML = '';

  // If there is no new data, do nothing
  if (!reportData || reportData.length === 0) {
    return;
  }

  // Loop through the latest reports (only add up to 5 reports)
  const latestReports = reportData.slice(0, 5);
  
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

window.onload = function () {
  initializeRealtimeChart();
  initializeLastHourChart();
  initializeLastYearChart();
  initializeLast24HourChart();
  initializeTable();

  // Fetch and update table with latest 5 reports every second
  setInterval(async () => {
    const reportData = await fetchLatestReports();
    updateTable(reportData);
  }, 1000);

  // Fetch and update data every second for realtime data
  setInterval(async () => {
    const reportData = await getReportsLast60Seconds();
    updateRealtimeChart(reportData);
  }, 1000);

  // Fetch and update data every 60 seconds for the last hour chart
  setInterval(async () => {
    const reportData = await getReportsLast1Hour();
    updateLastHourChart(reportData);
  }, 60000);

  // Fetch and update data every 60 seconds for the last 24 hours chart
  setInterval(async () => {
    const reportData = await getReportsLast24Hours();
    updateLast24HourChart(reportData);
  }, 60000);

  // Fetch and update data every 60 seconds for the last year chart
  setInterval(async () => {
    const reportData = await getReportsLast1Year();
    updateLastYearChart(reportData);
    updateInfoBar(reportData);
  }, 60000);
};


  