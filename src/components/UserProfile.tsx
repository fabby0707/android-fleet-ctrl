import { User, Mail, Shield, Smartphone, Bell, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Switch } from './ui/switch';
import { mockUser } from '@/lib/mock-data';
import { toast } from 'sonner';

export function UserProfile() {
  const handleSave = () => {
    toast.success('Profile updated', {
      description: 'Your changes have been saved successfully.'
    });
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Profile</h1>
        <p className="text-slate-500">Manage your account information and preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column - Avatar & Basic Info */}
        <div className="md:col-span-1 space-y-6">
          <Card className="text-center p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32 border-4 border-slate-50 shadow-sm">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="text-3xl font-bold">{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{mockUser.name}</h3>
                <p className="text-sm text-slate-500">{mockUser.role}</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">Change Photo</Button>
            </div>
          </Card>

          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-semibold">Account Status</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Last Login</span>
                <span className="font-medium">{mockUser.lastLogin}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Status</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">ID</span>
                <span className="font-mono text-[10px]">{mockUser.id}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Forms */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact info.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input defaultValue={mockUser.name} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input defaultValue={mockUser.email} className="pl-10" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Role</label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input defaultValue={mockUser.role} disabled className="pl-10 bg-slate-50" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-slate-50/50 p-4">
              <Button onClick={handleSave} className="ml-auto">Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive system alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Security Alerts</p>
                  <p className="text-xs text-slate-500">Immediate notifications for unauthorized access.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Device Status</p>
                  <p className="text-xs text-slate-500">Reports when devices go offline or have low battery.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-2">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">App Updates</p>
                  <p className="text-xs text-slate-500">Weekly summaries of pushed application updates.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}