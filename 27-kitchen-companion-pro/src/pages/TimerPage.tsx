import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Timer, Play, Pause, RotateCcw, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TimerState {
  id: string;
  label: string;
  totalSeconds: number;
  remaining: number;
  running: boolean;
}

export default function TimerPage() {
  const [timers, setTimers] = useState<TimerState[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newMinutes, setNewMinutes] = useState("5");
  const intervalsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addTimer = () => {
    const mins = parseInt(newMinutes) || 5;
    const timer: TimerState = { id: crypto.randomUUID(), label: newLabel || `Timer ${timers.length + 1}`, totalSeconds: mins * 60, remaining: mins * 60, running: false };
    setTimers(prev => [...prev, timer]);
    setNewLabel("");
  };

  const toggleTimer = (id: string) => setTimers(prev => prev.map(t => t.id === id ? { ...t, running: !t.running } : t));
  const resetTimer = (id: string) => setTimers(prev => prev.map(t => t.id === id ? { ...t, remaining: t.totalSeconds, running: false } : t));
  const removeTimer = (id: string) => {
    const interval = intervalsRef.current.get(id);
    if (interval) clearInterval(interval);
    intervalsRef.current.delete(id);
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  useEffect(() => {
    timers.forEach(timer => {
      if (timer.running && !intervalsRef.current.has(timer.id)) {
        const interval = setInterval(() => {
          setTimers(prev => prev.map(t => {
            if (t.id === timer.id && t.running) {
              if (t.remaining <= 1) { toast.success(`${t.label} is done!`); return { ...t, remaining: 0, running: false }; }
              return { ...t, remaining: t.remaining - 1 };
            }
            return t;
          }));
        }, 1000);
        intervalsRef.current.set(timer.id, interval);
      } else if (!timer.running && intervalsRef.current.has(timer.id)) {
        clearInterval(intervalsRef.current.get(timer.id)!);
        intervalsRef.current.delete(timer.id);
      }
    });
    return () => { intervalsRef.current.forEach(interval => clearInterval(interval)); };
  }, [timers.map(t => t.running).join()]);

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
  const getProgress = (t: TimerState) => ((t.totalSeconds - t.remaining) / t.totalSeconds) * 100;

  return (
    <div className="space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Kitchen Timer</h1>
      <Card className="glass-card">
        <CardContent className="p-4 flex gap-3 items-end">
          <div className="flex-1"><Input placeholder="Timer label" value={newLabel} onChange={e => setNewLabel(e.target.value)} /></div>
          <div className="w-24"><Input type="number" placeholder="Min" value={newMinutes} onChange={e => setNewMinutes(e.target.value)} min="1" /></div>
          <Button onClick={addTimer} className="gradient-primary text-primary-foreground"><Plus className="h-4 w-4" /></Button>
        </CardContent>
      </Card>
      {timers.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <Timer className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No timers running. Add one above.</p>
        </CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {timers.map(timer => (
            <Card key={timer.id} className={`glass-card ${timer.remaining === 0 ? "animate-pulse-glow" : ""}`}>
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">{timer.label}</p>
                <p className="text-4xl font-display font-bold mb-1">{formatTime(timer.remaining)}</p>
                <div className="w-full h-1.5 bg-secondary rounded-full mb-4 overflow-hidden">
                  <div className="h-full gradient-primary rounded-full transition-all" style={{ width: `${getProgress(timer)}%` }} />
                </div>
                <div className="flex justify-center gap-2">
                  <Button variant="secondary" size="icon" onClick={() => toggleTimer(timer.id)}>{timer.running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</Button>
                  <Button variant="secondary" size="icon" onClick={() => resetTimer(timer.id)}><RotateCcw className="h-4 w-4" /></Button>
                  <Button variant="secondary" size="icon" onClick={() => removeTimer(timer.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
