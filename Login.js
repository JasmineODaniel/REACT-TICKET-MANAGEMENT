import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...form, [name]: value }));
    if (errors[name]) setErrors(o => ({ ...o, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Min 6 chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = e => {
    e.preventDefault();
    if (!validate()) return setToast({ msg: 'Fix errors', type: 'error' });

    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (!user) return setToast({ msg: 'Invalid credentials', type: 'error' });

    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
    localStorage.setItem('ticketapp_session', token);
    localStorage.setItem('ticketapp_user', JSON.stringify({ name: user.name, email: user.email }));
    setToast({ msg: 'Login success!', type: 'success' });
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  return (
    <div className="auth-page">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Login to access your ticket dashboard</p>
          </div>
          <form onSubmit={submit} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Login</button>
          </form>
          <div className="auth-footer">
            <p>No account? <Link to="/auth/signup">Sign up</Link></p>
            <p><Link to="/">Back to Home</Link></p>
          </div>
          <div className="test-credentials">
            <p><strong>Test:</strong> test@ticketflow.com / test123</p>
          </div>
        </div>
      </div>
    </div>
    
  );
  useEffect(() => {
  // Initialize test user if none exists
  const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
  if (users.length === 0) {
    const testUser = {
      name: 'Test User',
      email: 'test@ticketflow.com',
      password: 'test123',
      createdAt: new Date().toISOString()
    };
    users.push(testUser);
    localStorage.setItem('ticketapp_users', JSON.stringify(users));
  }
}, []);
};
export default Login;