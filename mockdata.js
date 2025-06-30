import axios from 'axios';

// Note: Since we're now using an in-memory SQLite database, 
// we can only interact with it through the API endpoints

// Function to generate random values
function generateMockValues() {
    return {
        voltage: 5 + (Math.random() - 0.5),
        amperage: 0.5 + Math.random() * 1.5
    };
}

// Function to insert one row of data via API
async function insertMockData() {
    const network_id = 1;
    try {
        const { voltage, amperage } = generateMockValues();

        // Send data as a POST request to /api/reports
        const response = await axios.post('http://localhost:3000/api/reports', {
            voltage,
            amperage,
            network_id
        });

        console.log(`Added data: ${response.data.localDate}, ${voltage.toFixed(2)}V, ${amperage.toFixed(2)}A, ${network_id}`);
    } catch (error) {
        console.error('Error adding mock data:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

// Wait a bit for the server to start, then begin inserting data every second
console.log('Mock data generator starting...');
console.log('Make sure the main server is running on http://localhost:3000');

setTimeout(() => {
    console.log('Starting to send mock data every second...');
    setInterval(insertMockData, 1000);
}, 2000); // Wait 2 seconds before starting