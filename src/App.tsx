import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Train, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Battery, 
  Zap,
  RefreshCw,
  Calendar,
  MapPin,
  Settings,
  BarChart3,
  Activity,
  LogOut,
  Brain,
  Sparkles,
  UserPlus,
  Edit3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import LoginPage from './components/LoginPage';
import { User, AuthState } from './types/auth';
import { generateSimulationData, generateFestivalData } from './data/simulationData';

// Static data that won't change automatically
const STATIC_PASSENGER_DATA = [
  { time: '5 AM', passengers: 120, predicted: 130 },
  { time: '6 AM', passengers: 200, predicted: 210 },
  { time: '7 AM', passengers: 350, predicted: 340 },
  { time: '8 AM', passengers: 600, predicted: 580 },
  { time: '9 AM', passengers: 450, predicted: 470 },
  { time: '10 AM', passengers: 280, predicted: 290 },
  { time: '11 AM', passengers: 220, predicted: 230 },
  { time: '12 PM', passengers: 380, predicted: 370 },
  { time: '1 PM', passengers: 320, predicted: 330 },
  { time: '2 PM', passengers: 290, predicted: 300 },
  { time: '3 PM', passengers: 340, predicted: 350 },
  { time: '4 PM', passengers: 420, predicted: 410 },
  { time: '5 PM', passengers: 550, predicted: 540 },
  { time: '6 PM', passengers: 680, predicted: 670 },
  { time: '7 PM', passengers: 520, predicted: 530 },
  { time: '8 PM', passengers: 380, predicted: 390 },
  { time: '9 PM', passengers: 250, predicted: 260 },
  { time: '10 PM', passengers: 180, predicted: 190 },
];

const STATIC_ENERGY_DATA = [
  { name: 'Energy Saved', value: 18, color: '#10b981' },
  { name: 'Standard Usage', value: 82, color: '#e5e7eb' }
];

const STATIC_COST_DATA = [
  { month: 'Jan', traditional: 2400, optimized: 1800 },
  { month: 'Feb', traditional: 2200, optimized: 1600 },
  { month: 'Mar', traditional: 2600, optimized: 1900 },
  { month: 'Apr', traditional: 2300, optimized: 1700 },
  { month: 'May', traditional: 2500, optimized: 1850 },
  { month: 'Jun', traditional: 2700, optimized: 2000 }
];

const STATIC_TRAIN_SCHEDULE = [
  { id: 'T001', route: 'Central → Airport', departure: '06:15', arrival: '06:45', status: 'On Time', passengers: 245, capacity: 300 },
  { id: 'T002', route: 'North → South', departure: '06:20', arrival: '07:10', status: 'On Time', passengers: 180, capacity: 250 },
  { id: 'T003', route: 'East → West', departure: '06:25', arrival: '06:55', status: 'Delayed 3min', passengers: 220, capacity: 280 },
  { id: 'T004', route: 'Airport → Central', departure: '06:30', arrival: '07:00', status: 'On Time', passengers: 195, capacity: 300 },
  { id: 'T005', route: 'South → North', departure: '06:35', arrival: '07:25', status: 'On Time', passengers: 160, capacity: 250 },
];

const STATIC_ALERTS = [
  { id: 1, type: 'warning', message: 'Peak load expected at 6 PM on Line 3', time: '2 min ago', priority: 'high' },
  { id: 2, type: 'info', message: 'Maintenance scheduled for Line 1 at 11 PM', time: '15 min ago', priority: 'medium' },
  { id: 3, type: 'success', message: 'Energy efficiency improved by 12% this week', time: '1 hour ago', priority: 'low' },
  { id: 4, type: 'warning', message: 'Weather alert: Heavy rain expected, adjust schedules', time: '2 hours ago', priority: 'high' }
];

const STATIC_METRICS = {
  totalTrains: 24,
  onTimePerformance: 94.2,
  energySavings: 18.5,
  passengerSatisfaction: 4.6,
  averageDelay: 2.3,
  systemEfficiency: 91.8
};

