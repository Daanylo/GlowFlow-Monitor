process.env.TZ = 'Europe/Amsterdam';
import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import favicon from 'serve-favicon';
import expressMySqlSession from "express-mysql-session";
import dotenv from 'dotenv';
dotenv.config();


// Database connectie
let connection;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
let sessionStore;
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: sessionStore,  
  cookie: { secure: false }, 
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Database configuratie
const dbConfig = {
  host: '34.70.180.208',
  user: 'daan',
  password: process.env.DB_PASSWORD,
  database: 'streetlight_db',
  timezone: process.env.NODE_ENV === 'production' ? 'Z' : '+01:00',
};

// Maakt verbinding met de database
async function connectToDatabase() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL database!");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
  }
}

async function createSessionStore() {
  const MySQLStore = expressMySqlSession(session);
  sessionStore = new MySQLStore({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    expiration: 86400000,
    createDatabaseTable: true,
    schema: {
      tableName: 'sessions',
      columnNames: {
        session_id: 'session_id',
        expires: 'expires',
        data: 'data',
      },
    },
  });
}


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

app.get('/', (req, res) => {
  res.redirect('/login');
})

// Verwerkt login-aanvraag
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  try {
    const [rows] = await connection.execute(
      'SELECT id, username, password, network_id FROM user WHERE username = ?',
      [username]
    );
    
    if (rows.length > 0) {
      const user = rows[0];

      const storedPasswordHash = user.password.toString();
      const isMatch = await bcrypt.compare(password, storedPasswordHash);     
      if (isMatch) {
        // Use a single response
        req.session.userId = user.id;
        req.session.networkId = user.network_id;
        req.session.username = user.username;
        
        // Save session and send response in one place
        req.session.save((err) => {
          if (err) {
            console.error('Session save error:', err);
            return res.status(500).json({ success: false, message: "Session save failed" });
          }
          console.log('Session data:', {
            sessionId: req.sessionID,
            userId: req.session.userId,
            username: req.session.username
          });
          return res.json({ success: true });
        });
      } else {
        return res.status(401).json({ success: false, message: "Invalid username or password" });
      }
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
    const query = `
      SELECT id, datetime, voltage, amperage 
      FROM report 
      WHERE network_id = ? 
    `;
    const [rows] = await connection.execute(query, [networkId]);
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
      const localDate = new Date().toISOString(); // UTC date
      const query = `
        INSERT INTO report (datetime, voltage, amperage, network_id) 
        VALUES (CONVERT_TZ(?, '+00:00', 'Europe/Amsterdam'), ?, ?, ?)
      `;
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
      return res.status(500).send("Error logging out");
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

const PORT = process.env.PORT || 3000;

// Start de Express-server op en maakt verbinding met de database
app.listen(PORT, async () => {
  await connectToDatabase();
  await createSessionStore();
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
