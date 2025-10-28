import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handle = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(o => ({ ...o, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name) e.name = 'Name required';
    if (!form.email) e.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password required';
    else if (form.password.length < 6) e.password = 'Min 6 chars';
    if (form.confirm !== form.password) e.confirm = 'Passwords must match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = e => {
    e.preventDefault();
    if (!validate()) return setToast({ msg: 'Fix errors', type: 'error' });

    const users = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    if (users.some(u => u.email === form.email)) return setToast({ msg: 'Email already exists', type: 'error' });

    users.push({ name: form.name, email: form.email, password: form.password });
    localStorage.setItem('ticketapp_users', JSON.stringify(users));

    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2)}`;
    localStorage.setItem('ticketapp_session', token);
    localStorage.setItem('ticketapp_user', JSON.stringify({ name: form.name, email: form.email }));
    setToast({ msg: 'Account created!', type: 'success' });
    setTimeout(() => navigate('/dashboard'), 1200);
  };

  return (
    <div className="auth-page">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="auth-container">
        <div className="auth-card card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Sign up to start managing tickets</p>
          </div>
          <form onSubmit={submit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handle} />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" value={form.email} onChange={handle} />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={form.password} onChange={handle} />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" name="confirm" value={form.confirm} onChange={handle} />
              {errors.confirm && <div className="error-message">{errors.confirm}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">Create Account</button>
          </form>
          <div className="auth-footer">
            <p>Already have an account? <Link to="/auth/login">Login</Link></p>
            <p><Link to="/">Back to Home</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;