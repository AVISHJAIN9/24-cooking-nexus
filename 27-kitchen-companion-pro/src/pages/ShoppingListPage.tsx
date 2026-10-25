import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Trash2, ShoppingCart, Wand2, Download, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { recipes } from "@/data/recipes";

interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  checked: boolean;
}

interface ShoppingList {
  id: string;
  title: string;
  items: ShoppingItem[];
  created_at: string;
}

const STORAGE_KEY = "cookgrid_shopping_lists";

const categoryMap: Record<string, string> = {
  chicken: "Meat & Poultry", beef: "Meat & Poultry", shrimp: "Seafood", salmon: "Seafood", tuna: "Seafood",
  butter: "Dairy", cream: "Dairy", yogurt: "Dairy", cheese: "Dairy", mozzarella: "Dairy", egg: "Dairy",
  flour: "Pantry", sugar: "Pantry", oil: "Pantry", rice: "Pantry", noodle: "Pantry", pasta: "Pantry",
  tomato: "Produce", garlic: "Produce", lemon: "Produce", avocado: "Produce", banana: "Produce",
  basil: "Produce", herb: "Produce", carrot: "Produce",
  chocolate: "Baking", cocoa: "Baking",
  soy: "Condiments", "fish sauce": "Condiments", tamarind: "Condiments", sesame: "Condiments",
};

function categorizeItem(name: string): string {
  const lower = name.toLowerCase();
  for (const [keyword, cat] of Object.entries(categoryMap)) {
    if (lower.includes(keyword)) return cat;
  }
  return "Other";
}

