import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ total:0, open:0, inProgress:0, closed:0 });

  useEffect(() => {
    const u = localStorage.getItem('ticketapp_user');
    if (u) setUser(JSON.parse(u));
    calcStats();
  }, []);

  const calcStats = () => {
    const tickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
    setStats({
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    });
  };

  const logout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('ticketapp_user');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="container">
          <div className="nav-content">
            <h2 className="nav-logo">TicketFlow</h2>
            <div className="nav-actions">
              <Link to="/tickets" className="btn btn-secondary">Manage Tickets</Link>
              <button onClick={logout} className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="container">
          <div className="dashboard-header">
            <h1>Welcome back, {user?.name || 'User'}!</h1>
            <p>Here's an overview of your ticket system</p>
          </div>

          <div className="stats-grid">
            {[
              { label:'Total Tickets',   value:stats.total,      icon:'Chart',   cls:'total' },
              { label:'Open',           value:stats.open,       icon:'Open',    cls:'open' },
              { label:'In Progress',    value:stats.inProgress, icon:'Progress',cls:'progress' },
              { label:'Resolved',       value:stats.closed,     icon:'Closed',  cls:'closed' }
            ].map(s => (
              <div key={s.cls} className="stat-card card">
                <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                <div className="stat-details">
                  <h3>{s.label}</h3>
                  <p className="stat-number">{s.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-actions">
            <div className="action-box card">
              <h2>Quick Actions</h2>
              <p>What would you like to do today?</p>
              <div className="action-buttons">
                <Link to="/tickets" className="btn btn-primary">View All Tickets</Link>
                <Link to="/tickets?action=create" className="btn btn-secondary">Create New Ticket</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Dashboard;