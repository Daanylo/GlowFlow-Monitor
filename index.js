import mysql from 'mysql2/promise.js';
import express from 'express'; 
import path from 'path'; 
import { fileURLToPath } from 'url';

// Database connectie
let connection;
// Definieert het pad naar index.js
const __filename = fileURLToPath(import.meta.url);
// Definieert de naam van de folder waar index.js in zit
const __dirname = path.dirname(__filename);

// Wijst de Express app toe aan constante 'app'
const app = express();

// Module die json omzet in js objects en andersom
app.use(express.json());
// Module die een pad definieert naar de public folder
app.use(express.static(path.join(__dirname, 'public')));

// Database configuratie
const dbConfig = {
    host: '192.168.154.189',
    user: 'daan',
    password: 'Daanpassword@22',
    database: 'glowflow'
};

// Maakt verbinding met database
async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
}

app.post('/api/start-mock-data', (req, res) => {
  mockData.startMockDataGeneration();
  res.json({ message: 'Mock data generation started' });
});

// Wordt geroepen wanneer een GET-request gestuurd wordt naar /reports
// Stuurt het reports.html bestand terug
app.get('/reports', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'reports.html'));
  } catch (error) {
    res.status(500).send("Error loading the HTML file");
  }
});

// Wordt geroepen wanneer een GET-request gestuurd wordt naar /api/reports
// Stuurt de data uit database terug in json formaat
app.get('/api/reports', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT id, datetime, voltage, amperage FROM report');
        res.json(rows);
    } catch (error) {
      return;
        // console.error("Error fetching data:", error);
        // res.status(500).send("Error fetching data");
    }
});

// Wordt geroepen wanneer er een POST-request ontvangen wordt op /api/reports
// Zet de json data om naar een sql query en voegt de data toe aan de database
app.post('/api/reports', async (req, res) => {
  const { datetime, voltage, amperage } = req.body;
  if (!datetime || !voltage || !amperage) {
      return res.status(400).send('Missing required fields');
  }
  try {
      if (!connection) {
          return res.status(500).send('Database connection not established');
      }
      const query = 'INSERT INTO report (datetime, voltage, amperage) VALUES (?, ?, ?)';
      const [result] = await connection.execute(query, [datetime, voltage, amperage]);
      res.status(201).json({ 
        id: result.insertId, 
        datetime, 
        voltage, 
        amperage 
      });
  } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Error inserting data");
  }
});

// Wijst poort 3000 toe aan variabele PORT, tenzij process.env.PORT een andere poort bevat
const PORT = process.env.PORT || 3000;

// Wordt geroepen wanneer Express server start. Gaat luisteren naar HTTP requests op poort 3000
// Wacht met voltooien totdat verbinding met database is gelegd
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Wordt geroepen wannneer "signal interrupt" event ontvangen wordt (ctrl+c in terminal)
// Wacht met afsluiten node.js proces totdat database connectie veilig is gesloten
process.on('SIGINT', async () => {
  if (connection) {
    await connection.end();
    console.log("MySQL connection closed.");
  }
  process.exit();
});
