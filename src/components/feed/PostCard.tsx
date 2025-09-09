import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      title: string;
      avatar: string;
      verified?: boolean;
    };
    content: string;
    image?: string;
    likes: number;
    comments: number;
    shares: number;
    timeAgo: string;
    liked?: boolean;
  };
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="linkedin-card">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-sm">{post.author.name}</h3>
                {post.author.verified && (
                  <Badge variant="secondary" className="h-4 px-1 text-xs">✓</Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{post.author.title}</p>
              <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{post.content}</p>
          
          {post.image && (
            <div className="rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          {/* Engagement Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-b border-border pb-3">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-linkedin-blue rounded-full flex items-center justify-center">
                  <ThumbsUp className="h-2.5 w-2.5 text-white" />
                </div>
                <span>{post.likes}</span>
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{post.comments} comments</span>
              <span>{post.shares} shares</span>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-around">
            <ActionButton 
              icon={<ThumbsUp className="h-4 w-4" />} 
              label="Like" 
              active={post.liked}
            />
            <ActionButton 
              icon={<MessageCircle className="h-4 w-4" />} 
              label="Comment" 
            />
            <ActionButton 
              icon={<Share className="h-4 w-4" />} 
              label="Share" 
            />
            <ActionButton 
              icon={<Send className="h-4 w-4" />} 
              label="Send" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ActionButton = ({ icon, label, active = false }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
}) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className={`flex-1 flex items-center space-x-2 rounded-none ${
        active ? 'text-linkedin-blue hover:text-linkedin-blue' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};

export default PostCard;