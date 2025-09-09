import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Briefcase } from "lucide-react";

const NewsSidebar = () => {
  return (
    <div className="space-y-4">
      {/* LinkedIn News */}
      <Card className="linkedin-card">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <h3 className="text-sm font-semibold">LinkedIn News</h3>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <NewsItem 
              title="AI reshapes software development" 
              subtitle="Top news • 1,234 readers"
            />
            <NewsItem 
              title="Remote work trends in 2024" 
              subtitle="Tech • 856 readers"
            />
            <NewsItem 
              title="Startup funding reaches new highs" 
              subtitle="Business • 2,145 readers"
            />
            <NewsItem 
              title="The future of web development" 
              subtitle="Technology • 967 readers"
            />
            <NewsItem 
              title="Career switching strategies" 
              subtitle="Career advice • 1,834 readers"
            />
          </div>
        </CardContent>
      </Card>

      {/* Add to your feed */}
      <Card className="linkedin-card">
        <CardHeader>
          <h3 className="text-sm font-semibold">Add to your feed</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <SuggestedFollow 
              name="Tech Crunch"
              type="Company"
              followers="2.1M"
              avatar="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=40&h=40&fit=crop"
            />
            <SuggestedFollow 
              name="Sarah Johnson"
              type="Software Engineer at Google"
              followers="12K"
              avatar="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face"
            />
            <SuggestedFollow 
              name="Frontend Masters"
              type="Company"
              followers="890K"
              avatar="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=40&h=40&fit=crop"
            />
          </div>
        </CardContent>
      </Card>

      {/* Today's most viewed profiles */}
      <Card className="linkedin-card">
        <CardHeader>
          <h3 className="text-sm font-semibold">Today's most viewed profiles</h3>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <ProfileView 
              name="Alex Chen"
              title="Senior React Developer"
              company="Meta"
              badge="3rd"
            />
            <ProfileView 
              name="Maria Garcia"
              title="Product Manager"
              company="Microsoft"
              badge="2nd"
            />
            <ProfileView 
              name="David Kim"
              title="UX Designer"
              company="Apple"
              badge="3rd"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NewsItem = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="cursor-pointer hover:bg-muted/50 p-2 rounded">
      <p className="text-sm font-medium leading-tight">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </div>
  );
};

const SuggestedFollow = ({ 
  name, 
  type, 
  followers, 
  avatar 
}: { 
  name: string; 
  type: string; 
  followers: string; 
  avatar: string; 
}) => {
  return (
    <div className="flex items-center space-x-3">
      <img 
        src={avatar} 
        alt={name} 
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{type}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Users className="h-3 w-3 mr-1" />
          <span>{followers} followers</span>
        </div>
      </div>
      <button className="text-xs text-linkedin-blue hover:text-linkedin-blue/80 font-medium">
        + Follow
      </button>
    </div>
  );
};

const ProfileView = ({ 
  name, 
  title, 
  company, 
  badge 
}: { 
  name: string; 
  title: string; 
  company: string; 
  badge: string; 
}) => {
  return (
    <div className="flex items-start space-x-3 cursor-pointer hover:bg-muted/50 p-2 rounded">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{name}</p>
          <Badge variant="outline" className="text-xs h-4 px-1">
            {badge}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{title}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <Briefcase className="h-3 w-3 mr-1" />
          <span>{company}</span>
        </div>
      </div>
    </div>
  );
};

export default NewsSidebar;