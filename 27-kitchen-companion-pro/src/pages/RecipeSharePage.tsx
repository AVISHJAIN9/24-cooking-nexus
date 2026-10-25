import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Download, Share2, FileText, Link as LinkIcon, Copy, Printer, Mail, QrCode } from "lucide-react";
import { recipes } from "@/data/recipes";

export default function RecipeSharePage() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery
    ? recipes.filter(r => r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.category.toLowerCase().includes(searchQuery.toLowerCase()))
    : recipes;

  const selectedRecipe = recipes.find(r => r.id === selectedRecipeId);

  const exportAsTxt = (recipe: typeof recipes[0]) => {
    const text = `
╔══════════════════════════════════╗
  ${recipe.title}
  by ${recipe.chef}
╚══════════════════════════════════╝

⏱ Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime}
🍽 Servings: ${recipe.servings} | 🔥 ${recipe.calories} cal
⭐ Rating: ${recipe.rating} | Difficulty: ${recipe.difficulty}

━━━ INGREDIENTS ━━━
${recipe.ingredients.map(i => `• ${i}`).join("\n")}

━━━ STEPS ━━━
${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}

━━━ TAGS ━━━
${recipe.tags.map(t => `#${t}`).join(" ")}

Shared from CookGrid 🍳
`.trim();
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${recipe.title.replace(/\s+/g, "-")}-recipe.txt`;
    a.click();
    toast.success("Recipe exported as text!");
  };

  const exportAsJSON = (recipe: typeof recipes[0]) => {
    const data = {
      title: recipe.title, chef: recipe.chef, category: recipe.category,
      difficulty: recipe.difficulty, prepTime: recipe.prepTime, cookTime: recipe.cookTime,
      servings: recipe.servings, calories: recipe.calories, rating: recipe.rating,
      ingredients: recipe.ingredients, steps: recipe.steps, tags: recipe.tags,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${recipe.title.replace(/\s+/g, "-")}-recipe.json`;
    a.click();
    toast.success("Recipe exported as JSON!");
  };

  const exportAsHTML = (recipe: typeof recipes[0]) => {
    const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>${recipe.title}</title>
<style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;padding:0 20px;color:#333}
h1{color:#c2410c;border-bottom:2px solid #c2410c;padding-bottom:8px}
.meta{display:flex;gap:20px;color:#666;font-size:14px;margin:12px 0}
.section{margin:24px 0}h2{color:#9a3412;font-size:18px}
li{margin:6px 0}ol li{margin:8px 0}.tags span{background:#fed7aa;color:#9a3412;padding:2px 10px;border-radius:12px;font-size:12px;margin-right:6px}
footer{border-top:1px solid #ddd;padding-top:12px;color:#999;font-size:12px;margin-top:40px}</style></head>
<body><h1>${recipe.title}</h1><p>by <strong>${recipe.chef}</strong> • ${recipe.category}</p>
<div class="meta"><span>⏱ Prep: ${recipe.prepTime}</span><span>🍳 Cook: ${recipe.cookTime}</span>
<span>🍽 ${recipe.servings} servings</span><span>🔥 ${recipe.calories} cal</span>
<span>⭐ ${recipe.rating}</span><span>${recipe.difficulty}</span></div>
<div class="section"><h2>Ingredients</h2><ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul></div>
<div class="section"><h2>Steps</h2><ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol></div>
<div class="tags">${recipe.tags.map(t => `<span>#${t}</span>`).join("")}</div>
<footer>Shared from CookGrid 🍳</footer></body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${recipe.title.replace(/\s+/g, "-")}-recipe.html`;
    a.click();
    toast.success("Recipe exported as HTML!");
  };

  const copyLink = (recipe: typeof recipes[0]) => {
    navigator.clipboard.writeText(`${window.location.origin}/watch/${recipe.id}`);
    toast.success("Link copied!");
  };

  const copyRecipeText = (recipe: typeof recipes[0]) => {
    const text = `🍳 ${recipe.title}\nby ${recipe.chef}\n\n📝 Ingredients:\n${recipe.ingredients.map(i => `• ${i}`).join("\n")}\n\n👨‍🍳 Steps:\n${recipe.steps.map((s, i) => `${i + 1}. ${s}`).join("\n")}\n\nShared from CookGrid`;
    navigator.clipboard.writeText(text);
    toast.success("Recipe copied to clipboard!");
  };

  const printRecipe = (recipe: typeof recipes[0]) => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<html><head><title>${recipe.title}</title><style>body{font-family:Georgia,serif;max-width:700px;margin:40px auto;padding:0 20px}h1{border-bottom:2px solid #333;padding-bottom:8px}li{margin:6px 0}</style></head><body>
      <h1>${recipe.title}</h1><p>by ${recipe.chef} • ${recipe.category} • ${recipe.difficulty}</p>
      <p>Prep: ${recipe.prepTime} | Cook: ${recipe.cookTime} | Servings: ${recipe.servings} | ${recipe.calories} cal</p>
      <h2>Ingredients</h2><ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
      <h2>Steps</h2><ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol></body></html>`);
    win.document.close();
    win.print();
  };

  const shareViaEmail = (recipe: typeof recipes[0]) => {
    const subject = `Check out this recipe: ${recipe.title}`;
    const body = `${recipe.title} by ${recipe.chef}\n\nIngredients:\n${recipe.ingredients.join("\n")}\n\nView on CookGrid: ${window.location.origin}/watch/${recipe.id}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Share & Export Recipes</h1>

      {!selectedRecipe ? (
        <>
          <Input placeholder="Search recipes..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="max-w-md" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(recipe => (
              <button key={recipe.id} onClick={() => setSelectedRecipeId(recipe.id)} className="group relative aspect-[4/5] rounded-xl overflow-hidden hover-lift text-left">
                <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-sm font-bold text-cream">{recipe.title}</p>
                  <p className="text-xs text-cream/60">{recipe.chef}</p>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-cream/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Share2 className="w-4 h-4 text-cream" />
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setSelectedRecipeId(null)} className="text-sm text-primary hover:underline">← Back to recipes</button>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recipe Preview */}
            <Card className="glass-card overflow-hidden">
              <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full aspect-video object-cover" />
              <CardContent className="p-4">
                <h2 className="font-display font-bold text-xl">{selectedRecipe.title}</h2>
                <p className="text-sm text-muted-foreground">{selectedRecipe.chef} • {selectedRecipe.category} • {selectedRecipe.difficulty}</p>
                <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Prep: {selectedRecipe.prepTime}</span>
                  <span>Cook: {selectedRecipe.cookTime}</span>
                  <span>{selectedRecipe.servings} servings</span>
                  <span>{selectedRecipe.calories} cal</span>
                </div>
              </CardContent>
            </Card>

            {/* Share Options */}
            <div className="space-y-4">
              <Card className="glass-card">
                <CardHeader><CardTitle className="font-display">Share</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => copyLink(selectedRecipe)}>
                    <LinkIcon className="h-5 w-5 text-primary" /><span className="text-xs">Copy Link</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => copyRecipeText(selectedRecipe)}>
                    <Copy className="h-5 w-5 text-primary" /><span className="text-xs">Copy Text</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => shareViaEmail(selectedRecipe)}>
                    <Mail className="h-5 w-5 text-primary" /><span className="text-xs">Email</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => printRecipe(selectedRecipe)}>
                    <Printer className="h-5 w-5 text-primary" /><span className="text-xs">Print</span>
                  </Button>
                </CardContent>
              </Card>
              <Card className="glass-card">
                <CardHeader><CardTitle className="font-display">Export</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-3 gap-3">
                  <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => exportAsTxt(selectedRecipe)}>
                    <FileText className="h-5 w-5 text-accent" /><span className="text-xs">.TXT</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => exportAsJSON(selectedRecipe)}>
                    <Download className="h-5 w-5 text-herb" /><span className="text-xs">.JSON</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-3 flex-col gap-1" onClick={() => exportAsHTML(selectedRecipe)}>
                    <QrCode className="h-5 w-5 text-warning" /><span className="text-xs">.HTML</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
