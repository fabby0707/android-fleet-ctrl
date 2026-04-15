import { Search, Bell, HelpCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockUser } from '@/lib/mock-data';

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b bg-white/80 backdrop-blur-md px-4 lg:px-8">
      <div className="flex flex-1 items-center space-x-4">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input 
            placeholder="Search devices, apps, or users..." 
            className="pl-10 bg-slate-50 border-none focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Button variant="ghost" size="icon" className="relative text-slate-600">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="text-slate-600 hidden sm:flex">
          <HelpCircle className="h-5 w-5" />
        </Button>

        <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-auto flex items-center space-x-2 px-1 hover:bg-slate-100 rounded-full">
              <Avatar className="h-8 w-8 border border-slate-200">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left mr-2">
                <p className="text-xs font-semibold leading-none">{mockUser.name}</p>
                <p className="text-[10px] text-slate-500 mt-1">{mockUser.role}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{mockUser.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{mockUser.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile Settings</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuItem>API Keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50">Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}