import { Sparkles, Video, ChefHat, Flame } from "lucide-react";

const features = [
  { icon: Video, title: "Short-Form Reels", desc: "TikTok-style cooking videos to learn new recipes in under a minute." },
  { icon: Sparkles, title: "AI Recipe Chat", desc: "Ask our AI chef anything — get instant recipe ideas, substitutions, and tips." },
  { icon: ChefHat, title: "Ghost Chef Compare", desc: "Capture your dish and compare it to the chef's original — see how close you got!" },
  { icon: Flame, title: "Earning Dashboard", desc: "Uploaders track views, likes, and earnings from their content in real-time." },
];

const FeaturesSection = () => (
  <section className="py-20 md:py-28 bg-card">
    <div className="container px-4 md:px-8">
      <div className="text-center mb-12">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Features</span>
        <h2 className="text-3xl md:text-5xl font-bold font-display mt-3">Everything You Need</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 hover-lift">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <f.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
