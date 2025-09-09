import { Search, Home, Users, MessageSquare, Bell, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  return (
    <header className="linkedin-nav px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo and Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-linkedin-blue rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">in</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">LinkedIn</span>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search" 
              className="pl-10 bg-muted border-none"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <nav className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6">
            <NavItem icon={<Home className="h-5 w-5" />} label="Home" active />
            <NavItem icon={<Users className="h-5 w-5" />} label="Network" />
            <NavItem icon={<MessageSquare className="h-5 w-5" />} label="Messaging" />
            <NavItem icon={<Bell className="h-5 w-5" />} label="Notifications" badge="3" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Me
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

const NavItem = ({ icon, label, active = false, badge }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  badge?: string; 
}) => {
  return (
    <div className={`flex flex-col items-center space-y-1 cursor-pointer relative ${
      active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`}>
      <div className="relative">
        {icon}
        {badge && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs flex items-center justify-center"
          >
            {badge}
          </Badge>
        )}
      </div>
      <span className="text-xs">{label}</span>
      {active && <div className="absolute bottom-0 w-full h-0.5 bg-foreground" />}
    </div>
  );
};

export default Header;