export default function ShoppingListPage() {
  const [lists, setLists] = useState<ShoppingList[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);
  const [title, setTitle] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQty, setItemQty] = useState("");
  const [newItems, setNewItems] = useState<{ name: string; qty: string }[]>([]);
  const [selectedRecipeIds, setSelectedRecipeIds] = useState<Set<string>>(new Set());
  const [activeListId, setActiveListId] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(lists)); }, [lists]);

  // Also read meal plans for auto-generation
  const mealPlans = useMemo(() => {
    const stored = localStorage.getItem("cookgrid_meal_plans");
    return stored ? JSON.parse(stored) : [];
  }, []);

  const addItemToForm = () => {
    if (itemName.trim()) {
      setNewItems([...newItems, { name: itemName.trim(), qty: itemQty.trim() || "1" }]);
      setItemName(""); setItemQty("");
    }
  };

  const createList = () => {
    if (!title) return;
    const items: ShoppingItem[] = newItems.map(i => ({
      id: crypto.randomUUID(), name: i.name, quantity: i.qty,
      category: categorizeItem(i.name), checked: false,
    }));
    setLists(prev => [{ id: crypto.randomUUID(), title, items, created_at: new Date().toISOString() }, ...prev]);
    toast.success("Shopping list created!");
    setTitle(""); setNewItems([]); setShowForm(false);
  };

  const generateFromRecipes = () => {
    if (selectedRecipeIds.size === 0) { toast.error("Select at least one recipe"); return; }
    const allIngredients: ShoppingItem[] = [];
    selectedRecipeIds.forEach(recipeId => {
      const recipe = recipes.find(r => r.id === recipeId);
      if (recipe) {
        recipe.ingredients.forEach(ing => {
          allIngredients.push({
            id: crypto.randomUUID(), name: ing, quantity: "1",
            category: categorizeItem(ing), checked: false,
          });
        });
      }
    });
    const selectedNames = Array.from(selectedRecipeIds).map(id => recipes.find(r => r.id === id)?.title).filter(Boolean);
    setLists(prev => [{
      id: crypto.randomUUID(),
      title: `Shopping: ${selectedNames.slice(0, 2).join(", ")}${selectedNames.length > 2 ? "..." : ""}`,
      items: allIngredients,
      created_at: new Date().toISOString(),
    }, ...prev]);
    toast.success(`Shopping list generated from ${selectedRecipeIds.size} recipes!`);
    setSelectedRecipeIds(new Set());
    setShowGenerator(false);
  };

  const generateFromMealPlan = () => {
    if (mealPlans.length === 0) { toast.error("No meal plans found"); return; }
    const matchedRecipes = mealPlans
      .map((mp: { title: string }) => recipes.find(r => r.title.toLowerCase().includes(mp.title.toLowerCase())))
      .filter(Boolean);
    if (matchedRecipes.length === 0) { toast.error("No matching recipes found for your meal plans"); return; }
    const allIngredients: ShoppingItem[] = [];
    matchedRecipes.forEach((recipe: typeof recipes[0]) => {
      recipe.ingredients.forEach(ing => {
        allIngredients.push({
          id: crypto.randomUUID(), name: ing, quantity: "1",
          category: categorizeItem(ing), checked: false,
        });
      });
    });
    setLists(prev => [{
      id: crypto.randomUUID(), title: "Weekly Meal Plan Shopping",
      items: allIngredients, created_at: new Date().toISOString(),
    }, ...prev]);
    toast.success("Generated from meal plan!");
  };

  const toggleItem = (listId: string, itemId: string) => {
    setLists(prev => prev.map(l => l.id === listId ? {
      ...l, items: l.items.map(i => i.id === itemId ? { ...i, checked: !i.checked } : i)
    } : l));
  };

  const deleteList = (id: string) => { setLists(prev => prev.filter(l => l.id !== id)); toast.success("Deleted"); };

  const exportList = (list: ShoppingList) => {
    const text = `${list.title}\n${"=".repeat(30)}\n\n` +
      Object.entries(list.items.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
      }, {} as Record<string, ShoppingItem[]>))
        .map(([cat, items]) => `${cat}:\n${items.map(i => `  ${i.checked ? "✓" : "☐"} ${i.name} (${i.quantity})`).join("\n")}`)
        .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${list.title.replace(/\s+/g, "-")}.txt`;
    a.click();
    toast.success("List exported!");
  };

  const shareList = (list: ShoppingList) => {
    const text = `${list.title}\n${list.items.map(i => `- ${i.name} (${i.quantity})`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const activeList = lists.find(l => l.id === activeListId);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-display font-bold">Shopping Lists</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowGenerator(!showGenerator)}><Wand2 className="h-4 w-4 mr-2" /> Auto-Generate</Button>
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> New List</Button>
        </div>
      </div>

      {/* Auto Generator */}
      {showGenerator && (
        <Card className="glass-card animate-fade-up">
          <CardHeader><CardTitle className="font-display">Generate Shopping List</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-3">Select recipes to generate from:</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {recipes.map(r => (
                  <button key={r.id} onClick={() => {
                    setSelectedRecipeIds(prev => {
                      const next = new Set(prev);
                      next.has(r.id) ? next.delete(r.id) : next.add(r.id);
                      return next;
                    });
                  }} className={`p-2 rounded-lg border text-left text-xs transition-colors ${selectedRecipeIds.has(r.id) ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"}`}>
                    <img src={r.image} alt={r.title} className="w-full aspect-square object-cover rounded-md mb-1" />
                    <span className="font-medium">{r.title}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={generateFromRecipes} disabled={selectedRecipeIds.size === 0} className="gradient-primary text-primary-foreground">Generate from Recipes</Button>
              <Button variant="outline" onClick={generateFromMealPlan}>Generate from Meal Plan</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manual Form */}
      {showForm && (
        <Card className="glass-card animate-fade-up">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="List title (e.g. Weekend Groceries)" value={title} onChange={e => setTitle(e.target.value)} />
            <div className="flex gap-2">
              <Input placeholder="Item name" value={itemName} onChange={e => setItemName(e.target.value)} onKeyDown={e => e.key === "Enter" && addItemToForm()} className="flex-1" />
              <Input placeholder="Qty" value={itemQty} onChange={e => setItemQty(e.target.value)} className="w-20" />
              <Button variant="secondary" onClick={addItemToForm}>Add</Button>
            </div>
            {newItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span>• {item.name} ({item.qty})</span>
                <button onClick={() => setNewItems(newItems.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive text-xs">✕</button>
              </div>
            ))}
            <Button onClick={createList} disabled={!title} className="gradient-primary text-primary-foreground">Create List</Button>
          </CardContent>
        </Card>
      )}

      {/* Active list detail view */}
      {activeList ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setActiveListId(null)} className="text-sm text-primary hover:underline">← Back to all lists</button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => exportList(activeList)}><Download className="h-4 w-4 mr-1" /> Export</Button>
              <Button variant="outline" size="sm" onClick={() => shareList(activeList)}><Share2 className="h-4 w-4 mr-1" /> Copy</Button>
            </div>
          </div>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="font-display">{activeList.title}</CardTitle>
              <span className="text-xs text-muted-foreground">{activeList.items.filter(i => i.checked).length}/{activeList.items.length} items checked</span>
            </CardHeader>
            <CardContent className="space-y-1">
              {Object.entries(activeList.items.reduce((acc, item) => {
                (acc[item.category] = acc[item.category] || []).push(item);
                return acc;
              }, {} as Record<string, ShoppingItem[]>)).map(([cat, items]) => (
                <div key={cat} className="mb-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">{cat}</h4>
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-3 py-1.5">
                      <Checkbox checked={item.checked} onCheckedChange={() => toggleItem(activeList.id, item.id)} />
                      <span className={`text-sm flex-1 ${item.checked ? "line-through text-muted-foreground" : ""}`}>{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.quantity}</span>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        /* List of all shopping lists */
        lists.length === 0 ? (
          <Card className="glass-card"><CardContent className="p-8 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No shopping lists yet.</p>
          </CardContent></Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lists.map(list => {
              const checked = list.items.filter(i => i.checked).length;
              return (
                <Card key={list.id} className="glass-card hover:shadow-glow transition-shadow cursor-pointer" onClick={() => setActiveListId(list.id)}>
                  <CardHeader className="pb-2 flex flex-row items-start justify-between">
                    <div>
                      <CardTitle className="text-lg font-display">{list.title}</CardTitle>
                      <span className="text-xs text-muted-foreground">{checked}/{list.items.length} items</span>
                    </div>
                    <button onClick={e => { e.stopPropagation(); deleteList(list.id); }} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </CardHeader>
                  <CardContent>
                    <Progress value={(checked / Math.max(list.items.length, 1)) * 100} className="h-1.5" />
                    <p className="text-xs text-muted-foreground mt-2">{new Date(list.created_at).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )
      )}
    </div>
  );
}
