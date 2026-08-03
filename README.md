# ⚡ EdgeTwin: Real-Time 3D Digital Twin Visualizer

A full-stack industrial IoT dashboard designed to visualize hardware telemetry in real-time. This project features a 3D digital twin that mathematically matches the physical orientation (Pitch, Roll, Yaw) of an edge computing device using a live WebSocket data stream.

## 📸 Live Demonstration

<p align="center">
  <img src="[LINK_TO_YOUR_GIF_HERE.gif]" alt="EdgeTwin Live Demo" width="100%">
</p>

> *The demo above showcases the real-time WebSocket data stream actively driving both the 3D WebGL model and the Recharts history graph with zero perceived latency.*

---

## 🏗️ Architecture & Tech Stack

This project was built to demonstrate a complete, modern Full-Stack pipeline—from database to 3D rendering.

**Frontend:**
* **React.js (Vite):** Core UI framework.
* **React Three Fiber & Drei:** WebGL wrapper for Three.js to render the 3D ESP32 hardware model.
* **Recharts:** Dynamic, live-updating line charts for historical telemetry data.
* **Socket.io-Client:** Listens for real-time sensor pulses.

**Backend:**
* **Node.js & Express.js:** REST API architecture.
* **Socket.io:** Bi-directional WebSockets to broadcast data instantly to connected clients.
* **SQLite3:** Lightweight, zero-config relational database for storing historical sensor logs.

---

## ✨ Core Features

* **Live 3D Rendering:** Uses WebGL to render a responsive, interactive 3D hardware node that reacts instantly to incoming coordinate data.
* **Real-Time Telemetry Stream:** A backend simulation engine utilizes a "Random Walk" algorithm to generate smooth, realistic IMU sensor data at 2Hz.
* **Zero-Latency UI Updates:** WebSockets push data from the Express backend to the React frontend instantly, bypassing traditional HTTP polling limits.
* **Historical Data Tracking:** The SQLite database stores telemetry logs, which are fetched via a REST API on initial load and visualized dynamically.
* **Enterprise UI/UX:** Built with a modern, dark-mode glassmorphic dashboard layout using pure CSS and CSS Grid.

---

## 🚀 How to Run Locally

If you want to run this full-stack environment on your own machine, follow these steps:

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* Git

### 1. Clone the repository
```bash
git clone [https://github.com/YOUR-USERNAME/real-time-3d-digital-twin.git](https://github.com/YOUR-USERNAME/real-time-3d-digital-twin.git)
cd real-time-3d-digital-twin
