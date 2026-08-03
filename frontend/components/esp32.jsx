import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import '../src/index.css';

function HardwareModel({ pitch, roll, yaw }) {
    const degToRad = (deg) => (deg * Math.PI) / 180;

    return (
        <group rotation={[degToRad(pitch), degToRad(yaw), degToRad(roll)]}>
            args={[2, 0.1, 1]} {/* width, height, depth */}
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
    const [telemetry, setTelemetry] = useState({
        pitch: 15,
        roll: 30,
        yaw: 0,
        status: 'NORMAL'
    });

    return (
        <main className="dashboard-main">
            <section className="card canvas-card">
                <div className="card-header">
                    <h2>3D Digital Twin Visualizer</h2>
                    <span className="live-badge">Live Three.js Canvas</span>
                </div>
                <div className="canvas-container-3d">
                    <Canvas camera={{ position: [0, 3, 5], fov: 50 }}>
                        <ambientLight intensity={1.5} />
                        <pointLight position={[10, 10, 10]} intensity={2} />
                        <directionalLight position={[-10, 10, 5]} intensity={1} />

                        <HardwareModel 
                            pitch={telemetry.pitch} 
                            roll={telemetry.roll} 
                            yaw={telemetry.yaw} 
                        />

                        <OrbitControls enableZoom={true} />
                    </Canvas>
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
                    <button 
                        className="control-btn"
                        onClick={() => setTelemetry({ pitch: 45, roll: -20, yaw: 10, status: 'NORMAL' })}
                    >
                        Test Tilt Angle A
                    </button>
                    <button 
                        className="control-btn secondary"
                        onClick={() => setTelemetry({ pitch: 0, roll: 0, yaw: 0, status: 'NORMAL' })}
                    >
                        Reset Position
                    </button>
                </div>
            </aside>
        </main>
    );
}