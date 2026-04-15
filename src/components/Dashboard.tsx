import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Activity, 
  ShieldAlert, 
  BatteryMedium,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { mockDevices, mockLogs } from '@/lib/mock-data';

export function Dashboard() {
  const stats = [
    { title: 'Total Managed', value: '42', icon: Smartphone, color: 'bg-blue-500', trend: '+2 this week', positive: true },
    { title: 'Online Now', value: '38', icon: Activity, color: 'bg-green-500', trend: '90.4% uptime', positive: true },
    { title: 'Security Alerts', value: '3', icon: ShieldAlert, color: 'bg-red-500', trend: 'Needs attention', positive: false },
    { title: 'Low Battery', value: '5', icon: BatteryMedium, color: 'bg-orange-500', trend: 'Under 15%', positive: false },
  ];

  return (
    <div className="space-y-8 p-4 lg:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fleet Overview</h1>
          <p className="text-slate-500">Welcome back. Here's what's happening with your managed devices.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Download Report</Button>
          <Button size="sm">Register New Device</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color.split('-')[1]}-600`} />
                  </div>
                  <div className={`flex items-center text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                    {stat.positive ? <ArrowUpRight className="ml-1 h-3 w-3" /> : <ArrowDownRight className="ml-1 h-3 w-3" />}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Device Health Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Storage Distribution</CardTitle>
                <CardDescription>Aggregate storage usage across the entire fleet</CardDescription>
              </div>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Total Used Storage</span>
                <span className="text-slate-500">1.2 TB / 4.0 TB</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            
            <div className="grid gap-4 pt-4 border-t">
              {mockDevices.slice(0, 3).map((device) => (
                <div key={device.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span className="text-sm font-medium">{device.name}</span>
                  </div>
                  <div className="text-sm text-slate-500">
                    {Math.round((device.storage.used / device.storage.total) * 100)}% Used
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {mockLogs.map((log) => (
                <div key={log.id} className="flex gap-4">
                  <div className="mt-1">
                    {log.severity === 'success' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                    {log.severity === 'error' && <AlertTriangle className="h-5 w-5 text-red-500" />}
                    {log.severity === 'warning' && <Clock className="h-5 w-5 text-orange-500" />}
                    {log.severity === 'info' && <Activity className="h-5 w-5 text-blue-500" />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{log.action}</p>
                    <p className="text-xs text-slate-500">{log.device} • {log.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 text-xs" size="sm">
              View Audit Log
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}