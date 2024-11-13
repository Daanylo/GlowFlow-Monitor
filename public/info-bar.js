// Assuming reportData is available globally, or is passed to this function
function updateInfoBar(reportData) {
    if (!reportData || reportData.length === 0) {
        return;
    }

    const now = new Date();
    
    // Helper function to calculate total kWh for a given time range// Helper function to calculate total kWh for a given time range
function calculateTotalKWh(startTime, endTime) {
    const totalWattage = reportData.filter(row => {
        const rowTime = new Date(row.datetime);
        return rowTime >= startTime && rowTime <= endTime;
    }).reduce((sum, row) => {
        const wattage = row.voltage * row.amperage; // Wattage = Voltage * Amperage
        return sum + wattage;
    }, 0);

    // Convert Wattage to kWh (divide by 1000 to convert Watts to Kilowatts)
    return totalWattage / 1000;
}

// Calculate the total kWh for the current session (last minute)
const currentUsage = calculateTotalKWh(new Date(now - 60 * 1000), now); // Last 60 seconds
document.getElementById('current-usage').innerText = `${currentUsage.toFixed(2)} kWh`;

// Calculate the total kWh for the last 24 hours
const last24hUsage = calculateTotalKWh(new Date(now - 24 * 60 * 60 * 1000), now); // Last 24 hours
document.getElementById('last-24h-usage').innerText = `${last24hUsage.toFixed(2)} kWh`;

// Calculate the total kWh for the last month (30 days)
const lastMonthUsage = calculateTotalKWh(new Date(now - 30 * 24 * 60 * 60 * 1000), now); // Last 30 days
document.getElementById('last-month-usage').innerText = `${lastMonthUsage.toFixed(2)} kWh`;

// Calculate money saved (assuming $0.12 per kWh)
const costPerKWh = 0.12; // This is a realistic average cost
const moneySaved = lastMonthUsage * costPerKWh;
document.getElementById('money-saved').innerText = `€${moneySaved.toFixed(2)}`;

}

document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch('/api/username', {
        credentials: 'same-origin' // Ensures cookies are sent with the request
      });

      if (response.ok) {
        const data = await response.json();
        document.getElementById('username').textContent = data.username;
      } else {
        console.error("Error: Not logged in or session expired.");
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  });