async function updateTable() {
    try {
      const response = await fetch('/api/reports');
      const data = await response.json();
  
      const tableBody = document.querySelector('#report-table tbody');
      tableBody.innerHTML = '';
  
      data.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${row.id}</td>
          <td>${row.datetime}</td>
          <td>${row.voltage}</td>
          <td>${row.amperage}</td>
        `;
        tableBody.appendChild(tr);
      });
    } catch (error) {
      console.error('Error fetching the data:', error);
    }
  }

  window.onload = () => {
    updateTable();
    
    setInterval(updateTable, 1000);
  };
  