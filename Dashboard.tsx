import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Footer from '@/components/Footer';

interface User {
  name: string;
  email: string;
}

interface Ticket {
  id: string;
  status: 'open' | 'in_progress' | 'closed';
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });

  useEffect(() => {
    // Get user info
    const userData = localStorage.getItem('ticketapp_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Calculate ticket stats
    calculateStats();
  }, []);

  const calculateStats = () => {
    const tickets: Ticket[] = JSON.parse(localStorage.getItem('ticketapp_tickets') || '[]');
    
    const newStats = {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'open').length,
      inProgress: tickets.filter(t => t.status === 'in_progress').length,
      closed: tickets.filter(t => t.status === 'closed').length
    };

    setStats(newStats);
  };

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session');
    localStorage.removeItem('ticketapp_user');
    navigate('/');
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
                <Link to="/tickets">Manage Tickets</Link>
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-xl text-gray-600">
            Here's an overview of your ticket management system
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Total Tickets</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-2xl">
                  🟢
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Open Tickets</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.open}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                  🟡
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">In Progress</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center text-2xl">
                  ⚪
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Resolved Tickets</h3>
                  <p className="text-3xl font-bold text-gray-900">{stats.closed}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="max-w-2xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <p className="text-gray-600 mb-8 text-lg">
                What would you like to do today?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="px-8">
                  <Link to="/tickets">View All Tickets</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8">
                  <Link to="/tickets?action=create">Create New Ticket</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};


export default Dashboard;
