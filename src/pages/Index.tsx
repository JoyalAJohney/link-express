import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/feed");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        navigate("/feed");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <CardTitle className="text-3xl">Welcome to Social Feed</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Join our community and share your thoughts with others.
          </p>
          <div className="space-y-2">
            <Button 
              onClick={() => navigate("/auth")} 
              className="w-full"
              size="lg"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate("/feed")} 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              View Feed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
