export interface Device {
  id: string;
  name: string;
  model: string;
  status: 'online' | 'offline' | 'warning' | 'critical';
  battery: number;
  lastSeen: string;
  location: string;
  storage: {
    used: number;
    total: number;
  };
  ram: {
    used: number;
    total: number;
  };
  apps: AppInfo[];
  securityStatus: {
    locked: boolean;
    encrypted: boolean;
    passcodeSet: boolean;
    biometricSet: boolean;
  };
}

export interface AppInfo {
  id: string;
  name: string;
  version: string;
  size: string;
  permissions: string[];
  isSystemApp: boolean;
  lastUpdated: string;
  icon: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  device: string;
  user: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  avatar: string;
  lastLogin: string;
}