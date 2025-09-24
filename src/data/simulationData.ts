// Simulation Mode Data - AI-generated realistic schedules
export const generateSimulationData = () => {
  const simulationPassengerData = [
    { time: '5 AM', passengers: 80, predicted: 85 },
    { time: '6 AM', passengers: 180, predicted: 175 },
    { time: '7 AM', passengers: 420, predicted: 410 },
    { time: '8 AM', passengers: 750, predicted: 740 },
    { time: '9 AM', passengers: 580, predicted: 590 },
    { time: '10 AM', passengers: 320, predicted: 330 },
    { time: '11 AM', passengers: 280, predicted: 275 },
    { time: '12 PM', passengers: 450, predicted: 460 },
    { time: '1 PM', passengers: 380, predicted: 375 },
    { time: '2 PM', passengers: 340, predicted: 350 },
    { time: '3 PM', passengers: 390, predicted: 385 },
    { time: '4 PM', passengers: 520, predicted: 530 },
    { time: '5 PM', passengers: 680, predicted: 670 },
    { time: '6 PM', passengers: 820, predicted: 810 },
    { time: '7 PM', passengers: 650, predicted: 660 },
    { time: '8 PM', passengers: 480, predicted: 490 },
    { time: '9 PM', passengers: 320, predicted: 315 },
    { time: '10 PM', passengers: 220, predicted: 230 },
  ];

  const simulationTrainSchedule = [
    { id: 'T001', route: 'Central → Airport', departure: '06:10', arrival: '06:40', status: 'On Time', passengers: 280, capacity: 300 },
    { id: 'T002', route: 'North → South', departure: '06:15', arrival: '07:05', status: 'On Time', passengers: 220, capacity: 250 },
    { id: 'T003', route: 'East → West', departure: '06:18', arrival: '06:48', status: 'On Time', passengers: 260, capacity: 280 },
    { id: 'T004', route: 'Airport → Central', departure: '06:22', arrival: '06:52', status: 'Early 2min', passengers: 240, capacity: 300 },
    { id: 'T005', route: 'South → North', departure: '06:25', arrival: '07:15', status: 'On Time', passengers: 200, capacity: 250 },
    { id: 'T006', route: 'West → East', departure: '06:28', arrival: '06:58', status: 'On Time', passengers: 190, capacity: 280 },
    { id: 'T007', route: 'Central → North', departure: '06:32', arrival: '07:02', status: 'On Time', passengers: 210, capacity: 250 },
  ];

  const simulationAlerts = [
    { id: 1, type: 'info', message: 'AI Simulation: Increased frequency during peak hours', time: 'Just now', priority: 'medium' },
    { id: 2, type: 'success', message: 'Simulation shows 15% improvement in passenger flow', time: '1 min ago', priority: 'low' },
    { id: 3, type: 'warning', message: 'Predicted congestion at Central Station at 8:30 AM', time: '2 min ago', priority: 'high' },
    { id: 4, type: 'info', message: 'AI recommends 3 additional trains for morning rush', time: '3 min ago', priority: 'medium' }
  ];

  const simulationMetrics = {
    totalTrains: 28,
    onTimePerformance: 96.8,
    energySavings: 22.3,
    passengerSatisfaction: 4.8,
    averageDelay: 1.8,
    systemEfficiency: 94.2
  };

  return {
    passengerData: simulationPassengerData,
    trainSchedule: simulationTrainSchedule,
    alerts: simulationAlerts,
    metrics: simulationMetrics
  };
};

// Festival Mode Data - Special event schedules
export const generateFestivalData = () => {
  const festivalPassengerData = [
    { time: '5 AM', passengers: 150, predicted: 160 },
    { time: '6 AM', passengers: 280, predicted: 290 },
    { time: '7 AM', passengers: 480, predicted: 470 },
    { time: '8 AM', passengers: 720, predicted: 710 },
    { time: '9 AM', passengers: 620, predicted: 630 },
    { time: '10 AM', passengers: 450, predicted: 460 },
    { time: '11 AM', passengers: 380, predicted: 375 },
    { time: '12 PM', passengers: 520, predicted: 530 },
    { time: '1 PM', passengers: 480, predicted: 475 },
    { time: '2 PM', passengers: 420, predicted: 430 },
    { time: '3 PM', passengers: 580, predicted: 570 },
    { time: '4 PM', passengers: 720, predicted: 730 },
    { time: '5 PM', passengers: 950, predicted: 940 },
    { time: '6 PM', passengers: 1200, predicted: 1180 },
    { time: '7 PM', passengers: 1100, predicted: 1120 },
    { time: '8 PM', passengers: 980, predicted: 990 },
    { time: '9 PM', passengers: 850, predicted: 860 },
    { time: '10 PM', passengers: 680, predicted: 690 },
  ];

  const festivalTrainSchedule = [
    { id: 'F001', route: 'Central → Temple District', departure: '05:00', arrival: '05:45', status: 'On Time', passengers: 290, capacity: 300 },
    { id: 'F002', route: 'Airport → Festival Grounds', departure: '05:15', arrival: '06:00', status: 'On Time', passengers: 280, capacity: 300 },
    { id: 'T001', route: 'Central → Airport', departure: '05:30', arrival: '06:00', status: 'On Time', passengers: 270, capacity: 300 },
    { id: 'F003', route: 'North → Festival Grounds', departure: '05:45', arrival: '06:30', status: 'On Time', passengers: 240, capacity: 250 },
    { id: 'T002', route: 'North → South', departure: '06:00', arrival: '06:50', status: 'On Time', passengers: 230, capacity: 250 },
    { id: 'F004', route: 'Festival Special Express', departure: '06:15', arrival: '06:45', status: 'On Time', passengers: 295, capacity: 300 },
    { id: 'F005', route: 'Temple District → Central', departure: '06:30', arrival: '07:15', status: 'On Time', passengers: 285, capacity: 300 },
    { id: 'F006', route: 'Festival Grounds → Airport', departure: '06:45', arrival: '07:30', status: 'On Time', passengers: 275, capacity: 300 },
  ];

  const festivalAlerts = [
    { id: 1, type: 'warning', message: 'Diwali Special: 20% more trains from 5 PM to 10 PM', time: 'Just now', priority: 'high' },
    { id: 2, type: 'info', message: 'Festival Mode Active: Additional security deployed', time: '5 min ago', priority: 'medium' },
    { id: 3, type: 'success', message: 'Special festival routes operational', time: '10 min ago', priority: 'low' },
    { id: 4, type: 'warning', message: 'Expected crowd surge at Temple District stations', time: '15 min ago', priority: 'high' }
  ];

  const festivalMetrics = {
    totalTrains: 32,
    onTimePerformance: 92.5,
    energySavings: 16.8,
    passengerSatisfaction: 4.4,
    averageDelay: 3.2,
    systemEfficiency: 89.6
  };

  return {
    passengerData: festivalPassengerData,
    trainSchedule: festivalTrainSchedule,
    alerts: festivalAlerts,
    metrics: festivalMetrics
  };
};