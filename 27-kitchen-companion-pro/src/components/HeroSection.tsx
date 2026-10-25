import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Play, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Fresh cooking ingredients" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 via-transparent to-espresso/20" />
    </div>
    <div className="relative container px-4 md:px-8 pt-24 pb-16">
      <div className="max-w-2xl space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-warm" />
          <span className="text-sm font-medium text-warm">AI-Powered Cooking Platform</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display leading-[1.1] text-cream">
          Cook. Share.{" "}<span className="text-gradient-warm italic">Inspire.</span>
        </h1>
        <p className="text-lg md:text-xl text-cream/80 font-body leading-relaxed max-w-lg">
          Discover recipes through short-form video, get AI-powered suggestions, and join a community of passionate home chefs.
        </p>
        <div className="flex flex-wrap gap-4 pt-2">
          <Link to="/reels"><Button className="bg-primary text-primary-foreground rounded-full px-8 py-6 text-base font-semibold shadow-lg">Start Cooking</Button></Link>
          <Link to="/reels"><Button variant="outline" className="rounded-full px-8 py-6 text-base font-semibold border-cream/30 text-cream hover:bg-cream/10 backdrop-blur-sm"><Play className="w-5 h-5 mr-2" />Watch Reels</Button></Link>
        </div>
        <div className="flex gap-8 pt-6">
          {[{ value: "50K+", label: "Recipes" }, { value: "2M+", label: "Reels Watched" }, { value: "120K", label: "Home Chefs" }].map(s => (
            <div key={s.label}><p className="text-2xl md:text-3xl font-bold font-display text-cream">{s.value}</p><p className="text-sm text-cream/60">{s.label}</p></div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
