const mysql = require('mysql2');
const express = require('express'); 
const path = require('path'); 
const { fileURLToPath } = require('url');

// Convert the __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files (JS, CSS, images, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Database configuration
const dbConfig = {
  host: '192.168.154.199',
  user: 'daan',
  password: 'Daanpassword@22',
  database: 'streetlight_db'
};

let connection;

// Connect to the database
async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
}

// Route to serve the reports.html file from the "public" folder
app.get('/reports', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'reports.html')); // Serve HTML file from the "public" folder
  } catch (error) {
    res.status(500).send("Error loading the HTML file");
  }
});

// API endpoint to fetch the latest data as JSON
app.get('/api/reports', async (req, res) => {
    try {
        // Select id, datetime, voltage, and amperage fields from the report table
        const [rows] = await connection.execute('SELECT id, time, voltage, amperage FROM report');
        
        // Format datetime if needed
        rows.forEach(row => {
            row.datetime = new Date(row.datetime).toLocaleString(); // Format the datetime string to a more readable format
        });

        res.json(rows); // Send data to the frontend
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

// Start the server and connect to the database
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Close the database connection when the application ends
process.on('SIGINT', async () => {
  if (connection) {
    await connection.end();
    console.log("MySQL connection closed.");
  }
  process.exit();
});
