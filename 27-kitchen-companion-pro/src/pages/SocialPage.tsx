import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Heart, MessageCircle, Trash2, Users, Send } from "lucide-react";

interface Post {
  id: string;
  user_id: string;
  display_name: string;
  content: string;
  likes_count: number;
  liked_by_me: boolean;
  created_at: string;
}

const POSTS_KEY = "cookgrid_social_posts";

function getStoredPosts(): Post[] {
  try { return JSON.parse(localStorage.getItem(POSTS_KEY) || "[]"); } catch { return []; }
}

export default function SocialPage() {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>(getStoredPosts);
  const [content, setContent] = useState("");

  const save = (p: Post[]) => { setPosts(p); localStorage.setItem(POSTS_KEY, JSON.stringify(p)); };

  const createPost = () => {
    if (!content.trim() || !user) return;
    save([{
      id: crypto.randomUUID(), user_id: user.id, display_name: profile?.display_name || user.email,
      content, likes_count: 0, liked_by_me: false, created_at: new Date().toISOString(),
    }, ...posts]);
    setContent(""); toast.success("Posted!");
  };

  const toggleLike = (postId: string) => {
    save(posts.map(p => p.id === postId ? { ...p, liked_by_me: !p.liked_by_me, likes_count: p.liked_by_me ? Math.max(0, p.likes_count - 1) : p.likes_count + 1 } : p));
  };

  const deletePost = (id: string) => { save(posts.filter(p => p.id !== id)); toast.success("Deleted"); };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Social Feed</h1>
      <Card className="glass-card">
        <CardContent className="p-4">
          <Textarea placeholder="Share what you're cooking..." value={content} onChange={e => setContent(e.target.value)} className="min-h-[80px] resize-none" />
          <div className="flex justify-end mt-3">
            <Button onClick={createPost} disabled={!content.trim()} className="gradient-primary text-primary-foreground"><Send className="h-4 w-4 mr-2" /> Post</Button>
          </div>
        </CardContent>
      </Card>
      {posts.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No posts yet. Be the first!</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {posts.map(post => (
            <Card key={post.id} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full gradient-accent flex items-center justify-center text-xs font-bold text-accent-foreground">
                      {(post.display_name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.display_name}</p>
                      <p className="text-xs text-muted-foreground">{timeAgo(post.created_at)}</p>
                    </div>
                  </div>
                  {post.user_id === user?.id && (
                    <button onClick={() => deletePost(post.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  )}
                </div>
                <p className="whitespace-pre-wrap">{post.content}</p>
                <div className="flex gap-4 mt-3 text-muted-foreground">
                  <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1 text-xs transition-colors ${post.liked_by_me ? "text-red-500" : "hover:text-primary"}`}>
                    <Heart className={`h-4 w-4 ${post.liked_by_me ? "fill-current" : ""}`} /> {post.likes_count || 0}
                  </button>
                  <span className="flex items-center gap-1 text-xs"><MessageCircle className="h-4 w-4" /> 0</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
