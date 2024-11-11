import mysql from 'mysql2/promise.js';
import express from 'express'; 
import path from 'path'; 
import { fileURLToPath } from 'url';
import session from 'express-session';

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

app.use(express.urlencoded({ extended: true }));

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

app.use(session({
  secret: 'your_secret_key', // Change to a strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

function ensureAuthenticated(req, res, next) {
  if (req.session.userId) {
      return next();
  }
  res.redirect('/login');
}

// Wordt geroepen wanneer een GET-request gestuurd wordt naar /reports
// Stuurt het reports.html bestand terug
app.get('/monitor', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redirect to login if not authenticated
  }
  res.sendFile(path.join(__dirname, 'public', 'reports.html'));
});

app.get('/login', async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
  } catch (error) {
    res.status(500).send("Error loading the HTML file");
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  try {
    const [rows] = await connection.execute(
      'SELECT * FROM user WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      // Store user ID in session and redirect to /monitor
      req.session.userId = rows[0].id;
      req.session.networkId = rows[0].network_id; // Store network_id for later use
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Error logging in" });
  }
});


// Wordt geroepen wanneer een GET-request gestuurd wordt naar /api/reports
// Stuurt de data uit database terug in json formaat
app.get('/api/reports', ensureAuthenticated, async (req, res) => {
  try {
      const networkId = req.session.networkId;
      const [rows] = await connection.execute(
          'SELECT id, datetime, voltage, amperage FROM report WHERE network_id = ?',
          [networkId]
      );
      res.json(rows);
  } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).send("Error fetching data");
  }
});

// Wordt geroepen wanneer er een POST-request ontvangen wordt op /api/reports
// Zet de json data om naar een sql query en voegt de data toe aan de database
app.post('/api/reports', async (req, res) => {
  const { datetime, voltage, amperage, network_id } = req.body;
  if (!datetime || !voltage || !amperage || !network_id) {
      return res.status(400).send('Missing required fields');
  }
  try {
      if (!connection) {
          return res.status(500).send('Database connection not established');
      }
      const query = 'INSERT INTO report (datetime, voltage, amperage, network_id) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [datetime, voltage, amperage, network_id]);
      res.status(201).json({ 
        id: result.insertId, 
        datetime, 
        voltage, 
        amperage,
        network_id
      });
  } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Error inserting data");
  }
});

app.post('/logout', (req, res) => {
  // Destroy the session and redirect to the login page
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect('/login'); // Redirect to login page after logout
  });
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
