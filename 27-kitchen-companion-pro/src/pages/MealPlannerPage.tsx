import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, CalendarDays } from "lucide-react";

interface MealPlan { id: string; title: string; date: string; meal_type: string; notes: string; }

const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];
const STORAGE_KEY = "cookgrid_meal_plans";

export default function MealPlannerPage() {
  const [plans, setPlans] = useState<MealPlan[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [mealType, setMealType] = useState("Lunch");
  const [notes, setNotes] = useState("");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(plans)); }, [plans]);

  const addPlan = () => {
    if (!title) return;
    setPlans(prev => [...prev, { id: crypto.randomUUID(), title, date, meal_type: mealType, notes }].sort((a, b) => a.date.localeCompare(b.date)));
    toast.success("Meal planned!");
    setTitle(""); setNotes(""); setShowForm(false);
  };

  const deletePlan = (id: string) => { setPlans(prev => prev.filter(p => p.id !== id)); toast.success("Removed"); };

  const grouped = plans.reduce((acc, plan) => {
    (acc[plan.date] = acc[plan.date] || []).push(plan);
    return acc;
  }, {} as Record<string, MealPlan[]>);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Meal Planner</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> Plan Meal</Button>
      </div>
      {showForm && (
        <Card className="glass-card">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="What are you having?" value={title} onChange={e => setTitle(e.target.value)} />
            <div className="flex gap-3">
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{mealTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Input placeholder="Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
            <Button onClick={addPlan} disabled={!title} className="gradient-primary text-primary-foreground">Save</Button>
          </CardContent>
        </Card>
      )}
      {plans.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <CalendarDays className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No meal plans yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([date, meals]) => (
            <div key={date}>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{new Date(date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</h3>
              <div className="space-y-2">
                {meals.map(meal => (
                  <Card key={meal.id} className="glass-card">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs text-primary font-medium mr-2">{meal.meal_type}</span>
                        <span>{meal.title}</span>
                        {meal.notes && <p className="text-xs text-muted-foreground mt-1">{meal.notes}</p>}
                      </div>
                      <button onClick={() => deletePlan(meal.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
