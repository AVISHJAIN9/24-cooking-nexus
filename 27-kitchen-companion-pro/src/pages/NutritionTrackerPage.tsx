import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Trash2, Apple, Flame, Beef, Wheat, Droplets, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface NutritionEntry {
  id: string;
  food: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  meal_type: string;
  date: string;
}

interface DailyGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const STORAGE_KEY = "cookgrid_nutrition";
const GOALS_KEY = "cookgrid_nutrition_goals";

const commonFoods = [
  { name: "Chicken Breast (100g)", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { name: "Rice (1 cup cooked)", calories: 206, protein: 4.3, carbs: 45, fat: 0.4 },
  { name: "Egg (1 large)", calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
  { name: "Banana (1 medium)", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: "Salmon (100g)", calories: 208, protein: 20, carbs: 0, fat: 13 },
  { name: "Avocado (half)", calories: 161, protein: 2, carbs: 8.5, fat: 15 },
  { name: "Greek Yogurt (1 cup)", calories: 100, protein: 17, carbs: 6, fat: 0.7 },
  { name: "Bread (1 slice)", calories: 79, protein: 2.7, carbs: 15, fat: 1 },
  { name: "Pasta (1 cup cooked)", calories: 220, protein: 8, carbs: 43, fat: 1.3 },
  { name: "Olive Oil (1 tbsp)", calories: 119, protein: 0, carbs: 0, fat: 14 },
];

export default function NutritionTrackerPage() {
  const today = new Date().toISOString().split("T")[0];
  const [entries, setEntries] = useState<NutritionEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [goals, setGoals] = useState<DailyGoals>(() => {
    const stored = localStorage.getItem(GOALS_KEY);
    return stored ? JSON.parse(stored) : { calories: 2000, protein: 150, carbs: 250, fat: 65 };
  });
  const [showForm, setShowForm] = useState(false);
  const [showGoals, setShowGoals] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [mealType, setMealType] = useState("Lunch");

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)); }, [entries]);
  useEffect(() => { localStorage.setItem(GOALS_KEY, JSON.stringify(goals)); }, [goals]);

  const todayEntries = entries.filter(e => e.date === selectedDate);
  const totals = todayEntries.reduce((acc, e) => ({
    calories: acc.calories + e.calories, protein: acc.protein + e.protein,
    carbs: acc.carbs + e.carbs, fat: acc.fat + e.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const addEntry = () => {
    if (!food) return;
    setEntries(prev => [...prev, {
      id: crypto.randomUUID(), food, calories: parseInt(calories) || 0,
      protein: parseFloat(protein) || 0, carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0, meal_type: mealType, date: selectedDate,
    }]);
    toast.success("Entry added!");
    setFood(""); setCalories(""); setProtein(""); setCarbs(""); setFat(""); setShowForm(false);
  };

  const prefillFood = (item: typeof commonFoods[0]) => {
    setFood(item.name);
    setCalories(String(item.calories));
    setProtein(String(item.protein));
    setCarbs(String(item.carbs));
    setFat(String(item.fat));
  };

  const deleteEntry = (id: string) => { setEntries(prev => prev.filter(e => e.id !== id)); toast.success("Removed"); };

  const pct = (val: number, goal: number) => Math.min((val / goal) * 100, 100);

  // Weekly summary
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - i);
    return d.toISOString().split("T")[0];
  }).reverse();
  const weeklyData = last7.map(date => {
    const dayEntries = entries.filter(e => e.date === date);
    return { date, calories: dayEntries.reduce((s, e) => s + e.calories, 0) };
  });
  const maxCal = Math.max(...weeklyData.map(d => d.calories), goals.calories);

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-display font-bold">Nutrition Tracker</h1>
        <div className="flex gap-2">
          <Input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-auto" />
          <Button variant="outline" onClick={() => setShowGoals(!showGoals)}>Goals</Button>
          <Button onClick={() => setShowForm(!showForm)} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" /> Log Food</Button>
        </div>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Calories", value: totals.calories, goal: goals.calories, unit: "kcal", icon: Flame, color: "text-primary" },
          { label: "Protein", value: totals.protein, goal: goals.protein, unit: "g", icon: Beef, color: "text-accent" },
          { label: "Carbs", value: totals.carbs, goal: goals.carbs, unit: "g", icon: Wheat, color: "text-warning" },
          { label: "Fat", value: totals.fat, goal: goals.fat, unit: "g", icon: Droplets, color: "text-herb" },
        ].map(stat => (
          <Card key={stat.label} className="glass-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <p className="text-2xl font-display font-bold">{Math.round(stat.value)}<span className="text-sm text-muted-foreground ml-1">{stat.unit}</span></p>
              <Progress value={pct(stat.value, stat.goal)} className="mt-2 h-1.5" />
              <p className="text-xs text-muted-foreground mt-1">{Math.round(stat.goal - stat.value)} {stat.unit} remaining</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Bar Chart */}
      <Card className="glass-card">
        <CardHeader><CardTitle className="font-display flex items-center gap-2"><TrendingUp className="h-5 w-5 text-primary" /> Weekly Overview</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-32">
            {weeklyData.map(d => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-muted-foreground">{d.calories > 0 ? d.calories : ""}</span>
                <div className="w-full rounded-t-md gradient-primary transition-all" style={{ height: `${(d.calories / maxCal) * 100}%`, minHeight: d.calories > 0 ? 4 : 0 }} />
                <span className="text-[10px] text-muted-foreground">{new Date(d.date).toLocaleDateString("en", { weekday: "short" })}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 border-t border-dashed border-border pt-2">
            <span className="text-xs text-muted-foreground">Daily goal: {goals.calories} kcal</span>
          </div>
        </CardContent>
      </Card>

      {/* Goals Editor */}
      {showGoals && (
        <Card className="glass-card animate-fade-up">
          <CardHeader><CardTitle className="font-display">Daily Goals</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div><label className="text-xs text-muted-foreground">Calories (kcal)</label><Input type="number" value={goals.calories} onChange={e => setGoals(g => ({ ...g, calories: parseInt(e.target.value) || 0 }))} /></div>
            <div><label className="text-xs text-muted-foreground">Protein (g)</label><Input type="number" value={goals.protein} onChange={e => setGoals(g => ({ ...g, protein: parseInt(e.target.value) || 0 }))} /></div>
            <div><label className="text-xs text-muted-foreground">Carbs (g)</label><Input type="number" value={goals.carbs} onChange={e => setGoals(g => ({ ...g, carbs: parseInt(e.target.value) || 0 }))} /></div>
            <div><label className="text-xs text-muted-foreground">Fat (g)</label><Input type="number" value={goals.fat} onChange={e => setGoals(g => ({ ...g, fat: parseInt(e.target.value) || 0 }))} /></div>
          </CardContent>
        </Card>
      )}

      {/* Add Food Form */}
      {showForm && (
        <Card className="glass-card animate-fade-up">
          <CardContent className="p-4 space-y-4">
            <p className="text-sm font-medium">Quick Add</p>
            <div className="flex flex-wrap gap-2">
              {commonFoods.map(f => (
                <button key={f.name} onClick={() => prefillFood(f)} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs hover:bg-secondary/80 transition-colors">{f.name.split("(")[0].trim()}</button>
              ))}
            </div>
            <Input placeholder="Food name" value={food} onChange={e => setFood(e.target.value)} />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Input placeholder="Calories" type="number" value={calories} onChange={e => setCalories(e.target.value)} />
              <Input placeholder="Protein (g)" type="number" value={protein} onChange={e => setProtein(e.target.value)} />
              <Input placeholder="Carbs (g)" type="number" value={carbs} onChange={e => setCarbs(e.target.value)} />
              <Input placeholder="Fat (g)" type="number" value={fat} onChange={e => setFat(e.target.value)} />
            </div>
            <Select value={mealType} onValueChange={setMealType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Breakfast", "Lunch", "Dinner", "Snack"].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={addEntry} disabled={!food} className="gradient-primary text-primary-foreground">Log Entry</Button>
          </CardContent>
        </Card>
      )}

      {/* Today's Log */}
      {todayEntries.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <Apple className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No food logged for this day.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {["Breakfast", "Lunch", "Dinner", "Snack"].map(meal => {
            const mealEntries = todayEntries.filter(e => e.meal_type === meal);
            if (mealEntries.length === 0) return null;
            return (
              <div key={meal}>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">{meal}</h3>
                {mealEntries.map(entry => (
                  <Card key={entry.id} className="glass-card mb-2">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <span className="font-medium">{entry.food}</span>
                        <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                          <span>{entry.calories} kcal</span>
                          <span>P: {entry.protein}g</span>
                          <span>C: {entry.carbs}g</span>
                          <span>F: {entry.fat}g</span>
                        </div>
                      </div>
                      <button onClick={() => deleteEntry(entry.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
