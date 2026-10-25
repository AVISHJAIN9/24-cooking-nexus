import { Link } from "react-router-dom";
import { Heart, Play, MessageCircle } from "lucide-react";
import { recipes } from "@/data/recipes";

const reelData = recipes.slice(0, 4);

const ReelsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container px-4 md:px-8">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Trending Now</span>
        <h2 className="text-3xl md:text-5xl font-bold font-display mt-3">Cooking <span className="text-gradient-warm italic">Reels</span></h2>
        <p className="text-muted-foreground mt-4 max-w-md mx-auto">Bite-sized cooking inspiration.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {reelData.map((r, i) => (
          <Link to={`/watch/${r.id}`} key={i} className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer hover-lift">
            <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center"><Play className="w-6 h-6 text-primary-foreground ml-1" /></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-xs text-cream/70 mb-1">{r.chef}</p>
              <h3 className="text-sm font-bold text-cream">{r.title}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[11px] text-cream/60 flex items-center gap-1"><Heart className="w-3 h-3" />{r.likes}</span>
                <span className="text-[11px] text-cream/60 flex items-center gap-1"><MessageCircle className="w-3 h-3" />{r.comments}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link to="/reels" className="text-primary font-semibold hover:underline">View All Reels →</Link>
      </div>
    </div>
  </section>
);

export default ReelsSection;
