import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import './TicketManagement.css';

const TicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState(null);
  const [toast, setToast] = useState(null);
  const [delId, setDelId] = useState(null);

  const [form, setForm] = useState({ title:'', description:'', status:'open', priority:'medium' });
  const [errors, setErrors] = useState({});

  useEffect(() => { load(); }, []);

  const load = () => setTickets(JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]'));

  const change = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(o => ({ ...o, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title required';
    else if (form.title.trim().length < 3) e.title = 'Min 3 chars';
    if (!['open','in_progress','closed'].includes(form.status)) e.status = 'Invalid status';
    if (form.description && form.description.length > 500) e.description = 'Max 500 chars';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = e => {
    e.preventDefault();
    if (!validate()) return setToast({ msg: 'Fix errors', type: 'error' });

    const all = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
    if (edit) {
      const updated = all.map(t => t.id === edit.id ? { ...form, id: t.id, updatedAt: new Date().toISOString() } : t);
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updated));
      setToast({ msg: 'Updated!', type: 'success' });
    } else {
      const newT = { ...form, id: `t_${Date.now()}`, createdAt: new Date().toISOString() };
      all.push(newT);
      localStorage.setItem('ticketapp_tickets', JSON.stringify(all));
      setToast({ msg: 'Created!', type: 'success' });
    }
    load(); closeModal();
  };

  const openModal = (t = null) => {
    if (t) { setEdit(t); setForm({ title:t.title, description:t.description||'', status:t.status, priority:t.priority||'medium' }); }
    else { setEdit(null); setForm({ title:'', description:'', status:'open', priority:'medium' }); }
    setErrors({}); setModal(true);
  };
  const closeModal = () => { setModal(false); setEdit(null); };

  const confirmDel = id => setDelId(id);
  const doDel = () => {
    const all = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
    localStorage.setItem('ticketapp_tickets', JSON.stringify(all.filter(t => t.id !== delId)));
    setToast({ msg: 'Deleted!', type: 'success' });
    setDelId(null); load();
  };

  const logout = () => { localStorage.removeItem('ticketapp_session'); localStorage.removeItem('ticketapp_user'); navigate('/'); };

  const badge = s => {
    const map = { open:'Open', in_progress:'In Progress', closed:'Closed' };
    return <span className={`status-badge status-${s}`}>{map[s]||s}</span>;
  };

  return (
    <div className="ticket-management-page">
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      <nav className="dashboard-nav">
        <div className="container">
          <div className="nav-content">
            <h2 className="nav-logo">TicketFlow</h2>
            <div className="nav-actions">
              <Link to="/dashboard" className="btn btn-secondary">Dashboard</Link>
              <button onClick={logout} className="btn btn-danger">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="ticket-content">
        <div className="container">
          <div className="ticket-header">
            <h1>Ticket Management</h1>
            <button onClick={() => openModal()} className="btn btn-primary">+ New Ticket</button>
          </div>

          {tickets.length === 0 ? (
            <div className="empty-state card">
              <div className="empty-icon">No tickets</div>
              <h3>No Tickets Yet</h3>
              <p>Create your first ticket to start.</p>
              <button onClick={() => openModal()} className="btn btn-primary">Create Ticket</button>
            </div>
          ) : (
            <div className="tickets-grid">
              {tickets.map(t => (
                <div key={t.id} className="ticket-card card">
                  <div className="ticket-card-header">
                    <h3>{t.title}</h3>
                    {badge(t.status)}
                  </div>
                  {t.description && <p className="ticket-desc">{t.description}</p>}
                  <div className="ticket-meta">
                    <span>Priority: {t.priority||'medium'}</span>
                    <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="ticket-actions">
                    <button onClick={() => openModal(t)} className="btn btn-secondary btn-sm">Edit</button>
                    <button onClick={() => confirmDel(t.id)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content card" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{edit ? 'Edit' : 'Create'} Ticket</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Title *</label>
                <input name="title" value={form.title} onChange={change} />
                {errors.title && <div className="error-message">{errors.title}</div>}
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={form.description} onChange={change} rows={3} />
                {errors.description && <div className="error-message">{errors.description}</div>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Status *</label>
                  <select name="status" value={form.status} onChange={change}>
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={form.priority} onChange={change}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="btn btn-secondary">Cancel</button>
                <button type="submit" className="btn btn-primary">{edit?'Update':'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {delId && (
        <div className="modal-overlay" onClick={() => setDelId(null)}>
          <div className="modal-content card" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><h2>Confirm Delete</h2></div>
            <p>Are you sure? This cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={() => setDelId(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={doDel} className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
export default TicketManagement;