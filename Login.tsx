import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { showToast } from '@/components/Toast';

interface User {
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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

    // Initialize default user if none exists
    const users: User[] = JSON.parse(localStorage.getItem('ticketapp_users') || '[]');
    if (users.length === 0) {
      const defaultUser: User = {
        name: 'Test User',
        email: 'test@ticketflow.com',
        password: 'test123',
        createdAt: new Date().toISOString()
      };
      users.push(defaultUser);
      localStorage.setItem('ticketapp_users', JSON.stringify(users));
    }

    // Simulate authentication
    const user = users.find((u: User) => u.email === formData.email && u.password === formData.password);

    if (user) {
      // Create session token
      const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('ticketapp_session', token);
      localStorage.setItem('ticketapp_user', JSON.stringify({ email: user.email, name: user.name }));
      
      showToast({ message: 'Login successful! Redirecting...', type: 'success' });
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } else {
      showToast({ message: 'Invalid email or password. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 p-5">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</CardTitle>
            <p className="text-gray-600">Login to access your ticket dashboard</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full" size="lg">
                Login
              </Button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/auth/signup" className="text-blue-600 hover:underline font-semibold">
                  Sign up
                </Link>
              </p>
              <p>
                <Link to="/" className="text-blue-600 hover:underline">
                  Back to Home
                </Link>
              </p>
            </div>

            <Card className="mt-6 bg-gray-50 border-gray-200">
              <CardContent className="p-4 text-center">
                <p className="font-semibold text-gray-700 mb-2">Test Credentials:</p>
                <p className="text-sm text-gray-600">Email: test@ticketflow.com</p>
                <p className="text-sm text-gray-600">Password: test123</p>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;