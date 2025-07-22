import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <div className="home-card">
        <img src="https://pccoebucket.s3.ap-south-1.amazonaws.com/logo/pcet_logo_new1.jpg" alt="College Logo" className="home-logo" />
        <h1>Pimpri Chinchwad College ERP</h1>
        <p>Welcome! Please sign in or create an account to continue.</p>
        <div className="home-buttons">
          <Link to="/login">
            <button className="home-btn login">Login</button>
          </Link>
          <Link to="/register">
            <button className="home-btn register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
