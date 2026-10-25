import { useState } from "react";
import Header from "@/components/Header";
import { Send, Sparkles, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message { role: "user" | "assistant"; content: string; }

const AIKitchen = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm your AI Chef assistant 👨‍🍳. Ask me anything about cooking — recipes, substitutions, techniques, meal planning, and more!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const responses = [
        "Great question! Start by preheating your oven to 375°F. While it heats, prepare your marinade with olive oil, garlic, lemon juice, and herbs.",
        "For that recipe, you can substitute eggs with flax eggs (1 tbsp ground flax + 3 tbsp water = 1 egg). Let it sit for 5 minutes to gel.",
        "A quick 30-minute dinner idea: Garlic shrimp pasta! Sauté garlic in olive oil, add shrimp, cook 3 min per side. Toss with spaghetti and lemon juice. 🍝",
        "To get that perfect sear: 1) Pat it very dry 2) Season generously 3) Use screaming hot cast iron 4) Don't move it for 3-4 minutes 🥩",
      ];
      setMessages(prev => [...prev, { role: "assistant", content: responses[Math.floor(Math.random() * responses.length)] }]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="pt-20 flex-1 flex flex-col container px-4 md:px-8 pb-4 max-w-3xl">
        <div className="text-center py-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Kitchen</span>
          </div>
          <h1 className="font-display text-xl font-bold">Your AI Chef Assistant</h1>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide py-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "user" ? "bg-primary/10" : "bg-primary"}`}>
                {msg.role === "user" ? "👤" : <ChefHat className="w-4 h-4 text-primary-foreground" />}
              </div>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "glass-card rounded-tl-sm"}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"><ChefHat className="w-4 h-4 text-primary-foreground" /></div>
              <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide">
          {["What can I cook with chicken?", "30-min dinner ideas", "How to make pasta?", "Egg substitutes"].map(q => (
            <button key={q} onClick={() => setInput(q)} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs whitespace-nowrap hover:bg-secondary/80 transition-colors">{q}</button>
          ))}
        </div>
        <div className="flex gap-2 py-3">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} placeholder="Ask your AI Chef..." className="flex-1 px-4 py-3 rounded-xl bg-card border border-input text-sm" />
          <Button onClick={sendMessage} disabled={loading} className="rounded-xl bg-primary text-primary-foreground px-4"><Send className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  );
};

export default AIKitchen;
