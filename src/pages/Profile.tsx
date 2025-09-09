import { Camera, MapPin, Calendar, ExternalLink, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import PostCard from "@/components/feed/PostCard";
import { mockUser, mockPosts } from "@/data/mockData";

const Profile = () => {
  // Filter posts by current user (for demo, showing first 3 posts)
  const userPosts = mockPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="linkedin-card mb-6">
          <div className="relative">
            {/* Cover Photo */}
            <div className="h-48 bg-gradient-to-r from-linkedin-blue to-linkedin-blue/80 rounded-t-lg relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Profile Picture */}
            <div className="absolute -bottom-16 left-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-background">
                  <AvatarImage src={mockUser.avatar} />
                  <AvatarFallback className="text-2xl">{mockUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute bottom-2 right-2 h-8 w-8 bg-background border border-border hover:bg-muted"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <CardContent className="pt-20 pb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold">{mockUser.name}</h1>
                  <Badge variant="secondary" className="h-5 px-2 text-xs">✓</Badge>
                </div>
                <p className="text-lg text-muted-foreground mt-1">{mockUser.title}</p>
                
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>San Francisco Bay Area</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Joined March 2019</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 mt-4">
                  <div>
                    <span className="font-semibold text-linkedin-blue">{mockUser.followers.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">followers</span>
                  </div>
                  <div>
                    <span className="font-semibold text-linkedin-blue">{mockUser.following.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground ml-1">following</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Connect
                </Button>
                <Button size="sm" className="bg-linkedin-blue hover:bg-linkedin-blue/90">
                  Message
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm leading-relaxed">{mockUser.bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <Card className="linkedin-card mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">About</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Passionate full-stack developer with 5+ years of experience building scalable web applications. 
              I specialize in React, Node.js, and cloud technologies. Always eager to learn new technologies 
              and collaborate on innovative projects that make a real impact.
            </p>
            
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2 text-sm">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <a href="#" className="text-linkedin-blue hover:underline">github.com/johndoe</a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <a href="#" className="text-linkedin-blue hover:underline">johndoe.dev</a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="linkedin-card mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold">Experience</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ExperienceItem 
                title="Senior Full Stack Developer"
                company="TechCorp Inc."
                duration="2022 - Present"
                location="San Francisco, CA"
                description="Leading development of scalable web applications using React, Node.js, and AWS. Mentoring junior developers and architecting cloud solutions."
              />
              <ExperienceItem 
                title="Full Stack Developer"
                company="StartupXYZ"
                duration="2020 - 2022"
                location="Remote"
                description="Built and maintained multiple web applications from scratch. Worked closely with design and product teams to deliver high-quality user experiences."
              />
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <Card className="linkedin-card">
          <CardHeader>
            <h2 className="text-lg font-semibold">Recent Activity</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ExperienceItem = ({ 
  title, 
  company, 
  duration, 
  location, 
  description 
}: {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string;
}) => {
  return (
    <div className="flex space-x-3">
      <div className="w-12 h-12 bg-linkedin-light-gray rounded flex items-center justify-center">
        <span className="text-sm font-semibold text-linkedin-dark-gray">
          {company.charAt(0)}
        </span>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{company}</p>
        <p className="text-xs text-muted-foreground">{duration} • {location}</p>
        <p className="text-sm mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Profile;