import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Train, User, Lock, Eye, EyeOff } from 'lucide-react';
import { User as UserType } from '../types/auth';

interface LoginPageProps {
  onLogin: (user: UserType) => void;
}

// Mock users for demonstration
const MOCK_USERS = [
  { id: '1', username: 'operations', password: 'ops123', role: 'operations' as const, name: 'Operations Manager' },
  { id: '2', username: 'admin', password: 'admin123', role: 'admin' as const, name: 'System Administrator' },
];

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    
    if (user) {
      onLogin({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      });
    } else {
      setError('Invalid username or password');
    }
    
    setIsLoading(false);
  };

  const handleDemoLogin = (role: 'operations' | 'admin') => {
    const user = MOCK_USERS.find(u => u.role === role);
    if (user) {
      onLogin({
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div 
        className="glass rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg glow-effect">
              <Train className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">MetroMind AI</h1>
          <p className="text-gray-600">Intelligent Train Scheduling System</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 glass rounded-xl border border-white/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div 
              className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 btn-animate ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        {/* Demo Login Buttons */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <p className="text-sm text-gray-600 text-center mb-4">Demo Accounts:</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin('operations')}
              className="py-2 px-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 btn-animate"
            >
              Operations
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="py-2 px-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 btn-animate"
            >
              Admin
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-500 space-y-1">
            <p>Operations: operations / ops123</p>
            <p>Admin: admin / admin123</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}