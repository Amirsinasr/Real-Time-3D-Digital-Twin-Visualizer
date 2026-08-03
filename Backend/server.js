const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const http = require('http'); 
const { Server } = require('socket.io'); 

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', methods: ["GET", "POST"] } // Allows React to connect
});

const db = new sqlite3.Database('./sensor_history.db', (err) => {
    if (err) console.error("Database error: ", err.message);
    else console.log("Connected to SQLite database.");
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS telemetry (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pitch REAL,
        roll REAL,
        yaw REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

app.get('/api/history', (req, res) => {
    const sql = `SELECT * FROM telemetry ORDER BY timestamp DESC LIMIT 20`;
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows.reverse()); // Reverse so chart reads left-to-right chronologically
    });
});

let currentPitch = 0;
let currentRoll = 0;
let currentYaw = 0;

app.post('/api/simulate', (req, res) => {
    currentPitch = Math.max(-45, Math.min(45, currentPitch + (Math.random() * 10 - 5)));
    currentRoll = Math.max(-45, Math.min(45, currentRoll + (Math.random() * 10 - 5)));
    currentYaw = (currentYaw + (Math.random() * 10 - 2)) % 360; // Continually spin slowly

    const p = currentPitch.toFixed(2);
    const r = currentRoll.toFixed(2);
    const y = currentYaw.toFixed(2);

    const sql = `INSERT INTO telemetry (pitch, roll, yaw) VALUES (?, ?, ?)`;
    db.run(sql, [p, r, y], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        
        const newRecord = { id: this.lastID, pitch: p, roll: r, yaw: y, timestamp: new Date().toISOString() };
        io.emit('newData', newRecord); 
        
        res.json({ message: "Smooth data saved!", data: newRecord });
    });
});

server.listen(3001, () => {
    console.log(`Express and WebSocket server running on http://localhost:3001`);
});