import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import { Video, Upload, Eye, Heart, MessageCircle, Trash2, Plus, DollarSign, TrendingUp, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UploadedVideo {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url: string;
  category: string;
  difficulty: string;
  duration: string;
  views: number;
  likes: number;
  comments: number;
  earnings: number;
  created_at: string;
}

const UploaderDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [showUpload, setShowUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "videos" | "earnings">("overview");

  // Mock uploaded videos
  const [videos, setVideos] = useState<UploadedVideo[]>([
    { id: "1", title: "Butter Chicken Masala", description: "Rich and creamy", video_url: "", thumbnail_url: "", category: "Indian", difficulty: "Medium", duration: "12:30", views: 45200, likes: 3200, comments: 180, earnings: 452.00, created_at: "2026-04-01" },
    { id: "2", title: "Quick Pasta Aglio e Olio", description: "5 ingredient pasta", video_url: "", thumbnail_url: "", category: "Italian", difficulty: "Easy", duration: "8:45", views: 32100, likes: 2100, comments: 95, earnings: 321.00, created_at: "2026-04-05" },
    { id: "3", title: "Sushi Rolling Tutorial", description: "Perfect rolls every time", video_url: "", thumbnail_url: "", category: "Japanese", difficulty: "Hard", duration: "18:20", views: 67800, likes: 5400, comments: 320, earnings: 678.00, created_at: "2026-04-08" },
  ]);

  // Upload form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [category, setCategory] = useState("General");
  const [difficulty, setDifficulty] = useState("Easy");

  const totalViews = videos.reduce((s, v) => s + v.views, 0);
  const totalLikes = videos.reduce((s, v) => s + v.likes, 0);
  const totalEarnings = videos.reduce((s, v) => s + v.earnings, 0);
  const totalComments = videos.reduce((s, v) => s + v.comments, 0);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !videoUrl) { toast.error("Title and video URL required"); return; }
    const newVideo: UploadedVideo = {
      id: crypto.randomUUID(),
      title, description, video_url: videoUrl, thumbnail_url: thumbnailUrl,
      category, difficulty, duration: "0:00", views: 0, likes: 0, comments: 0, earnings: 0,
      created_at: new Date().toISOString().split("T")[0],
    };
    setVideos(prev => [newVideo, ...prev]);
    toast.success("Video uploaded successfully!");
    setShowUpload(false);
    setTitle(""); setDescription(""); setVideoUrl(""); setThumbnailUrl("");
  };

  const deleteVideo = (id: string) => {
    if (!confirm("Delete this video?")) return;
    setVideos(prev => prev.filter(v => v.id !== id));
    toast.success("Video deleted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container px-4 md:px-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold">Chef Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Welcome back, {profile?.display_name || "Chef"} 👨‍🍳</p>
          </div>
          <Button onClick={() => setShowUpload(!showUpload)} className="bg-primary text-primary-foreground rounded-full px-6">
            <Plus className="w-4 h-4 mr-2" /> Upload Video
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-secondary rounded-xl p-1 w-fit">
          {(["overview", "videos", "earnings"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Stats cards */}
        {(activeTab === "overview" || activeTab === "earnings") && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Eye, label: "Total Views", value: totalViews.toLocaleString(), color: "text-primary", bg: "bg-primary/10" },
              { icon: Heart, label: "Total Likes", value: totalLikes.toLocaleString(), color: "text-destructive", bg: "bg-destructive/10" },
              { icon: DollarSign, label: "Total Earnings", value: `$${totalEarnings.toFixed(2)}`, color: "text-herb", bg: "bg-herb/10" },
              { icon: TrendingUp, label: "Avg. Engagement", value: `${((totalLikes / Math.max(totalViews, 1)) * 100).toFixed(1)}%`, color: "text-warm", bg: "bg-warm/10" },
            ].map((stat, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold font-display">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Earnings breakdown */}
        {activeTab === "earnings" && (
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Earnings Breakdown
            </h3>
            <div className="space-y-4">
              {videos.map(v => (
                <div key={v.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Video className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{v.title}</p>
                    <p className="text-xs text-muted-foreground">{v.views.toLocaleString()} views</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-herb">${v.earnings.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">${(v.earnings / Math.max(v.views, 1) * 1000).toFixed(2)}/1K views</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly earnings rate</p>
                <p className="text-xs text-muted-foreground mt-1">Based on $10.00 RPM (revenue per 1000 views)</p>
              </div>
              <p className="text-2xl font-bold font-display text-herb">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        )}

        {/* Upload form */}
        {showUpload && (
          <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-up">
            <h3 className="font-display font-bold text-lg mb-4">Upload New Recipe Video</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Title *</label>
                  <input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" placeholder="Recipe title" required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Video URL (Cloudinary) *</label>
                  <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" placeholder="https://res.cloudinary.com/..." required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Thumbnail URL</label>
                  <input value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" placeholder="https://..." />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm">
                    {["General", "Indian", "Italian", "Thai", "Japanese", "American", "Dessert", "Healthy"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Difficulty</label>
                  <select value={difficulty} onChange={e => setDifficulty(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" rows={3} />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="bg-primary text-primary-foreground rounded-full px-8">Publish Recipe</Button>
                <Button type="button" variant="outline" onClick={() => setShowUpload(false)} className="rounded-full">Cancel</Button>
              </div>
            </form>
          </div>
        )}

        {/* Video list */}
        {(activeTab === "overview" || activeTab === "videos") && (
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg">{activeTab === "overview" ? "Recent Videos" : "All Videos"}</h3>
            {videos.length === 0 ? (
              <div className="glass-card rounded-2xl p-12 text-center">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No videos yet. Upload your first recipe!</p>
              </div>
            ) : (
              videos.map(v => (
                <div key={v.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                    <Video className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{v.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{v.views.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{v.likes.toLocaleString()}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{v.comments}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{v.duration}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-herb">${v.earnings.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{v.category}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="text-destructive/50 hover:text-destructive" onClick={() => deleteVideo(v.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploaderDashboard;
