import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../src/index.css';

function HardwareModel({ pitch, roll, yaw }) {
    const degToRad = (deg) => (deg * Math.PI) / 180;
    return (
        <group rotation={[degToRad(pitch), degToRad(yaw), degToRad(roll)]}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2.2, 0.15, 1.2]} />
                <meshStandardMaterial color="#1e293b" roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
                <boxGeometry args={[0.5, 0.05, 0.5]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
            </mesh>
        </group>
    );
}

export default function Esp32() {
    const [telemetry, setTelemetry] = useState({ pitch: 0, roll: 0, yaw: 0, status: 'CONNECTING...' });
    const [history, setHistory] = useState([]);
    const [isAuto, setIsAuto] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3001/api/history')
            .then(res => res.json())
            .then(data => {
                setHistory(data);
                if (data.length > 0) {
                    const latest = data[data.length - 1];
                    setTelemetry({ pitch: latest.pitch, roll: latest.roll, yaw: latest.yaw, status: 'LIVE CONNECTION' });
                }
            })
            .catch(() => setTelemetry(prev => ({ ...prev, status: 'BACKEND OFFLINE' })));

        const socket = io('http://localhost:3001');
        
        socket.on('newData', (newRecord) => {
            setTelemetry({
                pitch: newRecord.pitch,
                roll: newRecord.roll,
                yaw: newRecord.yaw,
                status: 'LIVE CONNECTION'
            });
            setHistory(prev => [...prev.slice(-19), newRecord]);
        });

        return () => socket.disconnect(); 
    }, []);

    const simulateData = async () => {
        await fetch('http://localhost:3001/api/simulate', { method: 'POST' });
    };

    return (
        <main className="dashboard-main">
            <div className="left-column">
                <section className="card canvas-card">
                    <div className="card-header">
                        <h2>3D Digital Twin Visualizer</h2>
                        <span className="live-badge">WebSocket Live Stream</span>
                    </div>
                    <div className="canvas-container-3d">
                        <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
                            <ambientLight intensity={1.5} />
                            <pointLight position={[10, 10, 10]} intensity={2} />
                            <directionalLight position={[-10, 10, 5]} intensity={1} />
                            <HardwareModel pitch={telemetry.pitch} roll={telemetry.roll} yaw={telemetry.yaw} />
                            <OrbitControls enableZoom={true} />
                        </Canvas>
                    </div>
                </section>

                <section className="card chart-card">
                    <h3>Telemetry Trends</h3>
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <LineChart data={history} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="timestamp" tickFormatter={(tick) => new Date(tick).toLocaleTimeString([], {minute: '2-digit', second:'2-digit'})} stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} domain={[-90, 360]} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Line type="monotone" dataKey="pitch" stroke="#f43f5e" strokeWidth={2} dot={false} name="Pitch (X)" />
                                <Line type="monotone" dataKey="roll" stroke="#3b82f6" strokeWidth={2} dot={false} name="Roll (Y)" />
                                <Line type="monotone" dataKey="yaw" stroke="#10b981" strokeWidth={2} dot={false} name="Yaw (Z)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            <aside className="sidebar-container">
                <div className="card status-card">
                    <h3>System Health</h3>
                    <div className={`status-pill ${telemetry.status === 'LIVE CONNECTION' ? 'normal' : 'offline'}`}>
                        {telemetry.status}
                    </div>
                </div>

                <div className="card metrics-card">
                    <h3>Live Telemetry</h3>
                    <div className="metric-row"><span className="metric-label">Pitch</span><span className="metric-value">{telemetry.pitch}°</span></div>
                    <div className="metric-row"><span className="metric-label">Roll</span><span className="metric-value">{telemetry.roll}°</span></div>
                    <div className="metric-row"><span className="metric-label">Yaw</span><span className="metric-value">{telemetry.yaw}°</span></div>
                </div>

                <div className="card controls-card">
                    <h3>Simulation Control</h3>
                    <button className="control-btn" onClick={simulateData}>
                        Trigger Sensor Pulse
                    </button>
                </div>
            </aside>
        </main>
    );
}