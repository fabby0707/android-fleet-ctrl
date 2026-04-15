import { 
  ArrowLeft, 
  Shield, 
  Smartphone, 
  MapPin, 
  HardDrive, 
  Cpu, 
  ShieldAlert,
  Download,
  Trash2,
  Lock,
  Unlock,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Device } from '@/lib/types';
import { toast } from 'sonner';

interface DeviceDetailProps {
  device: Device;
  onBack: () => void;
}

export function DeviceDetail({ device, onBack }: DeviceDetailProps) {
  const handleAction = (action: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: `Sending ${action} command...`,
        success: `${action} successful.`,
        error: `Failed to ${action}.`,
      }
    );
  };

  return (
    <div className="p-4 lg:p-8 space-y-6 animate-in slide-in-from-right duration-300">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold">{device.name}</h1>
            <Badge variant={device.status === 'online' ? 'default' : 'secondary'}>
              {device.status}
            </Badge>
          </div>
          <p className="text-slate-500 text-sm">{device.model} • SN: {device.id}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Device Info Panel */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Device Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-sm">
                <BatteryMediumIcon className="h-5 w-5 text-slate-400" />
                <span>Battery Level</span>
              </div>
              <span className="font-bold">{device.battery}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-slate-400" />
                <span>Location</span>
              </div>
              <span className="text-xs text-slate-600">{device.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-sm">
                <Shield className="h-5 w-5 text-slate-400" />
                <span>Security</span>
              </div>
              <Badge variant="outline" className={device.securityStatus.encrypted ? "text-green-600 border-green-200" : "text-red-600 border-red-200"}>
                {device.securityStatus.encrypted ? "Encrypted" : "Unsecured"}
              </Badge>
            </div>

            <div className="pt-4 border-t space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center"><HardDrive className="h-3 w-3 mr-1" /> Storage</span>
                  <span>{device.storage.used}GB / {device.storage.total}GB</span>
                </div>
                <Progress value={(device.storage.used / device.storage.total) * 100} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center"><Cpu className="h-3 w-3 mr-1" /> Memory</span>
                  <span>{device.ram.used}GB / {device.ram.total}GB</span>
                </div>
                <Progress value={(device.ram.used / device.ram.total) * 100} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action & Management Area */}
        <Card className="md:col-span-2">
          <Tabs defaultValue="apps" className="w-full">
            <div className="px-6 pt-4 border-b">
              <TabsList className="bg-transparent border-none gap-4">
                <TabsTrigger value="apps" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-0 pb-4">Applications</TabsTrigger>
                <TabsTrigger value="security" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-0 pb-4">Security</TabsTrigger>
                <TabsTrigger value="policy" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-0 pb-4">Policies</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="apps" className="p-6 space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{device.apps.length} Installed Apps</h3>
                <Button size="sm">
                  <Download className="h-4 w-4 mr-2" /> Push New App
                </Button>
              </div>
              <div className="space-y-3">
                {device.apps.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center text-xl">
                        {app.icon}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{app.name} <span className="text-[10px] text-slate-400 font-normal">v{app.version}</span></p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{app.permissions.join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8"><Info className="h-4 w-4" /></Button>
                      {!app.isSystemApp && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => handleAction(`Uninstall ${app.name}`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="security" className="p-6 space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <Card className="border-orange-100 bg-orange-50/20">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-orange-600" /> 
                      Remote Access
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => handleAction('Device Lock')}
                    >
                      <Lock className="h-4 w-4 mr-2" /> Lock Device
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => handleAction('Screen Message')}
                    >
                      <Smartphone className="h-4 w-4 mr-2" /> Display Message
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-red-100 bg-red-50/20">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm flex items-center text-red-700">
                      <ShieldAlert className="h-4 w-4 mr-2" /> 
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 space-y-3">
                    <Button 
                      variant="destructive" 
                      className="w-full justify-start text-sm h-9"
                      onClick={() => handleAction('Factory Reset')}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Factory Reset
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-sm h-9 text-red-600 hover:bg-red-50 border-red-200"
                      onClick={() => handleAction('Wipe Corporate Data')}
                    >
                      <ShieldAlert className="h-4 w-4 mr-2" /> Wipe Work Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Security Settings</h4>
                <div className="space-y-4">
                  {[
                    { label: 'Allow USB Debugging', enabled: false },
                    { label: 'Enforce Biometric Unlock', enabled: true },
                    { label: 'Screen Recording Block', enabled: true },
                    { label: 'Prevent App Sideloading', enabled: true },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{setting.label}</span>
                      <Switch defaultChecked={setting.enabled} onCheckedChange={() => handleAction('Policy Update')} />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

function BatteryMediumIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="10" x="2" y="7" rx="2" ry="2" />
      <line x1="22" x2="22" y1="11" y2="13" />
      <line x1="6" x2="6" y1="11" y2="13" />
      <line x1="10" x2="10" y1="11" y2="13" />
    </svg>
  );
}