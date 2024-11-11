// mockdata.js
import mysql from 'mysql2/promise';

// Setup MySQL connection
const connection = await mysql.createConnection({
    host: '192.168.154.189',
    user: 'daan',
    password: 'Daanpassword@22',
    database: 'glowflow'
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
    try {
        const { voltage, amperage } = generateMockValues();

        // Get local time and manually adjust for timezone offset
        const localDate = new Date();
        const timezoneOffset = localDate.getTimezoneOffset(); // Get timezone offset in minutes
        const localDatetime = new Date(localDate.getTime() - timezoneOffset * 60000).toISOString().slice(0, 19).replace('T', ' ');

        await connection.execute(
            'INSERT INTO report (datetime, voltage, amperage) VALUES (?, ?, ?)',
            [localDatetime, voltage, amperage]
        );
        
        console.log(`Added data: ${localDatetime}, ${voltage.toFixed(2)}V, ${amperage.toFixed(2)}A`);
    } catch (error) {
        console.error('Error:', error);
    }
}


// Insert data every second
setInterval(insertMockData, 1000);
console.log('Started adding mock data...');