function App() {
  // Authentication state
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  // State for current data (will be updated only on manual refresh)
  const [passengerData, setPassengerData] = useState(STATIC_PASSENGER_DATA);
  const [energyData, setEnergyData] = useState(STATIC_ENERGY_DATA);
  const [costData, setCostData] = useState(STATIC_COST_DATA);
  const [trainSchedule, setTrainSchedule] = useState(STATIC_TRAIN_SCHEDULE);
  const [alerts, setAlerts] = useState(STATIC_ALERTS);
  const [metrics, setMetrics] = useState(STATIC_METRICS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentMode, setCurrentMode] = useState<'normal' | 'simulation' | 'festival'>('normal');

  // Handle login
  const handleLogin = (user: User) => {
    setAuthState({
      user,
      isAuthenticated: true
    });
  };

  // Handle logout
  const handleLogout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false
    });
    // Reset to normal mode and static data
    setCurrentMode('normal');
    setPassengerData(STATIC_PASSENGER_DATA);
    setEnergyData(STATIC_ENERGY_DATA);
    setCostData(STATIC_COST_DATA);
    setTrainSchedule(STATIC_TRAIN_SCHEDULE);
    setAlerts(STATIC_ALERTS);
    setMetrics(STATIC_METRICS);
  };

  // Show login page if not authenticated
  if (!authState.isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Function to generate new fake data (similar to the original random generation)
  const generateNewData = () => {
    // Generate new passenger data
    const newPassengerData = STATIC_PASSENGER_DATA.map(item => ({
      ...item,
      passengers: Math.max(50, item.passengers + Math.floor(Math.random() * 100) - 50),
      predicted: Math.max(50, item.predicted + Math.floor(Math.random() * 100) - 50)
    }));

    // Generate new energy savings percentage
    const newEnergyPercentage = Math.floor(Math.random() * 10) + 15; // 15-25%
    const newEnergyData = [
      { name: 'Energy Saved', value: newEnergyPercentage, color: '#10b981' },
      { name: 'Standard Usage', value: 100 - newEnergyPercentage, color: '#e5e7eb' }
    ];

    // Generate new cost data
    const newCostData = STATIC_COST_DATA.map(item => ({
      ...item,
      traditional: item.traditional + Math.floor(Math.random() * 400) - 200,
      optimized: item.optimized + Math.floor(Math.random() * 300) - 150
    }));

    // Generate new train schedule with some variations
    const statuses = ['On Time', 'On Time', 'On Time', 'Delayed 2min', 'Delayed 3min', 'Early 1min'];
    const newTrainSchedule = STATIC_TRAIN_SCHEDULE.map(train => ({
      ...train,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      passengers: Math.max(50, train.passengers + Math.floor(Math.random() * 60) - 30)
    }));

    // Generate new alerts (rotate and modify existing ones)
    const alertTypes = ['warning', 'info', 'success'];
    const alertMessages = [
      'Peak load expected at 6 PM on Line 3',
      'Maintenance scheduled for Line 1 at 11 PM',
      'Energy efficiency improved by 12% this week',
      'Weather alert: Heavy rain expected, adjust schedules',
      'New train added to Line 2 for peak hours',
      'Passenger feedback score increased to 4.7/5',
      'System optimization completed successfully'
    ];
    
    const newAlerts = Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
      message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
      time: ['Just now', '2 min ago', '5 min ago', '10 min ago'][i],
      priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)]
    }));

    // Generate new metrics
    const newMetrics = {
      totalTrains: STATIC_METRICS.totalTrains + Math.floor(Math.random() * 6) - 3,
      onTimePerformance: Math.max(85, Math.min(98, STATIC_METRICS.onTimePerformance + Math.random() * 6 - 3)),
      energySavings: Math.max(10, Math.min(25, STATIC_METRICS.energySavings + Math.random() * 4 - 2)),
      passengerSatisfaction: Math.max(4.0, Math.min(5.0, STATIC_METRICS.passengerSatisfaction + Math.random() * 0.6 - 0.3)),
      averageDelay: Math.max(1, Math.min(5, STATIC_METRICS.averageDelay + Math.random() * 2 - 1)),
      systemEfficiency: Math.max(85, Math.min(95, STATIC_METRICS.systemEfficiency + Math.random() * 6 - 3))
    };

    return {
      passengerData: newPassengerData,
      energyData: newEnergyData,
      costData: newCostData,
      trainSchedule: newTrainSchedule,
      alerts: newAlerts,
      metrics: newMetrics
    };
  };

  // Manual refresh function
  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let newData;
    
    if (currentMode === 'simulation') {
      newData = generateSimulationData();
    } else if (currentMode === 'festival') {
      newData = generateFestivalData();
    } else {
      newData = generateNewData();
    }
    
    setPassengerData(newData.passengerData);
    setEnergyData(newData.energyData);
    setCostData(newData.costData);
    setTrainSchedule(newData.trainSchedule);
    setAlerts(newData.alerts);
    setMetrics(newData.metrics);
    
    setIsRefreshing(false);
  };

  // Handle simulation mode
  const handleSimulationMode = async () => {
    setIsRefreshing(true);
    setCurrentMode('simulation');
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const simulationData = generateSimulationData();
    setPassengerData(simulationData.passengerData);
    setTrainSchedule(simulationData.trainSchedule);
    setAlerts(simulationData.alerts);
    setMetrics(simulationData.metrics);
    
    setIsRefreshing(false);
  };

  // Handle festival mode
  const handleFestivalMode = async () => {
    setIsRefreshing(true);
    setCurrentMode('festival');
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const festivalData = generateFestivalData();
    setPassengerData(festivalData.passengerData);
    setTrainSchedule(festivalData.trainSchedule);
    setAlerts(festivalData.alerts);
    setMetrics(festivalData.metrics);
    
    setIsRefreshing(false);
  };

  // Reset to normal mode
  const handleNormalMode = () => {
    setCurrentMode('normal');
    setPassengerData(STATIC_PASSENGER_DATA);
    setEnergyData(STATIC_ENERGY_DATA);
    setCostData(STATIC_COST_DATA);
    setTrainSchedule(STATIC_TRAIN_SCHEDULE);
    setAlerts(STATIC_ALERTS);
    setMetrics(STATIC_METRICS);
  };

  const getStatusColor = (status: string) => {
    if (status.includes('On Time') || status.includes('Early')) return 'text-green-600 bg-green-50';
    if (status.includes('Delayed')) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <TrendingUp className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="glass border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg glow-effect">
                <Train className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient-primary">MetroMind AI</h1>
                <p className="text-sm text-gray-600">Intelligent Train Scheduling System</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              {/* Mode Indicator */}
              {currentMode !== 'normal' && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium">
                  {currentMode === 'simulation' ? <Brain className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  <span>{currentMode === 'simulation' ? 'AI Simulation' : 'Festival Mode'}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Simulation Mode Button - Available to both roles */}
                <motion.button
                  onClick={handleSimulationMode}
                  disabled={isRefreshing}
                  className={`flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="AI Simulation Mode"
                >
                  <Brain className="w-4 h-4" />
                  <span className="hidden sm:inline">Simulation</span>
                </motion.button>

                {/* Festival Mode Button - Admin only */}
                {authState.user?.role === 'admin' && (
                  <motion.button
                    onClick={handleFestivalMode}
                    disabled={isRefreshing}
                    className={`flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Festival AI Schedule"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">Festival</span>
                  </motion.button>
                )}

                {/* Normal Mode Button - Show when in special mode */}
                {currentMode !== 'normal' && (
                  <motion.button
                    onClick={handleNormalMode}
                    className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="Normal Mode"
                  >
                    <Activity className="w-4 h-4" />
                    <span className="hidden sm:inline">Normal</span>
                  </motion.button>
                )}
              </div>

              <motion.button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={`flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 btn-animate ${isRefreshing ? 'opacity-75 cursor-not-allowed' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Refresh Data'}</span>
              </motion.button>
              
              {/* User Info and Logout */}
              <div className="flex items-center space-x-3 pl-4 border-l border-white/20">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{authState.user?.name}</p>
                  <p className="text-xs text-gray-600 capitalize">{authState.user?.role}</p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics Dashboard */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {/* Show mode-specific header */}
          {currentMode !== 'normal' && (
            <motion.div 
              className="xl:col-span-6 mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`glass rounded-2xl p-4 border border-white/20 shadow-lg ${
                currentMode === 'simulation' 
                  ? 'bg-gradient-to-r from-purple-50 to-indigo-50' 
                  : 'bg-gradient-to-r from-pink-50 to-purple-50'
              }`}>
                <div className="flex items-center space-x-3">
                  {currentMode === 'simulation' ? (
                    <>
                      <Brain className="w-6 h-6 text-purple-600" />
                      <div>
                        <h3 className="font-semibold text-purple-900">AI Simulation Mode Active</h3>
                        <p className="text-sm text-purple-700">Showing AI-optimized schedule with increased peak-hour frequency</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 text-pink-600" />
                      <div>
                        <h3 className="font-semibold text-pink-900">Festival AI Schedule Active</h3>
                        <p className="text-sm text-pink-700">Diwali Special - 20% more trains from 5 PM to 10 PM with festival routes</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Trains</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.totalTrains}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-glow">
                <Train className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+2 from yesterday</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On-Time Performance</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.onTimePerformance.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-glow-green">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+1.2% this week</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Energy Savings</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.energySavings.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-glow-green">
                <Battery className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Zap className="w-4 h-4 text-emerald-500 mr-1" />
              <span className="text-sm text-emerald-600 font-medium">$12,450 saved</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passenger Rating</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.passengerSatisfaction.toFixed(1)}/5</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+0.3 this month</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Delay</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.averageDelay.toFixed(1)}min</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl shadow-glow-yellow">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1 rotate-180" />
              <span className="text-sm text-green-600 font-medium">-0.8min improved</span>
            </div>
          </motion.div>

          <motion.div className="glass rounded-2xl p-6 card-hover border border-white/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Efficiency</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.systemEfficiency.toFixed(1)}%</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">Optimal range</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            {/* Passenger Demand Prediction */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Passenger Demand Forecast</h3>
                    <p className="text-sm text-gray-600">Real-time vs AI Predictions</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Actual</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                    <span className="text-gray-600">Predicted</span>
                  </div>
                </div>
              </div>
              
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={passengerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="passengers" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#818cf8" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#818cf8', strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Cost Comparison */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Cost Analysis</h3>
                    <p className="text-sm text-gray-600">Traditional vs AI-Optimized Operations</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">-23%</p>
                  <p className="text-sm text-gray-600">Cost Reduction</p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="month" 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="traditional" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="optimized" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Schedule & Alerts */}
          <div className="space-y-8">
            {/* Energy Savings */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Energy Efficiency</h3>
                  <p className="text-sm text-gray-600">Current optimization status</p>
                </div>
              </div>
              
              <div className="h-48 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={energyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {energyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">{energyData[0].value}%</p>
                <p className="text-sm text-gray-600">Energy Saved Today</p>
              </div>
            </motion.div>

            {/* Live Train Schedule */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentMode === 'festival' ? 'Festival Schedule' : 'Live Schedule'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {currentMode === 'festival' ? 'Special event departures' : 'Next departures'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {trainSchedule.map((train, index) => (
                  <motion.div 
                    key={train.id}
                    className="flex items-center justify-between p-3 bg-white/50 rounded-xl border border-white/30 card-hover-subtle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900">{train.id}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(train.status)}`}>
                          {train.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{train.route}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Dep: {train.departure}</span>
                        <span>Arr: {train.arrival}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">
                        {train.passengers}/{train.capacity}
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(train.passengers / train.capacity) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* System Alerts */}
            <motion.div 
              className="glass rounded-2xl p-6 border border-white/20 shadow-lg"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
                  <p className="text-sm text-gray-600">Recent notifications</p>
                </div>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <motion.div 
                    key={alert.id}
                    className={`p-3 rounded-xl border-l-4 ${getPriorityColor(alert.priority)} card-hover-subtle`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-500">{alert.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Admin Controls - Only visible to admin users */}
        {authState.user?.role === 'admin' && (
          <motion.div 
            className="mt-8 glass rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Admin Controls</h3>
                <p className="text-sm text-gray-600">System management and configuration</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.button
                className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 card-hover-subtle"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Edit3 className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Edit Schedules</p>
                  <p className="text-sm text-gray-600">Modify train timings</p>
                </div>
              </motion.button>
              
              <motion.button
                className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 card-hover-subtle"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserPlus className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Manage Users</p>
                  <p className="text-sm text-gray-600">Add/remove operators</p>
                </div>
              </motion.button>
              
              <motion.button
                className="flex items-center space-x-3 p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200 card-hover-subtle"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">System Reports</p>
                  <p className="text-sm text-gray-600">Generate analytics</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.footer 
          className="mt-12 text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Mumbai Metro Network</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span className="text-sm">System Status: Operational</span>
            </div>
          </div>
          <p className="text-sm">
            © 2024 MetroMind AI. Powered by advanced machine learning algorithms.
          </p>
        </motion.footer>
      </main>
    </div>
  );
}

export default App;