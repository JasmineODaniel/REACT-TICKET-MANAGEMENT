import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { showToast } from '@/components/Toast';
import Footer from '@/components/Footer';

interface Ticket {
  id: string;
  title: string;
  description?: string;
  status: 'open' | 'in_progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
}

const TicketManagement = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open' as const,
    priority: 'medium' as const
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
    setTickets(storedTickets);
  };

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Status must be: open, in_progress, or closed';
    }

    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast({ message: 'Please fix the errors in the form', type: 'error' });
      return;
    }

    const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');

    if (editingTicket) {
      // Update existing ticket
      const updatedTickets = storedTickets.map((ticket: Ticket) =>
        ticket.id === editingTicket.id
          ? { ...formData, id: ticket.id, createdAt: ticket.createdAt, updatedAt: new Date().toISOString() }
          : ticket
      );
      localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
      showToast({ message: 'Ticket updated successfully!', type: 'success' });
    } else {
      // Create new ticket
      const newTicket: Ticket = {
        ...formData,
        id: `ticket_${Date.now()}`,
        createdAt: new Date().toISOString()
      };
      storedTickets.push(newTicket);
      localStorage.setItem('ticketapp_tickets', JSON.stringify(storedTickets));
      showToast({ message: 'Ticket created successfully!', type: 'success' });
    }

    loadTickets();
    closeModal();
  };

  const openModal = (ticket?: Ticket) => {
    if (ticket) {
      setEditingTicket(ticket);
      setFormData({
        title: ticket.title,
        description: ticket.description || '',
        status: ticket.status,
        priority: ticket.priority
      });
    } else {
      setEditingTicket(null);
      setFormData({
        title: '',
        description: '',
        status: 'open',
        priority: 'medium'
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTicket(null);
    setFormData({
      title: '',
      description: '',
      status: 'open',
      priority: 'medium'
    });
    setErrors({});
  };

  const handleDelete = (ticketId: string) => {
    setDeleteConfirm(ticketId);
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    
    const storedTickets = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
    const updatedTickets = storedTickets.filter((ticket: Ticket) => ticket.id !== deleteConfirm);
    localStorage.setItem('ticketapp_tickets', JSON.stringify(updatedTickets));
    
    showToast({ message: 'Ticket deleted successfully!', type: 'success' });
    setDeleteConfirm(null);
    loadTickets();
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('ticketapp_user');
    navigate('/');
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      open: 'bg-green-100 text-green-800',
      in_progress: 'bg-amber-100 text-amber-800',
      closed: 'bg-gray-100 text-gray-800'
    };
    const labels = {
      open: 'Open',
      in_progress: 'In Progress',
      closed: 'Closed'
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: 'bg-blue-100 text-blue-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return (
      <Badge className={variants[priority as keyof typeof variants]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-5">
          <div className="flex justify-between items-center py-4">
            <h2 className="text-2xl font-bold text-blue-600">TicketFlow</h2>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-5 py-16">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Ticket Management</h1>
          <Button onClick={() => openModal()} size="lg">
            + Create New Ticket
          </Button>
        </div>

        {/* Content */}
        {tickets.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-16 text-center">
              <div className="text-6xl mb-6">📋</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">No Tickets Yet</h3>
              <p className="text-gray-600 mb-6">Create your first ticket to get started!</p>
              <Button onClick={() => openModal()}>
                Create Ticket
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map(ticket => (
              <Card key={ticket.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start gap-3">
                    <CardTitle className="text-lg line-clamp-2">{ticket.title}</CardTitle>
                    {getStatusBadge(ticket.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {ticket.description && (
                    <p className="text-gray-600 text-sm line-clamp-3">{ticket.description}</p>
                  )}
                  
                  <div className="flex justify-between items-center text-sm">
                    <div className="space-y-1">
                      <div>Priority: {getPriorityBadge(ticket.priority)}</div>
                      <div className="text-gray-500">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => openModal(ticket)} 
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      Edit
                    </Button>
                    <Button 
                      onClick={() => handleDelete(ticket.id)} 
                      variant="destructive"
                      size="sm"
                      className="flex-1"
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editingTicket ? 'Edit Ticket' : 'Create New Ticket'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter ticket title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="Enter ticket description (optional)"
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status *</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                  <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
              </div>

              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={formData.priority} onValueChange={(value) => handleChange('priority', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" onClick={closeModal} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                {editingTicket ? 'Update Ticket' : 'Create Ticket'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteConfirm} onOpenChange={cancelDelete}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this ticket? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button onClick={cancelDelete} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={confirmDelete} variant="destructive" className="flex-1">
              Delete Ticket
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default TicketManagement;