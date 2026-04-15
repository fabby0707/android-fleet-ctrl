import { Device, ActivityLog, UserProfile } from './types';

export const mockUser: UserProfile = {
  id: 'u-1',
  name: 'Alex Johnson',
  email: 'alex.j@admin.com',
  role: 'Admin',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  lastLogin: '2024-05-15 08:42 AM',
};

export const mockDevices: Device[] = [
  {
    id: 'd-1',
    name: 'Sales-Pixel-7',
    model: 'Google Pixel 7',
    status: 'online',
    battery: 84,
    lastSeen: '2 mins ago',
    location: 'New York, USA',
    storage: { used: 42, total: 128 },
    ram: { used: 3.2, total: 8 },
    securityStatus: {
      locked: false,
      encrypted: true,
      passcodeSet: true,
      biometricSet: true,
    },
    apps: [
      { id: 'a-1', name: 'CRM Connect', version: '2.4.1', size: '45MB', permissions: ['Location', 'Contacts'], isSystemApp: false, lastUpdated: '2024-04-12', icon: '💼' },
      { id: 'a-2', name: 'Slack', version: '24.05', size: '120MB', permissions: ['Storage', 'Notifications'], isSystemApp: false, lastUpdated: '2024-05-01', icon: '💬' },
      { id: 'a-3', name: 'Gmail', version: '2024.04', size: '85MB', permissions: ['Contacts', 'Calendar'], isSystemApp: true, lastUpdated: '2024-05-10', icon: '✉️' },
    ],
  },
  {
    id: 'd-2',
    name: 'Logistics-Galaxy-S23',
    model: 'Samsung Galaxy S23',
    status: 'warning',
    battery: 12,
    lastSeen: '15 mins ago',
    location: 'Chicago, USA',
    storage: { used: 98, total: 256 },
    ram: { used: 6.8, total: 12 },
    securityStatus: {
      locked: true,
      encrypted: true,
      passcodeSet: true,
      biometricSet: false,
    },
    apps: [
      { id: 'a-4', name: 'Inventory Pro', version: '1.8.0', size: '65MB', permissions: ['Camera', 'Location'], isSystemApp: false, lastUpdated: '2024-03-20', icon: '📦' },
      { id: 'a-5', name: 'WhatsApp', version: '2.24', size: '95MB', permissions: ['Contacts', 'Camera', 'Microphone'], isSystemApp: false, lastUpdated: '2024-05-14', icon: '📱' },
    ],
  },
  {
    id: 'd-3',
    name: 'Dev-OnePlus-11',
    model: 'OnePlus 11',
    status: 'offline',
    battery: 0,
    lastSeen: '3 days ago',
    location: 'San Francisco, USA',
    storage: { used: 210, total: 512 },
    ram: { used: 4.5, total: 16 },
    securityStatus: {
      locked: false,
      encrypted: true,
      passcodeSet: true,
      biometricSet: true,
    },
    apps: [
      { id: 'a-6', name: 'Docker Client', version: '1.2.1', size: '30MB', permissions: ['Network'], isSystemApp: false, lastUpdated: '2024-01-15', icon: '🐳' },
    ],
  },
  {
    id: 'd-4',
    name: 'Support-Moto-G',
    model: 'Motorola Moto G',
    status: 'critical',
    battery: 5,
    lastSeen: 'Just now',
    location: 'London, UK',
    storage: { used: 58, total: 64 },
    ram: { used: 3.8, total: 4 },
    securityStatus: {
      locked: false,
      encrypted: false,
      passcodeSet: false,
      biometricSet: false,
    },
    apps: [
      { id: 'a-7', name: 'Zendesk', version: '4.2', size: '40MB', permissions: ['Contacts', 'Camera'], isSystemApp: false, lastUpdated: '2024-05-02', icon: '🎧' },
    ],
  },
];

export const mockLogs: ActivityLog[] = [
  { id: 'l-1', timestamp: '2024-05-15 10:15:02', action: 'Device Remote Locked', device: 'Sales-Pixel-7', user: 'Alex Johnson', severity: 'success' },
  { id: 'l-2', timestamp: '2024-05-15 09:42:15', action: 'App Installation Failed', device: 'Logistics-Galaxy-S23', user: 'System', severity: 'error' },
  { id: 'l-3', timestamp: '2024-05-15 09:12:00', action: 'Low Battery Alert', device: 'Support-Moto-G', user: 'System', severity: 'warning' },
  { id: 'l-4', timestamp: '2024-05-15 08:30:45', action: 'Policy Updated', device: 'All Devices', user: 'Alex Johnson', severity: 'info' },
];