import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Plus, Trash2, UtensilsCrossed } from "lucide-react";

const RECIPES_KEY = "cookgrid_my_recipes";

interface LocalRecipe {
  id: string;
  title: string;
  description: string;
  prep_time: number | null;
  cook_time: number | null;
  image_url: string;
  created_at: string;
}

export default function RecipesPage() {
  const { user, profile } = useAuth();
  const isUploader = profile?.account_type === "uploader";
  const [recipes, setRecipes] = useState<LocalRecipe[]>(() => {
    try { return JSON.parse(localStorage.getItem(RECIPES_KEY) || "[]"); } catch { return []; }
  });
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");

  useEffect(() => { localStorage.setItem(RECIPES_KEY, JSON.stringify(recipes)); }, [recipes]);

  const addRecipe = () => {
    if (!title) return;
    const newRecipe: LocalRecipe = {
      id: crypto.randomUUID(), title, description,
      prep_time: prepTime ? parseInt(prepTime) : null,
      cook_time: cookTime ? parseInt(cookTime) : null,
      image_url: "", created_at: new Date().toISOString(),
    };
    setRecipes(prev => [newRecipe, ...prev]);
    toast.success("Recipe added!");
    setTitle(""); setDescription(""); setPrepTime(""); setCookTime(""); setShowForm(false);
  };

  const deleteRecipe = (id: string) => {
    setRecipes(prev => prev.filter(r => r.id !== id));
    toast.success("Recipe deleted");
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">My Recipes</h1>
        {isUploader && (
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> Add Recipe</Button>
        )}
      </div>
      {showForm && isUploader && (
        <Card className="glass-card">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Recipe title" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <div className="flex gap-3">
              <Input placeholder="Prep time (min)" type="number" value={prepTime} onChange={e => setPrepTime(e.target.value)} />
              <Input placeholder="Cook time (min)" type="number" value={cookTime} onChange={e => setCookTime(e.target.value)} />
            </div>
            <Button onClick={addRecipe} disabled={!title} className="gradient-primary text-primary-foreground">Save Recipe</Button>
          </CardContent>
        </Card>
      )}
      {recipes.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">{isUploader ? "No recipes yet. Add your first one!" : "No recipes yet. Browse and save recipes from the feed!"}</p>
        </CardContent></Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map(recipe => (
            <Card key={recipe.id} className="glass-card hover:shadow-glow transition-shadow overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-display">{recipe.title}</CardTitle>
                  <button onClick={() => deleteRecipe(recipe.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </CardHeader>
              <CardContent>
                {recipe.description && <p className="text-sm text-muted-foreground mb-2">{recipe.description}</p>}
                <div className="flex gap-4 text-xs text-muted-foreground">
                  {recipe.prep_time && <span>Prep: {recipe.prep_time}m</span>}
                  {recipe.cook_time && <span>Cook: {recipe.cook_time}m</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
