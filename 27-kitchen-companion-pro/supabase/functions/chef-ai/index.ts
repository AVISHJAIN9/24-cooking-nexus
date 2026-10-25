import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompts: Record<string, string> = {
  chat: `You are CookGrid's AI Chef assistant — a knowledgeable, friendly cooking expert. You help users with:
- Detailed recipes with ingredients, steps, and tips
- Cooking techniques and substitutions
- Meal planning and nutrition advice
- Kitchen tips and food science
Always format recipes with clear sections: Ingredients, Steps, Tips. Use markdown formatting. Be enthusiastic about cooking!`,
  ghostchef: `You are Ghost Chef — a mysterious culinary genius who compares different approaches to cooking the same dish. You provide side-by-side comparisons of different cuisines, techniques, and flavor profiles. Be dramatic and theatrical in your descriptions.`,
  import: `You are a recipe extraction expert. Given recipe text or a URL description, extract and return a JSON object with these fields:
{
  "title": "string",
  "description": "string",
  "ingredients": ["string array"],
  "steps": ["string array"],
  "prep_time": number or null,
  "cook_time": number or null,
  "servings": number,
  "calories": number or null,
  "category": "string",
  "difficulty": "Easy" | "Medium" | "Hard",
  "tags": ["string array"]
}
Return ONLY the JSON, no markdown code blocks.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, mode = "chat" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = systemPrompts[mode] || systemPrompts.chat;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required" }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chef-ai error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
