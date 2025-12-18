import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './LandingPage.css'; 

const LandingPage = () => (
  <div className="landing-page">
    {/* Hero */}
    <section className="hero">
      <div className="decorative-circle circle-1" />
      <div className="decorative-circle circle-2" />
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to TicketFlow</h1>
          <p className="hero-subtitle">
            The ultimate solution for seamless ticket management.
            Track, manage, and resolve tickets with ease.
          </p>
          <div className="hero-buttons">
            <Link to="/auth/login" className="btn btn-primary">Login</Link>
            <Link to="/auth/signup" className="btn btn-secondary">Get Started</Link>
          </div>
        </div>
      </div>
      <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#ffffff" fillOpacity="1"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,138.7C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
      </svg>
    </section>

    {/* Features */}
    <section className="features">
      <div className="container">
        <h2 className="section-title">Why Choose TicketFlow?</h2>
        <div className="features-grid">
          {['Easy Tracking', 'Quick Resolution', 'Insightful Analytics', 'Secure & Reliable'].map((t, i) => (
            <div key={i} className="feature-card card">
              <div className="feature-icon">Icon</div>
              <h3>{t}</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta-section">
      <div className="container">
        <div className="cta-box card">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of teams already using TicketFlow.</p>
          <Link to="/auth/signup" className="btn btn-primary">Create Free Account</Link>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default LandingPage;

