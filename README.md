# GlowFlow Monitor

<div align="center">
  <img src="public/logoWhite.png" alt="GlowFlow Logo" width="300"/>
</div>

## 📋 Overview

GlowFlow Monitor is a real-time monitoring system for streetlight networks. It provides a web-based dashboard to track voltage and amperage readings from streetlight sensors, allowing for efficient monitoring and maintenance of street lighting infrastructure.

## ✨ Features

- **Real-time Monitoring**: Live tracking of voltage and amperage readings
- **Web Dashboard**: Interactive charts and data visualization
- **User Authentication**: Secure login system with session management
- **In-Memory Database**: Fast SQLite database for data storage
- **Mock Data Generation**: Built-in test data generator for development
- **Responsive Design**: Mobile-friendly web interface
- **RESTful API**: Clean API endpoints for data access

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd GlowFlowMonitor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and go to `http://localhost:3000`

### Default Login Credentials

- **Username**: `admin`
- **Password**: `password123`

## 🗂️ Project Structure

```
GlowFlowMonitor/
├── public/                 # Static web files
│   ├── reports.html       # Main dashboard
│   ├── login.html         # Login page
│   ├── styles.css         # Stylesheets
│   ├── *.js              # Client-side JavaScript
│   └── *.png             # Images and logos
├── index.js               # Main server file
├── mockdata.js            # Mock data generator
├── script.py              # Python utility script
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /api/username` - Get current user info

### Data Management
- `GET /api/reports` - Fetch sensor data (authenticated)
- `POST /api/reports` - Add new sensor reading

### Pages
- `GET /` - Redirects to login
- `GET /login` - Login page
- `GET /monitor` - Main dashboard (authenticated)

## 🗄️ Database Schema

The application uses an in-memory SQLite database with the following tables:

### Users Table
```sql
CREATE TABLE user (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  network_id INTEGER NOT NULL
);
```

### Reports Table
```sql
CREATE TABLE report (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  datetime DATETIME NOT NULL,
  voltage REAL NOT NULL,
  amperage REAL NOT NULL,
  network_id INTEGER NOT NULL
);
```

## 🧪 Development

### Running Mock Data

To generate test data for development:

```bash
node mockdata.js
```

This will start sending mock voltage and amperage readings to the API every second.

### Environment Setup

The application automatically:
- Creates an in-memory SQLite database on startup
- Sets up required tables
- Creates a default admin user
- Handles timezone conversion for Amsterdam time

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: SQLite (in-memory)
- **Authentication**: bcryptjs, express-session
- **Frontend**: HTML, CSS, JavaScript
- **Charts**: Chart.js
- **HTTP Client**: Axios

## 📊 Features in Detail

### Real-time Charts
- Last hour readings
- Last 24 hours overview
- Monthly trends
- Yearly analysis
- Live data updates

### User Management
- Secure password hashing
- Session-based authentication
- Network-based data isolation
- Automatic session cleanup

### Data Visualization
- Interactive charts with Chart.js
- Real-time data updates
- Responsive design for mobile devices
- Export capabilities

## 🔒 Security Features

- Password hashing with bcryptjs
- Session management with express-session
- Input validation and sanitization
- CORS protection
- Secure cookie handling

## 🚀 Deployment

The application can be deployed to any Node.js hosting platform:

```bash
npm install
npm start
```

The server will start on port 3000 by default, or use the PORT environment variable if set.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

## 👨‍💻 Author

Created by Daan & Remco for a first semester project at Fontys ICT Eindhoven.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---
