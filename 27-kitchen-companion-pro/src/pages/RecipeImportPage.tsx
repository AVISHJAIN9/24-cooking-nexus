import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Import, Link as LinkIcon, FileText } from "lucide-react";

const RECIPES_KEY = "cookgrid_my_recipes";

export default function RecipeImportPage() {
  const [manualText, setManualText] = useState("");
  const [mode, setMode] = useState<"url" | "text">("text");
  const [url, setUrl] = useState("");

  const saveRecipe = () => {
    if (!manualText.trim() && !url.trim()) return;
    const title = manualText.split("\n")[0] || url || "Imported Recipe";
    const existing = JSON.parse(localStorage.getItem(RECIPES_KEY) || "[]");
    existing.unshift({
      id: crypto.randomUUID(),
      title: title.substring(0, 100),
      description: manualText || `Imported from: ${url}`,
      prep_time: null, cook_time: null, image_url: "",
      created_at: new Date().toISOString(),
    });
    localStorage.setItem(RECIPES_KEY, JSON.stringify(existing));
    toast.success("Recipe saved to My Recipes!");
    setManualText(""); setUrl("");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Import Recipe</h1>
      <div className="flex gap-1 bg-secondary rounded-xl p-1 w-fit">
        <button onClick={() => setMode("url")} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
          <LinkIcon className="w-4 h-4" /> From URL
        </button>
        <button onClick={() => setMode("text")} className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === "text" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
          <FileText className="w-4 h-4" /> From Text
        </button>
      </div>
      <Card className="glass-card">
        <CardContent className="p-4 space-y-3">
          {mode === "url" ? (
            <Input placeholder="Paste recipe URL (e.g. allrecipes.com/recipe/...)" value={url} onChange={e => setUrl(e.target.value)} />
          ) : (
            <Textarea placeholder="Paste recipe text, ingredients list, or describe the recipe..." value={manualText} onChange={e => setManualText(e.target.value)} className="min-h-[120px]" />
          )}
          <Button onClick={saveRecipe} disabled={mode === "url" ? !url : !manualText} className="gradient-primary text-primary-foreground">
            <Import className="h-4 w-4 mr-2" /> Import & Save Recipe
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
