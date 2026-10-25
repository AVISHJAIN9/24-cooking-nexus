import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, UtensilsCrossed, Users, BookOpen, Clock } from "lucide-react";
import { recipes } from "@/data/recipes";
import { Link } from "react-router-dom";

export default function GlobalSearchPage() {
  const [query, setQuery] = useState("");

  const results = query.trim().length > 1
    ? recipes.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.category.toLowerCase().includes(query.toLowerCase()) ||
        r.chef.toLowerCase().includes(query.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(query.toLowerCase())) ||
        r.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const categories = [...new Set(recipes.map(r => r.category))];
  const difficulties = ["Easy", "Medium", "Hard"];
  const [filterCat, setFilterCat] = useState("");
  const [filterDiff, setFilterDiff] = useState("");

  const filtered = results.filter(r =>
    (!filterCat || r.category === filterCat) &&
    (!filterDiff || r.difficulty === filterDiff)
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Search Everything</h1>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search recipes, ingredients, chefs, tags..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-12 py-6 text-base rounded-xl"
          autoFocus
        />
      </div>

      {query.trim().length > 1 && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilterCat("")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${!filterCat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
            All Categories
          </button>
          {categories.map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat === filterCat ? "" : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterCat === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {cat}
            </button>
          ))}
          <span className="w-px bg-border mx-1" />
          {difficulties.map(d => (
            <button key={d} onClick={() => setFilterDiff(d === filterDiff ? "" : d)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filterDiff === d ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"}`}>
              {d}
            </button>
          ))}
        </div>
      )}

      {query.trim().length > 1 ? (
        filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(recipe => (
              <Link to={`/watch/${recipe.id}`} key={recipe.id} className="group">
                <Card className="glass-card overflow-hidden hover:shadow-glow transition-shadow">
                  <div className="aspect-square relative overflow-hidden">
                    <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-sm font-bold text-cream">{recipe.title}</p>
                      <p className="text-xs text-cream/60">{recipe.chef}</p>
                    </div>
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-primary/80 text-[10px] text-primary-foreground font-medium">{recipe.difficulty}</div>
                  </div>
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {recipe.prepTime}</span>
                      <span>🔥 {recipe.calories} cal</span>
                      <span>⭐ {recipe.rating}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {recipe.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[10px]">#{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="glass-card"><CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No results for "{query}"</p>
          </CardContent></Card>
        )
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Try searching for:</p>
          <div className="flex flex-wrap gap-2">
            {["Chicken", "Pasta", "Thai", "Dessert", "Quick", "Italian", "Sushi", "Healthy"].map(term => (
              <button key={term} onClick={() => setQuery(term)} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm transition-colors">
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
