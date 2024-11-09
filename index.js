import mysql from 'mysql2/promise.js';
import express from 'express'; 
import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
    host: '192.168.154.189',
    user: 'daan',
    password: 'Daanpassword@22',
    database: 'glowflow'
};

let connection;

async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
}

app.get('/reports', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'reports.html'));
  } catch (error) {
    res.status(500).send("Error loading the HTML file");
  }
});

app.get('/api/reports', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT id, datetime, voltage, amperage FROM report');
        
        rows.forEach(row => {
            row.datetime = new Date(row.datetime).toLocaleString();
        });

        res.json(rows);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  if (connection) {
    await connection.end();
    console.log("MySQL connection closed.");
  }
  process.exit();
});
