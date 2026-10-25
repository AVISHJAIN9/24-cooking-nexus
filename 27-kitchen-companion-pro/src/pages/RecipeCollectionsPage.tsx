import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { FolderHeart, Plus, Trash2, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Collection {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  recipe_ids: string[];
}

const COLLECTIONS_KEY = "cookgrid_recipe_collections";

export default function RecipeCollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>(() => {
    try { return JSON.parse(localStorage.getItem(COLLECTIONS_KEY) || "[]"); } catch { return []; }
  });
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => { localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections)); }, [collections]);

  const create = () => {
    if (!name.trim()) return;
    setCollections(prev => [{ id: crypto.randomUUID(), name, description: desc || null, created_at: new Date().toISOString(), recipe_ids: [] }, ...prev]);
    toast.success("Collection created!");
    setName(""); setDesc(""); setOpen(false);
  };

  const remove = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id));
    toast.success("Deleted");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Recipe Collections</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> New Collection</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Collection</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-2">
              <Input placeholder="Collection name" value={name} onChange={e => setName(e.target.value)} />
              <Textarea placeholder="Description (optional)" value={desc} onChange={e => setDesc(e.target.value)} />
              <Button onClick={create} disabled={!name.trim()} className="w-full gradient-primary text-primary-foreground">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {collections.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <FolderHeart className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No collections yet. Organize your recipes!</p>
        </CardContent></Card>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {collections.map(c => (
            <Card key={c.id} className="glass-card hover:shadow-lg transition-all">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><FolderHeart className="h-5 w-5 text-primary" /></div>
                    <div>
                      <h3 className="font-semibold">{c.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><BookOpen className="h-3 w-3" /> {c.recipe_ids.length} recipes</p>
                    </div>
                  </div>
                  <button onClick={() => remove(c.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
                {c.description && <p className="text-sm text-muted-foreground mt-3">{c.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
