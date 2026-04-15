import { useState } from 'react';
import { 
  MoreVertical, 
  Search, 
  Filter, 
  Smartphone, 
  Shield, 
  RefreshCcw,
  ExternalLink,
  Lock,
  Trash2,
  Settings
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from './ui/table';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { mockDevices } from '@/lib/mock-data';
import { Device } from '@/lib/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface DevicesListProps {
  onSelectDevice: (device: Device) => void;
}

export function DevicesList({ onSelectDevice }: DevicesListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = mockDevices.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: Device['status']) => {
    switch (status) {
      case 'online': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Online</Badge>;
      case 'offline': return <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">Offline</Badge>;
      case 'warning': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">Low Power</Badge>;
      case 'critical': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Insecure</Badge>;
      default: return null;
    }
  };

  const handleAction = (action: string, deviceName: string) => {
    toast.success(`${action} initiated for ${deviceName}`, {
      description: 'Request sent to device successfully.'
    });
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
          <p className="text-slate-500">Manage and monitor all registered handheld units.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Smartphone className="mr-2 h-4 w-4" />
          Enroll Device
        </Button>
      </div>

      <Card className="overflow-hidden border-none shadow-sm">
        <div className="p-4 border-b bg-slate-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Filter by name or model..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
              <RefreshCcw className="mr-2 h-4 w-4" />
              Sync All
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Device Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Model</TableHead>
              <TableHead className="hidden lg:table-cell">Battery</TableHead>
              <TableHead className="hidden lg:table-cell">Last Seen</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevices.map((device) => (
              <TableRow key={device.id} className="cursor-pointer hover:bg-slate-50 group">
                <TableCell onClick={() => onSelectDevice(device)}>
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "p-2 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors",
                      device.status === 'critical' && "bg-red-50 text-red-500"
                    )}>
                      <Smartphone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{device.name}</p>
                      <p className="text-xs text-slate-500">{device.id}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell onClick={() => onSelectDevice(device)}>
                  {getStatusBadge(device.status)}
                </TableCell>
                <TableCell className="hidden md:table-cell text-slate-600" onClick={() => onSelectDevice(device)}>
                  {device.model}
                </TableCell>
                <TableCell className="hidden lg:table-cell" onClick={() => onSelectDevice(device)}>
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          device.battery > 50 ? "bg-green-500" : device.battery > 20 ? "bg-orange-500" : "bg-red-500"
                        )} 
                        style={{ width: `${device.battery}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{device.battery}%</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-slate-600" onClick={() => onSelectDevice(device)}>
                  {device.lastSeen}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => onSelectDevice(device)}>
                        <ExternalLink className="mr-2 h-4 w-4" /> View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Sync', device.name)}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Force Sync
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleAction('Remote Lock', device.name)} className="text-orange-600">
                        <Lock className="mr-2 h-4 w-4" /> Remote Lock
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction('Wipe', device.name)} className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" /> Wipe Data
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

import { Card } from './ui/card';