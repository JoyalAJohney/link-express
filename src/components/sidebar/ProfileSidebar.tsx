import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Bookmark } from "lucide-react";

const ProfileSidebar = () => {
  return (
    <div className="space-y-4">
      {/* Profile Card */}
      <Card className="linkedin-card">
        <CardHeader className="pb-0">
          <div className="relative">
            <div className="h-16 bg-gradient-to-r from-linkedin-blue to-linkedin-blue/80 rounded-t-lg" />
            <Avatar className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 h-12 w-12 border-2 border-background">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="pt-8 text-center">
          <h3 className="font-semibold">John Doe</h3>
          <p className="text-sm text-muted-foreground">Full Stack Developer</p>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Profile viewers</span>
              <span className="font-medium text-linkedin-blue">142</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Post impressions</span>
              <span className="font-medium text-linkedin-blue">1,284</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center text-sm text-muted-foreground">
              <Bookmark className="h-4 w-4 mr-2" />
              <span>My items</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="linkedin-card">
        <CardHeader>
          <h3 className="text-sm font-semibold">Recent</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <RecentItem icon="🏢" text="JavaScript Developers" />
            <RecentItem icon="💻" text="Web Development" />
            <RecentItem icon="⚛️" text="React Community" />
            <RecentItem icon="🚀" text="Startup Life" />
          </div>
        </CardContent>
      </Card>

      {/* Discover More */}
      <Card className="linkedin-card">
        <CardHeader>
          <h3 className="text-sm font-semibold">Groups</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <GroupItem name="JavaScript Developers" members="125K" />
            <GroupItem name="React Community" members="89K" />
            <GroupItem name="Full Stack Engineers" members="67K" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RecentItem = ({ icon, text }: { icon: string; text: string }) => {
  return (
    <div className="flex items-center space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
      <span className="text-lg">{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
};

const GroupItem = ({ name, members }: { name: string; members: string }) => {
  return (
    <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded">
      <div>
        <p className="text-sm font-medium">{name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3 w-3 mr-1" />
          <span>{members} members</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;