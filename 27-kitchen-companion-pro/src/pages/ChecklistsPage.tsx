import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Plus, Trash2, CheckSquare } from "lucide-react";

interface ChecklistItem { text: string; done: boolean; }
interface Checklist { id: string; title: string; items: ChecklistItem[]; }

const STORAGE_KEY = "cookgrid_checklists";

export default function ChecklistsPage() {
  const [checklists, setChecklists] = useState<Checklist[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [itemText, setItemText] = useState("");
  const [newItems, setNewItems] = useState<string[]>([]);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(checklists)); }, [checklists]);

  const addChecklist = () => {
    if (!title) return;
    setChecklists(prev => [{ id: crypto.randomUUID(), title, items: newItems.map(t => ({ text: t, done: false })) }, ...prev]);
    toast.success("Checklist created!");
    setTitle(""); setNewItems([]); setShowForm(false);
  };

  const addItemToForm = () => { if (itemText.trim()) { setNewItems([...newItems, itemText.trim()]); setItemText(""); } };

  const toggleItem = (clId: string, idx: number) => {
    setChecklists(prev => prev.map(cl => cl.id === clId ? { ...cl, items: cl.items.map((item, i) => i === idx ? { ...item, done: !item.done } : item) } : cl));
  };

  const deleteChecklist = (id: string) => { setChecklists(prev => prev.filter(cl => cl.id !== id)); toast.success("Deleted"); };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Checklists</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> New Checklist</Button>
      </div>
      {showForm && (
        <Card className="glass-card">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Checklist title" value={title} onChange={e => setTitle(e.target.value)} />
            <div className="flex gap-2">
              <Input placeholder="Add item" value={itemText} onChange={e => setItemText(e.target.value)} onKeyDown={e => e.key === "Enter" && addItemToForm()} />
              <Button variant="secondary" onClick={addItemToForm}>Add</Button>
            </div>
            {newItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span>• {item}</span>
                <button onClick={() => setNewItems(newItems.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-destructive text-xs">✕</button>
              </div>
            ))}
            <Button onClick={addChecklist} disabled={!title} className="gradient-primary text-primary-foreground">Create</Button>
          </CardContent>
        </Card>
      )}
      {checklists.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No checklists yet.</p>
        </CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {checklists.map(cl => {
            const done = cl.items.filter(i => i.done).length;
            return (
              <Card key={cl.id} className="glass-card">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-display">{cl.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">{done}/{cl.items.length} done</span>
                  </div>
                  <button onClick={() => deleteChecklist(cl.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </CardHeader>
                <CardContent className="space-y-2">
                  {cl.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Checkbox checked={item.done} onCheckedChange={() => toggleItem(cl.id, idx)} />
                      <span className={`text-sm ${item.done ? "line-through text-muted-foreground" : ""}`}>{item.text}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
