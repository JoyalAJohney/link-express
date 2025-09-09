import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  onPostUpdate?: () => void;
}

const PostCard = ({ post, onPostUpdate }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLike = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to like posts.",
          variant: "destructive",
        });
        return;
      }

      if (isLiked) {
        // Unlike the post
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);

        if (error) throw error;

        setIsLiked(false);
        setLikeCount(prev => prev - 1);
      } else {
        // Like the post
        const { error } = await supabase
          .from('post_likes')
          .insert([{ post_id: post.id, user_id: user.id }]);

        if (error) throw error;

        setIsLiked(true);
        setLikeCount(prev => prev + 1);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive",
      });
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('post_comments')
        .select(`
          id,
          content,
          created_at,
          user_id
        `)
        .eq('post_id', post.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error: any) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to comment on posts.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('post_comments')
        .insert([{
          post_id: post.id,
          user_id: user.id,
          content: newComment.trim()
        }]);

      if (error) throw error;

      setNewComment("");
      fetchComments();
      onPostUpdate?.();

      toast({
        title: "Comment added",
        description: "Your comment has been posted successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      fetchComments();
    }
  };

  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - commentDate.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

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
              {likeCount > 0 && (
                <span className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-linkedin-blue rounded-full flex items-center justify-center">
                    <ThumbsUp className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span>{likeCount}</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {post.comments > 0 && <span>{post.comments} comments</span>}
              {post.shares > 0 && <span>{post.shares} shares</span>}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-around">
            <ActionButton 
              icon={<ThumbsUp className="h-4 w-4" />} 
              label="Like" 
              active={isLiked}
              onClick={handleLike}
            />
            <ActionButton 
              icon={<MessageCircle className="h-4 w-4" />} 
              label="Comment" 
              onClick={toggleComments}
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

          {/* Comments Section */}
          {showComments && (
            <div className="space-y-4 pt-4 border-t border-border">
              {/* Add Comment */}
              <div className="flex space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                    className="text-sm"
                  />
                  {newComment.trim() && (
                    <Button 
                      size="sm" 
                      onClick={handleComment} 
                      disabled={loading}
                      className="bg-linkedin-blue hover:bg-linkedin-blue/90"
                    >
                      {loading ? "Posting..." : "Post"}
                    </Button>
                  )}
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-3">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">
                            Anonymous User
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTimeAgo(comment.created_at)}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const ActionButton = ({ icon, label, active = false, onClick }: { 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  onClick?: () => void;
}) => {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onClick}
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