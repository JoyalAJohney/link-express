import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import NewsSidebar from "@/components/sidebar/NewsSidebar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Post {
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
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      const { data: postsData, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedPosts: Post[] = (postsData || []).map(post => ({
        id: post.id,
        author: {
          name: 'Anonymous User', // Will be updated when we have proper user profiles
          title: 'User',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
          verified: false,
        },
        content: post.content,
        image: post.image_url,
        likes: post.likes_count,
        comments: post.comments_count,
        shares: post.shares_count,
        timeAgo: formatTimeAgo(new Date(post.created_at)),
        liked: false,
      }));

      setPosts(formattedPosts);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch posts. You may need to sign in first.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
  };

  const handleNewPost = async (content: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to create a post.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('posts')
        .insert([
          {
            user_id: user.id,
            content: content,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      // Refresh posts to show the new post
      fetchPosts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24">
              <ProfileSidebar />
            </div>
          </div>
          
          {/* Main Feed */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="space-y-6">
              <CreatePost onPost={handleNewPost} />
              
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="lg:col-span-3 order-3">
            <div className="sticky top-24">
              <NewsSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;