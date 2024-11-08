// Function to fetch and update the table
async function updateTable() {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
  
      const tableBody = document.querySelector('#report-table tbody');
      tableBody.innerHTML = ''; // Clear any existing rows
  
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.time}</td>
          <td>${row.voltage}</td>
          <td>${row.amperage}</td>
        `;
        tableBody.appendChild(tr);
      });
    } catch (error) {
      console.error('Error fetching the data:', error);
    }
  }
  
  // Initial load of data when the page is loaded
  window.onload = () => {
    updateTable(); // Load data initially
  
    // Set an interval to update the table every 5 seconds (5000 ms)
    setInterval(updateTable, 1000);
  };
  