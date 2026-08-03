import React from 'react';
import '../src/index.css';

export default function Header() {
    return (
        <header className="app-header">
            <div className="brand-container">
                <span className="live-dot" title="System Active"></span>
                <span className="brand-title">Edge<span className="brand-highlight">Twin</span></span>
                <span className="badge">ESP32-S3</span>
            </div>

            <div className="header-actions">
                <button className="btn btn-secondary">
                    <span>📊</span> History
                </button>
                <button className="btn btn-primary">
                    <span>⚡</span> Connect Device
                </button>
            </div>
        </header>
    );
}