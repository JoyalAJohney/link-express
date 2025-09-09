import { useState } from "react";
import Header from "@/components/layout/Header";
import CreatePost from "@/components/feed/CreatePost";
import PostCard from "@/components/feed/PostCard";
import ProfileSidebar from "@/components/sidebar/ProfileSidebar";
import NewsSidebar from "@/components/sidebar/NewsSidebar";
import { mockPosts, mockUser } from "@/data/mockData";

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
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleNewPost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        name: mockUser.name,
        title: mockUser.title,
        avatar: mockUser.avatar,
        verified: false,
      },
      content,
      likes: 0,
      comments: 0,
      shares: 0,
      timeAgo: "now",
      liked: false,
    };
    setPosts([newPost, ...posts]);
  };

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