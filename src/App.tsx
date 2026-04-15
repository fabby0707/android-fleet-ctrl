import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Dashboard } from './components/Dashboard';
import { DevicesList } from './components/Devices';
import { DeviceDetail } from './components/DeviceDetail';
import { UserProfile } from './components/UserProfile';
import { Toaster } from './components/ui/sonner';
import { Device } from './lib/types';
import { ShieldCheck, ShieldAlert, FileText, CheckCircle2, Settings as SettingsIcon, Database, Globe, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './components/ui/card';
import { Button } from './components/ui/button';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const renderContent = () => {
    if (selectedDevice) {
      return (
        <DeviceDetail 
          device={selectedDevice} 
          onBack={() => setSelectedDevice(null)} 
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'devices':
        return <DevicesList onSelectDevice={setSelectedDevice} />;
      case 'users':
        return <UserProfile />;
      case 'security':
        return (
          <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
              <p className="text-slate-500">Global security posture and compliance monitoring.</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
                    Compliance Rate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.2%</div>
                  <p className="text-xs text-slate-500">+1.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <ShieldAlert className="mr-2 h-4 w-4 text-red-500" />
                    Critical Vulnerabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-slate-500">2 devices affected</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-blue-500" />
                    Audit Logs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1.2k</div>
                  <p className="text-xs text-slate-500">Events this week</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Organization Security Policies</CardTitle>
                <CardDescription>Global rules applied to all managed devices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: 'Passcode Requirement', desc: 'Minimum 6 characters, alphanumeric', active: true },
                  { title: 'Data Encryption', desc: 'Force full-disk encryption (FDE/FBE)', active: true },
                  { title: 'Root Detection', desc: 'Block access for rooted or compromised devices', active: true },
                  { title: 'USB Debugging', desc: 'Disabled by default for all units', active: false },
                ].map((policy) => (
                  <div key={policy.title} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{policy.title}</h4>
                      <p className="text-sm text-slate-500">{policy.desc}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${policy.active ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                      <span className="text-xs font-medium uppercase tracking-wider">{policy.active ? 'Active' : 'Draft'}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 lg:p-8 space-y-8 animate-in fade-in duration-500">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
              <p className="text-slate-500">Global configuration and instance management.</p>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-slate-400" />
                    Server Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-slate-500">API Endpoint</label>
                      <input className="w-full px-3 py-2 bg-slate-50 border rounded-md text-sm" defaultValue="https://api.droidadmin.io/v1" readOnly />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold uppercase text-slate-500">Sync Interval</label>
                      <select className="w-full px-3 py-2 bg-white border rounded-md text-sm">
                        <option>Every 5 minutes</option>
                        <option>Every 15 minutes</option>
                        <option>Every hour</option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="mr-2 h-5 w-5 text-slate-400" />
                    Storage & Backup
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium">Automatic Backups</span>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  <p className="text-xs text-slate-500 italic">Last backup completed: 2 hours ago (3.4 GB)</p>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button className="flex-1 sm:flex-none">Save All Changes</Button>
                <Button variant="ghost" className="flex-1 sm:flex-none">Reset to Defaults</Button>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        setSelectedDevice(null);
      }} />
      
      <div className="flex-1 flex flex-col lg:pl-64">
        <TopNav />
        <main className="flex-1 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      
      <Toaster position="top-right" closeButton richColors />
    </div>
  );
}

export default App;