import mysql from 'mysql2/promise.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import favicon from 'serve-favicon';

// Database connectie
let connection;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// const dbConfig = {
//     host: 'sql7.freemysqlhosting.net',
//     user: 'sql7744543',
//     password: '1hhmCLXW2Q',
//     database: 'sql7744543',
// };

const dbConfig = {
  host: '34.70.180.208',
  user: 'daan',
  password: 'Daanww@22',
  database: 'streetlight_db',
};

// const dbConfig = {
//   host: '192.168.154.189',
//   user: 'daan',
//   password: 'Daanpassword@22',
//   database: 'glowflow',
// };

// Maakt verbinding met de database
async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
}

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

// Verifieert of gebruiker is ingelogd; anders omleiden naar login
function ensureAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

// Laadt monitorpagina als gebruiker is ingelogd
app.get('/monitor', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.sendFile(path.join(__dirname, 'public', 'reports.html'));
});

// Controleert ingelogde gebruiker
app.get('/api/username', (req, res) => {
  if (req.session.username) {
    res.json({ username: req.session.username });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

// Laadt loginpagina
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Verwerkt login-aanvraag
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
      req.session.userId = rows[0].id;
      req.session.networkId = rows[0].network_id;
      req.session.username = rows[0].username;
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ success: false, message: "Error logging in" });
  }
});

// Haalt data uit database op en retourneert in JSON-formaat
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

// Verwerkt nieuwe data en voegt deze toe aan de database
app.post('/api/reports', async (req, res) => {
  const { voltage, amperage, network_id } = req.body;
  if (!voltage || !amperage || !network_id) {
      return res.status(400).send('Missing required fields');
  }
  try {
      if (!connection) {
          return res.status(500).send('Database connection not established');
      }
      const localDate = new Date();
      const query = 'INSERT INTO report (datetime, voltage, amperage, network_id) VALUES (?, ?, ?, ?)';
      const [result] = await connection.execute(query, [localDate, voltage, amperage, network_id]);
      res.status(201).json({ 
        id: result.insertId, 
        localDate, 
        voltage, 
        amperage,
        network_id
      });
  } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).send("Error inserting data");
  }
});

// Verwerkt uitlog-aanvraag en vernietigt de sessie
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error logging out:", err);
      return res.status(500).send("Error logging out");
    }
    res.redirect('/login');
  });
});

const PORT = process.env.PORT || 3000;

// Start de Express-server op en maakt verbinding met de database
app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Sluit de databaseconnectie bij beëindiging van de server
process.on('SIGINT', async () => {
  if (connection) {
    await connection.end();
    console.log("MySQL connection closed.");
  }
  process.exit();
});
