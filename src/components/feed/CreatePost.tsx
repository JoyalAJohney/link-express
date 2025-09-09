import { Image, Video, Calendar, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CreatePostProps {
  onPost: (content: string) => void;
}

const CreatePost = ({ onPost }: CreatePostProps) => {
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handlePost = () => {
    if (content.trim()) {
      onPost(content.trim());
      setContent("");
      setShowForm(false);
    }
  };

  return (
    <Card className="linkedin-card">
      <CardContent className="p-4">
        {!showForm ? (
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              className="flex-1 justify-start text-muted-foreground h-12 rounded-full"
              onClick={() => setShowForm(true)}
            >
              Start a post...
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="What do you want to talk about?"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[120px] border-none p-0 resize-none text-base placeholder:text-muted-foreground focus-visible:ring-0"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4 overflow-x-auto">
                <PostOption icon={<Image className="h-5 w-5" />} label="Photo" color="text-linkedin-blue" />
                <PostOption icon={<Video className="h-5 w-5" />} label="Video" color="text-linkedin-green" />
                <PostOption icon={<Calendar className="h-5 w-5" />} label="Event" color="text-orange-500" />
                <PostOption icon={<FileText className="h-5 w-5" />} label="Article" color="text-linkedin-red" />
              </div>
              
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  disabled={!content.trim()}
                  onClick={handlePost}
                  className="bg-linkedin-blue hover:bg-linkedin-blue/90"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {!showForm && (
          <div className="flex items-center justify-around mt-4 pt-4 border-t border-border">
            <PostOption icon={<Image className="h-5 w-5" />} label="Photo" color="text-linkedin-blue" />
            <PostOption icon={<Video className="h-5 w-5" />} label="Video" color="text-linkedin-green" />
            <PostOption icon={<Calendar className="h-5 w-5" />} label="Event" color="text-orange-500" />
            <PostOption icon={<FileText className="h-5 w-5" />} label="Article" color="text-linkedin-red" />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const PostOption = ({ icon, label, color }: { 
  icon: React.ReactNode; 
  label: string; 
  color: string; 
}) => {
  return (
    <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
      <span className={color}>{icon}</span>
      <span className="text-sm font-medium hidden sm:block">{label}</span>
    </Button>
  );
};

export default CreatePost;