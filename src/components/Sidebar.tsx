import { 
  LayoutDashboard, 
  Smartphone, 
  Users, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'devices', icon: Smartphone, label: 'Devices' },
    { id: 'security', icon: ShieldCheck, label: 'Security' },
    { id: 'users', icon: Users, label: 'User Profiles' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transition-transform duration-300 transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center space-x-2">
            <div className="bg-primary rounded-lg p-1.5">
              <Smartphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">DroidAdmin</span>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-4 space-y-1 py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex items-center w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activeTab === item.id 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <item.icon className={cn("mr-3 h-5 w-5", activeTab === item.id ? "text-primary-foreground" : "text-slate-400")} />
                {item.label}
                {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4 opacity-70" />}
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-red-600 hover:bg-red-50">
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}