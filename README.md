# ⚡ EdgeTwin: Real-Time 3D Digital Twin Visualizer

A full-stack industrial IoT dashboard that visualizes hardware telemetry in real-time. This project features a 3D digital twin that mathematically matches the physical orientation (Pitch, Roll, Yaw) of an edge device using a live WebSocket data stream.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, React Three Fiber (Three.js), Recharts
* **Backend:** Node.js, Express.js, Socket.io
* **Database:** SQLite3
* **Architecture:** REST API + Real-time WebSockets

## ✨ Core Features
* **Live 3D Rendering:** Uses WebGL and Three.js to render a responsive, interactive 3D hardware node.
* **Real-Time Telemetry:** WebSockets stream simulated IMU sensor data (Pitch, Roll, Yaw) at 2Hz with zero-latency UI updates.
* **Historical Data Tracking:** SQLite database stores telemetry logs, visualized dynamically using Recharts.
* **Glassmorphic UI:** Modern, dark-mode enterprise dashboard layout using pure CSS and CSS Grid.

## 🚀 How to Run Locally

### 1. Start the Backend
```bash
cd backend
npm install
node server.js