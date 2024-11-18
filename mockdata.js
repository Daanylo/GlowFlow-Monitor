import axios from 'axios';
import mysql from 'mysql2/promise';

// Setup MySQL connection
const connection = await mysql.createConnection({
    host: '34.70.180.208',
    user: 'daan',
    password: 'Daanww@22',
    database: 'streetlight_db'
});

// Function to generate random values
function generateMockValues() {
    return {
        voltage: 5 + (Math.random() - 0.5),
        amperage: 0.5 + Math.random() * 1.5
    };
}

// Function to insert one row of data
async function insertMockData() {
    const network_id = 1;
    try {
        const { voltage, amperage } = generateMockValues();

        // Send data as a POST request to /api/reports
        // const response = await axios.post('https://gfmonitor-gwfw7a1a.b4a.run/api/reports', {
        //     voltage,
        //     amperage,
        //     network_id
        // });

        const response = await axios.post('http://localhost:3000/api/reports', {
            voltage,
            amperage,
            network_id
        });

        console.log(`Added data: ${response.data.localDate}, ${voltage.toFixed(2)}V, ${amperage.toFixed(2)}A, ${network_id}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Insert data every second
setInterval(insertMockData, 1000);