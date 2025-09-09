-- Update the handle_new_user function to extract display name from email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(
      NEW.raw_user_meta_data->>'display_name', 
      split_part(NEW.email, '@', 1)  -- Extract username from email
    )
  );
  RETURN NEW;
END;
$$;

-- Update existing profile to have display names from email
UPDATE public.profiles 
SET display_name = split_part(email, '@', 1) 
WHERE display_name IS NULL OR display_name = '';

-- Add delete policies for posts (users can delete their own posts)
CREATE POLICY "Users can delete their own posts" 
ON public.posts 
FOR DELETE 
USING (auth.uid() = user_id);

-- Add delete policies for comments (users can delete their own comments)
CREATE POLICY "Users can delete their own comments" 
ON public.post_comments 
FOR DELETE 
USING (auth.uid() = user_id);