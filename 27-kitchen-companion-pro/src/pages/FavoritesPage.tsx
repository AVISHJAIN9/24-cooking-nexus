import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2, FolderHeart, Heart, Play, X, Star } from "lucide-react";
import { recipes } from "@/data/recipes";

interface Collection {
  id: string;
  name: string;
  emoji: string;
  recipe_ids: string[];
  created_at: string;
}

const FAVORITES_KEY = "cookgrid_favorites";
const COLLECTIONS_KEY = "cookgrid_collections";

const emojis = ["❤️", "🔥", "⭐", "🍳", "🥗", "🍕", "🍰", "🌮", "🍜", "🥘", "🍣", "🥑"];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [collections, setCollections] = useState<Collection[]>(() => {
    const stored = localStorage.getItem(COLLECTIONS_KEY);
    return stored ? JSON.parse(stored) : [
      { id: "default-1", name: "Quick & Easy", emoji: "⚡", recipe_ids: ["poke-bowl", "acai-bowl"], created_at: new Date().toISOString() },
      { id: "default-2", name: "Date Night", emoji: "💕", recipe_ids: ["seared-duck", "chocolate-lava-cake"], created_at: new Date().toISOString() },
    ];
  });
  const [showForm, setShowForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmoji, setNewEmoji] = useState("❤️");
  const [activeTab, setActiveTab] = useState<"favorites" | "collections">("favorites");
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const [addingToCollection, setAddingToCollection] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections)); }, [collections]);

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]);
  };

  const createCollection = () => {
    if (!newName) return;
    setCollections(prev => [...prev, { id: crypto.randomUUID(), name: newName, emoji: newEmoji, recipe_ids: [], created_at: new Date().toISOString() }]);
    toast.success("Collection created!");
    setNewName(""); setShowForm(false);
  };

  const deleteCollection = (id: string) => { setCollections(prev => prev.filter(c => c.id !== id)); toast.success("Deleted"); };

  const addToCollection = (collectionId: string, recipeId: string) => {
    setCollections(prev => prev.map(c => c.id === collectionId ? {
      ...c, recipe_ids: c.recipe_ids.includes(recipeId) ? c.recipe_ids : [...c.recipe_ids, recipeId]
    } : c));
    toast.success("Added to collection!");
    setAddingToCollection(null);
  };

  const removeFromCollection = (collectionId: string, recipeId: string) => {
    setCollections(prev => prev.map(c => c.id === collectionId ? {
      ...c, recipe_ids: c.recipe_ids.filter(id => id !== recipeId)
    } : c));
  };

  const favoriteRecipes = recipes.filter(r => favorites.includes(r.id));
  const activeCollection = collections.find(c => c.id === activeCollectionId);
  const activeCollectionRecipes = activeCollection ? recipes.filter(r => activeCollection.recipe_ids.includes(r.id)) : [];

  const RecipeCard = ({ recipe, collectionId }: { recipe: typeof recipes[0]; collectionId?: string }) => (
    <div className="group relative rounded-xl overflow-hidden aspect-[4/5] hover-lift">
      <Link to={`/watch/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-sm font-bold text-cream">{recipe.title}</p>
          <p className="text-xs text-cream/60">{recipe.chef} • {recipe.difficulty}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-cream/60 flex items-center gap-1"><Star className="w-3 h-3 fill-warning text-warning" />{recipe.rating}</span>
            <span className="text-xs text-cream/60">{recipe.duration}</span>
          </div>
        </div>
      </Link>
      <div className="absolute top-2 right-2 flex gap-1">
        <button onClick={() => toggleFavorite(recipe.id)} className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${favorites.includes(recipe.id) ? "bg-destructive/80" : "bg-cream/15 hover:bg-primary/70"}`}>
          <Heart className={`w-4 h-4 text-cream ${favorites.includes(recipe.id) ? "fill-cream" : ""}`} />
        </button>
        {collectionId && (
          <button onClick={() => removeFromCollection(collectionId, recipe.id)} className="w-8 h-8 rounded-full bg-cream/15 backdrop-blur-sm flex items-center justify-center hover:bg-destructive/70 transition-colors">
            <X className="w-4 h-4 text-cream" />
          </button>
        )}
        {!collectionId && (
          <button onClick={() => setAddingToCollection(recipe.id)} className="w-8 h-8 rounded-full bg-cream/15 backdrop-blur-sm flex items-center justify-center hover:bg-primary/70 transition-colors">
            <Plus className="w-4 h-4 text-cream" />
          </button>
        )}
      </div>
      {/* Add to collection popover */}
      {addingToCollection === recipe.id && (
        <div className="absolute top-12 right-2 bg-card border border-border rounded-xl shadow-lg p-2 z-10 min-w-[160px] animate-fade-up">
          <p className="text-xs font-medium px-2 py-1 text-muted-foreground">Add to collection</p>
          {collections.map(c => (
            <button key={c.id} onClick={() => addToCollection(c.id, recipe.id)} className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-secondary transition-colors">
              {c.emoji} {c.name}
            </button>
          ))}
          <button onClick={() => setAddingToCollection(null)} className="w-full text-left px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-secondary">Cancel</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Favorites & Collections</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> New Collection</Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-secondary rounded-xl p-1 w-fit">
        {(["favorites", "collections"] as const).map(tab => (
          <button key={tab} onClick={() => { setActiveTab(tab); setActiveCollectionId(null); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"}`}>
            {tab === "favorites" ? `❤️ Favorites (${favorites.length})` : `📁 Collections (${collections.length})`}
          </button>
        ))}
      </div>

      {/* Create Collection Form */}
      {showForm && (
        <Card className="glass-card animate-fade-up">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Collection name" value={newName} onChange={e => setNewName(e.target.value)} />
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Choose emoji</label>
              <div className="flex gap-2 flex-wrap">
                {emojis.map(e => (
                  <button key={e} onClick={() => setNewEmoji(e)} className={`text-xl p-1 rounded ${newEmoji === e ? "bg-primary/10 ring-2 ring-primary" : ""}`}>{e}</button>
                ))}
              </div>
            </div>
            <Button onClick={createCollection} disabled={!newName} className="gradient-primary text-primary-foreground">Create</Button>
          </CardContent>
        </Card>
      )}

      {/* Favorites Tab */}
      {activeTab === "favorites" && !activeCollectionId && (
        favoriteRecipes.length === 0 ? (
          <Card className="glass-card"><CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No favorites yet. Heart recipes to add them here!</p>
            <Link to="/reels"><Button variant="outline" className="mt-4 rounded-full"><Play className="h-4 w-4 mr-2" /> Browse Recipes</Button></Link>
          </CardContent></Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {favoriteRecipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
          </div>
        )
      )}

      {/* Collections Tab */}
      {activeTab === "collections" && !activeCollectionId && (
        collections.length === 0 ? (
          <Card className="glass-card"><CardContent className="p-8 text-center">
            <FolderHeart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No collections yet.</p>
          </CardContent></Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {collections.map(col => {
              const colRecipes = recipes.filter(r => col.recipe_ids.includes(r.id));
              return (
                <Card key={col.id} className="glass-card hover:shadow-glow transition-shadow cursor-pointer overflow-hidden" onClick={() => setActiveCollectionId(col.id)}>
                  <div className="h-32 relative">
                    {colRecipes.length > 0 ? (
                      <div className="grid grid-cols-2 h-full">
                        {colRecipes.slice(0, 4).map(r => (
                          <img key={r.id} src={r.image} alt={r.title} className="w-full h-full object-cover" />
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full bg-secondary flex items-center justify-center text-3xl">{col.emoji}</div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-espresso/60 to-transparent" />
                  </div>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-display font-bold">{col.emoji} {col.name}</p>
                      <p className="text-xs text-muted-foreground">{col.recipe_ids.length} recipes</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); deleteCollection(col.id); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )
      )}

      {/* Active Collection Detail */}
      {activeCollectionId && activeCollection && (
        <div>
          <button onClick={() => setActiveCollectionId(null)} className="text-sm text-primary hover:underline mb-4">← Back to collections</button>
          <h2 className="text-xl font-display font-bold mb-4">{activeCollection.emoji} {activeCollection.name}</h2>
          {activeCollectionRecipes.length === 0 ? (
            <Card className="glass-card"><CardContent className="p-8 text-center">
              <p className="text-muted-foreground">This collection is empty. Add recipes from your favorites!</p>
            </CardContent></Card>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {activeCollectionRecipes.map(r => <RecipeCard key={r.id} recipe={r} collectionId={activeCollection.id} />)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
