import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, ChefHat } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const QUICK_SUGGESTIONS = [
  "What can I cook with chicken?",
  "30-min dinner ideas",
  "How to make pasta?",
  "Egg substitutes for baking",
  "Make me a meal plan",
  "How to sear steak perfectly?",
];

const MOCK_RESPONSES: Record<string, string> = {
  "chicken": "With chicken you can make:\n\n🍗 Butter Chicken\n🌮 Chicken Tacos\n🥗 Caesar Salad\n🍜 Chicken Noodle Soup\n🍕 Chicken Alfredo\n\nWould you like a detailed recipe for any of these?",
  "pasta": "Here's a classic pasta recipe:\n\n1. Boil salted water\n2. Cook pasta al dente (8-10 min)\n3. Sauté garlic in olive oil\n4. Toss pasta with sauce\n5. Finish with parmesan\n\nTip: Reserve pasta water to emulsify your sauce!",
  "steak": "Perfect steak searing:\n\n1. Pat dry & season generously\n2. Heat cast iron until smoking\n3. Sear 3-4 min per side\n4. Butter baste with thyme & garlic\n5. Rest 5 min before cutting\n\nInternal temps: Rare 120°F, Medium 140°F, Well 160°F",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(MOCK_RESPONSES)) {
    if (lower.includes(key)) return val;
  }
  return "Great question! I'd love to help with that. Try asking about specific ingredients, cooking techniques, or meal ideas. For example:\n\n• \"What can I make with eggs and cheese?\"\n• \"How do I caramelize onions?\"\n• \"Quick weeknight dinner ideas\"\n\n(AI responses will be available when the backend is connected)";
}

export default function AiChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! I'm your AI Chef assistant 👨‍🍳. Ask me anything about cooking — recipes, substitutions, techniques, meal planning, and more!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || loading) return;
    const userMsg: Msg = { role: "user", content: msg };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getMockResponse(msg);
      setMessages([...updatedMessages, { role: "assistant", content: response }]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-up h-[calc(100vh-8rem)] flex flex-col">
      <h1 className="text-2xl font-display font-bold">AI Chef Assistant</h1>
      <Card className="glass-card flex-1 flex flex-col overflow-hidden">
        <CardContent ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
                  <ChefHat className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div className={`max-w-[80%] px-4 py-3 rounded-xl text-sm whitespace-pre-line ${msg.role === "user" ? "gradient-primary text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"}`}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 text-xs">👤</div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0"><ChefHat className="h-4 w-4 text-primary-foreground" /></div>
              <div className="bg-secondary rounded-xl px-4 py-3 rounded-bl-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t border-border">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {QUICK_SUGGESTIONS.map(s => (
                <button key={s} onClick={() => sendMessage(s)} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs hover:bg-primary/10 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about any recipe, technique, or ingredient..." disabled={loading} className="flex-1" />
            <Button type="submit" disabled={!input.trim() || loading} className="gradient-primary text-primary-foreground">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
