import { Sparkles } from "lucide-react";
import chefHands from "@/assets/chef-hands.jpg";

const AISection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container px-4 md:px-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display">Your Personal <span className="text-gradient-warm italic">AI Chef</span></h2>
          <p className="text-muted-foreground text-lg leading-relaxed">Ask for recipe suggestions, ingredient substitutions, cooking tips, and meal planning — all powered by AI.</p>
          <div className="glass-card rounded-2xl p-6 space-y-3">
            <p className="text-sm text-muted-foreground">Try asking:</p>
            {["What can I make with chicken and rice?", "Suggest a 30-minute dinner", "How do I substitute eggs in baking?"].map((q, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-primary">→</span>
                <span className="text-foreground">{q}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img src={chefHands} alt="Chef preparing food" className="rounded-2xl shadow-2xl w-full aspect-square object-cover" />
          <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl p-4 shadow-lg">
            <p className="text-sm font-semibold">🤖 AI Chef</p>
            <p className="text-xs text-muted-foreground mt-1">Ready to help you cook!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AISection;
