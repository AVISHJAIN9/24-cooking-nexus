import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, BookOpen, Star, Image } from "lucide-react";

interface JournalEntry {
  id: string;
  recipe_name: string;
  date: string;
  rating: number;
  notes: string;
  mood: string;
  what_worked: string;
  what_to_improve: string;
  photo_url: string;
}

const STORAGE_KEY = "cookgrid_journal";
const moods = ["😊 Great", "🙂 Good", "😐 Okay", "😕 Meh", "😤 Frustrated"];

export default function CookingJournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [recipeName, setRecipeName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [rating, setRating] = useState(5);
  const [notes, setNotes] = useState("");
  const [mood, setMood] = useState(moods[0]);
  const [whatWorked, setWhatWorked] = useState("");
  const [whatToImprove, setWhatToImprove] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }, [entries]);

  const addEntry = () => {
    if (!recipeName) return;
    setEntries(prev => [{
      id: crypto.randomUUID(), recipe_name: recipeName, date, rating, notes, mood,
      what_worked: whatWorked, what_to_improve: whatToImprove, photo_url: photoUrl,
    }, ...prev]);
    toast.success("Journal entry added!");
    setRecipeName(""); setNotes(""); setWhatWorked(""); setWhatToImprove(""); setPhotoUrl(""); setShowForm(false);
  };

  const deleteEntry = (id: string) => { setEntries(prev => prev.filter(e => e.id !== id)); toast.success("Deleted"); };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const avgRating = entries.length > 0 ? (entries.reduce((s, e) => s + e.rating, 0) / entries.length).toFixed(1) : "—";
  const totalCooks = entries.length;

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Cooking Journal</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> New Entry</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="glass-card"><CardContent className="p-4 text-center">
          <p className="text-2xl font-display font-bold">{totalCooks}</p>
          <p className="text-xs text-muted-foreground">Total Cooks</p>
        </CardContent></Card>
        <Card className="glass-card"><CardContent className="p-4 text-center">
          <p className="text-2xl font-display font-bold flex items-center justify-center gap-1">{avgRating} <Star className="h-4 w-4 fill-warning text-warning" /></p>
          <p className="text-xs text-muted-foreground">Avg Rating</p>
        </CardContent></Card>
        <Card className="glass-card"><CardContent className="p-4 text-center">
          <p className="text-2xl font-display font-bold">{new Set(entries.map(e => e.recipe_name)).size}</p>
          <p className="text-xs text-muted-foreground">Unique Recipes</p>
        </CardContent></Card>
      </div>

      {/* Form */}
      {showForm && (
        <Card className="glass-card animate-fade-up">
          <CardContent className="p-4 space-y-4">
            <Input placeholder="What did you cook?" value={recipeName} onChange={e => setRecipeName(e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              <Select value={mood} onValueChange={setMood}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{moods.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} onClick={() => setRating(n)}>
                    <Star className={`h-6 w-6 transition-colors ${n <= rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
            <Textarea placeholder="General notes..." value={notes} onChange={e => setNotes(e.target.value)} />
            <Input placeholder="What worked well?" value={whatWorked} onChange={e => setWhatWorked(e.target.value)} />
            <Input placeholder="What to improve next time?" value={whatToImprove} onChange={e => setWhatToImprove(e.target.value)} />
            <div>
              <label className="text-sm font-medium mb-1 block">Photo (optional)</label>
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="text-sm" />
              {photoUrl && <img src={photoUrl} alt="Preview" className="mt-2 h-24 rounded-lg object-cover" />}
            </div>
            <Button onClick={addEntry} disabled={!recipeName} className="gradient-primary text-primary-foreground">Save Entry</Button>
          </CardContent>
        </Card>
      )}

      {/* Entries */}
      {entries.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">Start your cooking journal! Record what you cook and how it went.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {entries.map(entry => (
            <Card key={entry.id} className="glass-card">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4">
                    {entry.photo_url && <img src={entry.photo_url} alt={entry.recipe_name} className="h-16 w-16 rounded-lg object-cover flex-shrink-0" />}
                    <div>
                      <h3 className="font-display font-bold">{entry.recipe_name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</span>
                        <span className="text-xs">{entry.mood}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map(n => <Star key={n} className={`h-3 w-3 ${n <= entry.rating ? "fill-warning text-warning" : "text-muted-foreground/30"}`} />)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => deleteEntry(entry.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
                {entry.notes && <p className="text-sm text-muted-foreground mb-2">{entry.notes}</p>}
                <div className="flex gap-4 text-xs">
                  {entry.what_worked && <span className="text-herb">✅ {entry.what_worked}</span>}
                  {entry.what_to_improve && <span className="text-accent">💡 {entry.what_to_improve}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
