import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Share2, Play, Bookmark } from "lucide-react";
import { mockVideos } from "@/data/recipes";
import Header from "@/components/Header";

const categories = ["All", "Indian", "Italian", "Thai", "Japanese", "American", "Dessert", "Healthy", "Fine Dining", "Hawaiian"];

const ReelsFeed = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const filtered = activeCategory === "All" ? mockVideos : mockVideos.filter(v => v.category === activeCategory);

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setLikedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSavedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-8">
        <div className="container px-4 md:px-8 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filtered.map(video => (
              <Link to={`/watch/${video.id}`} key={video.id} className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer hover-lift bg-card">
                <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                {video.duration && (
                  <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-espresso/60 backdrop-blur-sm">
                    <span className="text-xs font-medium text-cream">{video.duration}</span>
                  </div>
                )}
                {video.difficulty && (
                  <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/80 backdrop-blur-sm">
                    <span className="text-xs font-medium text-primary-foreground">{video.difficulty}</span>
                  </div>
                )}
                <div className="absolute right-3 bottom-24 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex flex-col items-center" onClick={(e) => toggleLike(e, video.id)}>
                    <div className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${likedIds.has(video.id) ? "bg-destructive/80" : "bg-cream/15 hover:bg-primary/70"}`}>
                      <Heart className={`w-4 h-4 text-cream ${likedIds.has(video.id) ? "fill-cream" : ""}`} />
                    </div>
                  </button>
                  <button className="flex flex-col items-center" onClick={(e) => toggleSave(e, video.id)}>
                    <div className={`w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${savedIds.has(video.id) ? "bg-primary/80" : "bg-cream/15 hover:bg-primary/70"}`}>
                      <Bookmark className={`w-4 h-4 text-cream ${savedIds.has(video.id) ? "fill-cream" : ""}`} />
                    </div>
                  </button>
                  <button className="flex flex-col items-center" onClick={e => { e.preventDefault(); navigator.clipboard.writeText(window.location.origin + `/watch/${video.id}`); }}>
                    <div className="w-9 h-9 rounded-full bg-cream/15 backdrop-blur-sm flex items-center justify-center hover:bg-primary/70 transition-colors">
                      <Share2 className="w-4 h-4 text-cream" />
                    </div>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-lg">{video.chef_avatar}</span>
                    <span className="text-xs text-cream/70">{video.chef_name}</span>
                  </div>
                  <h3 className="text-sm font-bold text-cream leading-tight">{video.title}</h3>
                  {video.calories && <span className="text-[11px] text-cream/60 mt-1 block">🔥 {video.calories} cal</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelsFeed;
