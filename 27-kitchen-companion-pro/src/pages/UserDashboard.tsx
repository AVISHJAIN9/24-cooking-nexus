import { useState } from "react";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Bookmark, Eye, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockVideos } from "@/data/recipes";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"liked" | "saved" | "history">("liked");

  const likedVideos = mockVideos.slice(0, 4);
  const savedVideos = mockVideos.slice(2, 6);
  const history = mockVideos.slice(0, 6);
  const currentVideos = activeTab === "liked" ? likedVideos : activeTab === "saved" ? savedVideos : history;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container px-4 md:px-8 pb-12">
        <div className="glass-card rounded-2xl p-6 mb-8 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-xl font-bold">{profile?.display_name || "User"}</h1>
            <p className="text-sm text-muted-foreground">Viewer Account</p>
          </div>
          <Button variant="outline" className="rounded-full" onClick={signOut}>Sign Out</Button>
        </div>
        <div className="flex gap-1 mb-6 bg-secondary rounded-xl p-1 w-fit">
          {([
            { key: "liked" as const, icon: Heart, label: "Liked" },
            { key: "saved" as const, icon: Bookmark, label: "Saved" },
            { key: "history" as const, icon: Eye, label: "History" },
          ]).map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${activeTab === tab.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
              <tab.icon className="w-4 h-4" /> {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {currentVideos.map(v => (
            <Link key={v.id} to={`/watch/${v.id}`} className="group relative aspect-[9/16] rounded-2xl overflow-hidden hover-lift">
              <img src={v.thumbnail_url} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-sm font-bold text-cream">{v.title}</p>
                <p className="text-xs text-cream/60">{v.chef_name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
