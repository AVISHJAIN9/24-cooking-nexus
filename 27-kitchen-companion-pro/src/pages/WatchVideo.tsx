import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, MessageCircle, Share2, Bookmark, Play, Pause, Send, ThumbsUp, Volume2, VolumeX, SkipForward, SkipBack, Download, Clock, Users, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockVideos, recipes } from "@/data/recipes";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useRef } from "react";

const WatchVideo = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);

  const video = mockVideos.find(v => v.id === id);
  const recipe = recipes.find(r => r.id === id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(video?.like_count || 0);
  const [saved, setSaved] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<{ user: string; text: string; time: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  if (!video || !recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Video not found</p>
      </div>
    );
  }

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleLike = () => {
    if (!user) { toast.error("Please sign in to like"); return; }
    setLiked(!liked);
    setLikeCount(c => liked ? c - 1 : c + 1);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    setComments(prev => [{ user: user?.email?.split("@")[0] || "You", text: commentText, time: "now" }, ...prev]);
    setCommentText("");
    toast.success("Comment added!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied!");
  };

  const handleDownload = () => {
    const text = `${recipe.title}\n\nIngredients:\n${recipe.ingredients.join("\n")}\n\nSteps:\n${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}`;
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${recipe.title.replace(/\s+/g, "-")}-recipe.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
        <div className="container flex items-center justify-between h-14 px-4">
          <Link to="/reels" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" /><span className="text-sm font-medium">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setSaved(!saved)}>
              <Bookmark className={`w-5 h-5 ${saved ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}><Share2 className="w-5 h-5 text-muted-foreground" /></Button>
          </div>
        </div>
      </div>

      <div className="pt-14">
        <div className="container px-4 md:px-8 py-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main video area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video player with poster fallback */}
              <div className="relative rounded-2xl overflow-hidden bg-espresso aspect-video group cursor-pointer" onClick={togglePlay}>
                <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-espresso/40 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-full h-1 bg-cream/20 rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: "0%" }} />
                  </div>
                </div>
              </div>

              {/* Video info */}
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold">{video.title}</h1>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span>👁 {video.view_count.toLocaleString()} views</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{video.duration}</span>
                  <span className="flex items-center gap-1"><Flame className="w-4 h-4" />{video.calories} cal</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" />{recipe.servings} servings</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 flex-wrap">
                <Button variant={liked ? "default" : "outline"} className="rounded-full gap-2" onClick={toggleLike}>
                  <Heart className={`w-4 h-4 ${liked ? "fill-primary-foreground" : ""}`} />
                  {likeCount > 1000 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount}
                </Button>
                <Button variant="outline" className="rounded-full gap-2" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />Share
                </Button>
                <Button variant="outline" className="rounded-full gap-2" onClick={handleDownload}>
                  <Download className="w-4 h-4" />Recipe
                </Button>
                <Button variant="outline" className="rounded-full gap-2" onClick={() => setSaved(!saved)}>
                  <Bookmark className={`w-4 h-4 ${saved ? "fill-foreground" : ""}`} />{saved ? "Saved" : "Save"}
                </Button>
              </div>

              {/* Chef info */}
              <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">{video.chef_avatar}</div>
                <div className="flex-1">
                  <p className="font-semibold">{video.chef_name}</p>
                  <p className="text-sm text-muted-foreground">{video.category} • {video.difficulty}</p>
                </div>
                <Button className="rounded-full bg-primary text-primary-foreground">Follow</Button>
              </div>

              {/* Description */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-3">About this recipe</h3>
                <p className="text-muted-foreground">{video.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {video.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">#{tag}</span>
                  ))}
                </div>
              </div>

              {/* Ingredients & Steps */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-lg mb-4">🥘 Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display font-bold text-lg mb-4">📝 Steps</h3>
                  <ol className="space-y-3">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">{i + 1}</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* Sidebar: Comments + Related */}
            <div className="space-y-6">
              {/* Comments */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4">💬 Comments ({comments.length})</h3>
                <div className="flex gap-2 mb-4">
                  <input
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleComment()}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-input text-sm"
                  />
                  <Button size="icon" className="rounded-xl bg-primary text-primary-foreground" onClick={handleComment}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-hide">
                  {comments.map((c, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">{c.user[0]}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{c.user}</span>
                          <span className="text-xs text-muted-foreground">{c.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-0.5">{c.text}</p>
                        <button className="flex items-center gap-1 text-xs text-muted-foreground mt-1 hover:text-foreground">
                          <ThumbsUp className="w-3 h-3" /> Like
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related videos */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4">More Recipes</h3>
                <div className="space-y-3">
                  {mockVideos.filter(v => v.id !== id).slice(0, 5).map(v => (
                    <Link key={v.id} to={`/watch/${v.id}`} className="flex gap-3 group hover:bg-secondary/50 rounded-xl p-2 transition-colors">
                      <img src={v.thumbnail_url} alt={v.title} className="w-20 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{v.title}</p>
                        <p className="text-xs text-muted-foreground">{v.chef_name} • {v.view_count.toLocaleString()} views</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
