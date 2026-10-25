import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { ShoppingBasket, AlertTriangle, ShoppingCart, ChefHat } from "lucide-react";
import { recipes as localRecipes } from "@/data/recipes";

interface KitchenItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiry_date: string;
}

const STORAGE_KEY = "cookgrid_kitchen_items";

export default function KitchenPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<KitchenItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [shoppingList, setShoppingList] = useState<string[]>(() => {
    const stored = localStorage.getItem("cookgrid_shopping_from_kitchen");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem("cookgrid_shopping_from_kitchen", JSON.stringify(shoppingList)); }, [shoppingList]);

  const isExpiringSoon = (date: string) => { if (!date) return false; const diff = new Date(date).getTime() - Date.now(); return diff > 0 && diff < 3 * 24 * 60 * 60 * 1000; };
  const isExpired = (date: string) => { if (!date) return false; return new Date(date).getTime() < Date.now(); };

  const addToShoppingList = (ingredient: string) => {
    if (shoppingList.includes(ingredient.toLowerCase())) {
      toast.info(`"${ingredient}" is already in your shopping list`);
      return;
    }
    setShoppingList(prev => [...prev, ingredient.toLowerCase()]);
    toast.success(`Added "${ingredient}" to shopping list`);
  };

  const addMissingIngredients = (recipeIngredients: string[]) => {
    const inventoryNames = items.map(i => i.name.toLowerCase());
    const missing = recipeIngredients.filter(ing => !inventoryNames.some(inv => ing.toLowerCase().includes(inv) || inv.includes(ing.toLowerCase())));
    if (missing.length === 0) {
      toast.success("You have all ingredients! 🎉");
      return;
    }
    let added = 0;
    missing.forEach(m => {
      if (!shoppingList.includes(m.toLowerCase())) {
        setShoppingList(prev => [...prev, m.toLowerCase()]);
        added++;
      }
    });
    toast.success(`Added ${added} missing ingredient${added !== 1 ? "s" : ""} to shopping list`);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Kitchen Inventory</h1>
      </div>

      {/* Current inventory */}
      {items.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">What's in Your Kitchen</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {items.map(item => (
              <Card key={item.id} className={`glass-card ${isExpired(item.expiry_date) ? "border-destructive/50" : isExpiringSoon(item.expiry_date) ? "border-yellow-500/50" : ""}`}>
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {(isExpired(item.expiry_date) || isExpiringSoon(item.expiry_date)) && <AlertTriangle className={`h-4 w-4 ${isExpired(item.expiry_date) ? "text-destructive" : "text-yellow-500"}`} />}
                    <div>
                      <span className="font-medium text-sm">{item.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">{item.quantity} {item.unit}</span>
                    </div>
                  </div>
                  {item.expiry_date && <span className="text-xs text-muted-foreground">Exp: {item.expiry_date}</span>}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {items.length === 0 && (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <ShoppingBasket className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Your kitchen inventory is empty. Select a dish below to add ingredients to your shopping list!</p>
        </CardContent></Card>
      )}

      {/* Shopping list preview */}
      {shoppingList.length > 0 && (
        <Card className="glass-card border-primary/30">
          <CardContent className="p-4">
            <h3 className="font-semibold flex items-center gap-2 mb-3"><ShoppingCart className="h-4 w-4 text-primary" /> Shopping List ({shoppingList.length} items)</h3>
            <div className="flex flex-wrap gap-2">
              {shoppingList.map((item, i) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize flex items-center gap-1">
                  {item}
                  <button onClick={() => setShoppingList(prev => prev.filter((_, idx) => idx !== i))} className="hover:text-destructive ml-1">×</button>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dishes - add ingredients to shopping list */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2"><ChefHat className="h-5 w-5 text-primary" /> Browse Dishes</h2>
        <p className="text-sm text-muted-foreground mb-4">Select a dish to add its ingredients directly to your shopping list. Missing items from your inventory will be highlighted.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {localRecipes.map(recipe => {
            const recipeIngredients = recipe.ingredients || [];
            const inventoryNames = items.map(i => i.name.toLowerCase());
            const missingCount = recipeIngredients.filter(ing => !inventoryNames.some(inv => ing.toLowerCase().includes(inv) || inv.includes(ing.toLowerCase()))).length;

            return (
              <Card key={recipe.id} className="glass-card overflow-hidden hover:shadow-lg transition-all">
                <div className="h-32 overflow-hidden relative">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3">
                    <p className="text-white font-semibold text-sm">{recipe.title}</p>
                    <p className="text-white/70 text-xs">{recipe.chef}</p>
                  </div>
                </div>
                <CardContent className="p-3 space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {recipeIngredients.slice(0, 4).map((ing, i) => {
                      const inStock = inventoryNames.some(inv => ing.toLowerCase().includes(inv) || inv.includes(ing.toLowerCase()));
                      return (
                        <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${inStock ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
                          {ing}
                        </span>
                      );
                    })}
                    {recipeIngredients.length > 4 && <span className="text-xs text-muted-foreground">+{recipeIngredients.length - 4} more</span>}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={() => recipeIngredients.forEach(ing => addToShoppingList(ing))}>
                      <ShoppingCart className="h-3 w-3 mr-1" /> Add All
                    </Button>
                    {missingCount > 0 && (
                      <Button size="sm" className="flex-1 text-xs gradient-primary text-primary-foreground" onClick={() => addMissingIngredients(recipeIngredients)}>
                        Add {missingCount} Missing
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
