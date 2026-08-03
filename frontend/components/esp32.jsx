import React, { useState } from 'react';
import '../src/index.css';

export default function Esp32() {
    const [telemetry, setTelemetry] = useState({
        pitch: 12.5,
        roll: -5.2,
        yaw: 45.0,
        status: 'NORMAL'
    });

    return (
        <main className="dashboard-main">
            <section className="card canvas-card">
                <div className="card-header">
                    <h2>3D Digital Twin Visualizer</h2>
                    <span className="live-badge">Live Simulation</span>
                </div>
                <div className="canvas-placeholder">
                    <div className="cube-mock">
                        <span className="cube-label">ESP32-S3 Hardware Node</span>
                        <span className="coords">
                            Pitch: {telemetry.pitch}° | Roll: {telemetry.roll}° | Yaw: {telemetry.yaw}°
                        </span>
                    </div>
                </div>
            </section>

            <aside className="sidebar-container">
                <div className="card status-card">
                    <h3>System Health</h3>
                    <div className={`status-pill ${telemetry.status.toLowerCase()}`}>
                        {telemetry.status}
                    </div>
                </div>

                <div className="card metrics-card">
                    <h3>Live Telemetry</h3>
                    <div className="metric-row">
                        <span className="metric-label">Pitch (X-Axis)</span>
                        <span className="metric-value">{telemetry.pitch}°</span>
                    </div>
                    <div className="metric-row">
                        <span className="metric-label">Roll (Y-Axis)</span>
                        <span className="metric-value">{telemetry.roll}°</span>
                    </div>
                    <div className="metric-row">
                        <span className="metric-label">Yaw (Z-Axis)</span>
                        <span className="metric-value">{telemetry.yaw}°</span>
                    </div>
                </div>

                <div className="card controls-card">
                    <h3>Controls</h3>
                    <button className="control-btn">Toggle Simulation Mode</button>
                    <button className="control-btn secondary">Fetch SQLite History</button>
                </div>
            </aside>
        </main>
    );
}