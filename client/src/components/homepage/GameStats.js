import React from 'react';

export default ({playerCount, marketVol}) => (
    <div className="section">
        <h3>Game Info</h3>
        <div className="info">
            <div className="info-item">
                <i className="fas fa-users icon"></i>
                <h2>{playerCount}</h2>
                <p>Player Count</p>
            </div>
            <div className="info-item">
                <i className="fas fa-chart-line icon"></i>
                <h2>{marketVol}</h2>
                <p>Trading Volume</p>
            </div>
            <div className="info-item">
                <i className="fas fa-hand-holding-usd icon"></i>
                <h2>0.7 EOS</h2>
                <p>Sign Up Cost</p>
            </div>
            <div className="info-item">
                <i className="fas fa-hand-point-up icon"></i>
                <h2>Developer</h2>
                <p>RAM consumption</p>
            </div>
            <div className="info-item">
                <i className="fas fa-hand-point-down icon"></i>
                <h2>Self</h2>
                <p>CPU consumption</p>
            </div>
        </div>
    </div>
)