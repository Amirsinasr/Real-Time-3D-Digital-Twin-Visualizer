import React from 'react';
import '../src/index.css';

export default function Footer() {
    return (
        <footer className="app-footer">
            <div className="footer-left">
                <span className="footer-copy">© 2026 EdgeTwin Systems</span>
                <span className="footer-divider">|</span>
                <span className="footer-status-item">
                    MQTT: <span className="status-indicator online">Connected</span>
                </span>
                <span className="footer-divider">|</span>
                <span className="footer-status-item">
                    DB: <span className="status-indicator active">SQLite Active</span>
                </span>
            </div>

            <div className="footer-tech">
                <span className="tech-badge">ESP-IDF</span>
                <span className="tech-badge">React Three Fiber</span>
                <span className="tech-badge">Express.js</span>
            </div>
        </footer>
    );
}