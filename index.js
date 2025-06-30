process.env.TZ = 'Europe/Amsterdam';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import favicon from 'serve-favicon';
import dotenv from 'dotenv';
import { exec } from 'child_process';
dotenv.config();


// Database connection
let db;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Use memory store for sessions (simple in-memory storage)
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }, 
}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Initialize in-memory SQLite database
async function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error("Error creating in-memory database:", err);
        reject(err);
      } else {
        console.log("Connected to in-memory SQLite database!");
        
        // Create tables
        db.serialize(() => {
          // Create user table
          db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            network_id INTEGER NOT NULL
          )`);
          
          // Create report table
          db.run(`CREATE TABLE report (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            datetime DATETIME NOT NULL,
            voltage REAL NOT NULL,
            amperage REAL NOT NULL,
            network_id INTEGER NOT NULL
          )`);
          
          // Insert default test user (password: 'password123')
          const hashedPassword = bcrypt.hashSync('password123', 10);
          db.run(`INSERT INTO user (username, password, network_id) VALUES (?, ?, ?)`, 
            ['admin', hashedPassword, 1], (err) => {
              if (err) {
                console.error("Error creating default user:", err);
              } else {
                console.log("Default user created: admin/password123");
              }
              resolve();
            });
        });
      }
    });
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

app.post('/run-script', (req, res) => {
  exec('python script.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send('Error executing script');
    }
    console.log(`Script output: ${stdout}`);
    res.send('Script executed successfully');
  });
});

// Verwerkt login-aanvraag
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  try {
    db.get(
      'SELECT id, username, password, network_id FROM user WHERE username = ?',
      [username],
      async (err, row) => {
        if (err) {
          console.error("Error fetching user:", err);
          return res.status(500).json({ success: false, message: "Error logging in" });
        }
        
        if (row) {
          const storedPasswordHash = row.password.toString();
          const isMatch = await bcrypt.compare(password, storedPasswordHash);     
          
          if (isMatch) {
            req.session.userId = row.id;
            req.session.networkId = row.network_id;
            req.session.username = row.username;
            
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
      }
    );
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
    
    db.all(query, [networkId], (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err);
        res.status(500).send("Error fetching data");
      } else {
        res.json(rows);
      }
    });
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
      if (!db) {
          return res.status(500).send('Database connection not established');
      }
      
      // Create date in Amsterdam timezone
      const date = new Date();
      const formattedDate = date.toLocaleString('sv-SE', { 
        timeZone: 'Europe/Amsterdam' 
      }).replace('T', ' ');
      
      const query = `
        INSERT INTO report (datetime, voltage, amperage, network_id) 
        VALUES (?, ?, ?, ?)
      `;
      
      db.run(query, [formattedDate, voltage, amperage, network_id], function(err) {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).send("Error inserting data");
        } else {
          res.status(201).json({ 
            id: this.lastID, 
            localDate: formattedDate, 
            voltage, 
            amperage,
            network_id
          });
        }
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

// Start de Express-server op en initialiseert de database
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Sluit de databaseconnectie bij beëindiging van de server
process.on('SIGINT', async () => {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error("Error closing database:", err);
      } else {
        console.log("SQLite database connection closed.");
      }
    });
  }
  process.exit();
});
