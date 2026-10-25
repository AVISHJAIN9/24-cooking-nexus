import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Radio, Play, Users, Eye, Plus, Calendar, Bell } from "lucide-react";

interface Stream {
  id: string;
  title: string;
  description: string;
  status: "scheduled" | "live" | "ended";
  viewer_count: number;
  chef_name: string;
  scheduled_at?: string;
}

const mockStreams: Stream[] = [
  { id: "1", title: "Italian Pasta Masterclass", description: "Learn authentic Italian pasta from scratch", status: "live", viewer_count: 342, chef_name: "Chef Marco" },
  { id: "2", title: "Thai Street Food Night", description: "Recreating Bangkok's best street food", status: "live", viewer_count: 189, chef_name: "Chef Siri" },
  { id: "3", title: "Sushi Rolling Workshop", description: "Perfect your sushi rolling technique", status: "scheduled", viewer_count: 0, chef_name: "Chef Tanaka", scheduled_at: new Date(Date.now() + 86400000).toISOString() },
  { id: "4", title: "Baking Sourdough Bread", description: "48-hour sourdough process explained", status: "scheduled", viewer_count: 0, chef_name: "Chef Marie", scheduled_at: new Date(Date.now() + 172800000).toISOString() },
];

export default function LiveStreamPage() {
  const { user, profile } = useAuth();
  const [streams] = useState(mockStreams);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [watching, setWatching] = useState<string | null>(null);

  const liveStreams = streams.filter(s => s.status === "live");
  const scheduledStreams = streams.filter(s => s.status === "scheduled");

  const createStream = () => {
    if (!title) return;
    toast.success("Stream scheduled! You'll be notified when it's time to go live.");
    setTitle(""); setDescription(""); setShowCreate(false);
  };

  if (watching) {
    const stream = streams.find(s => s.id === watching);
    if (!stream) return null;
    return (
      <div className="space-y-4 animate-fade-up">
        <button onClick={() => setWatching(null)} className="text-sm text-primary hover:underline">← Back to streams</button>
        <div className="aspect-video rounded-2xl bg-espresso relative overflow-hidden flex items-center justify-center">
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/90 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
            <span className="text-xs font-medium text-primary-foreground">LIVE</span>
          </div>
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-espresso/60 backdrop-blur-sm">
            <Eye className="w-3 h-3 text-cream" />
            <span className="text-xs text-cream">{stream.viewer_count} watching</span>
          </div>
          <div className="text-center text-cream/60">
            <Radio className="w-16 h-16 mx-auto mb-4 animate-pulse" />
            <p className="text-lg font-display font-bold text-cream">{stream.title}</p>
            <p className="text-sm text-cream/60">by {stream.chef_name}</p>
            <p className="text-xs text-cream/40 mt-2">Live video stream — camera integration coming soon</p>
          </div>
        </div>
        <Card className="glass-card">
          <CardContent className="p-4">
            <h2 className="font-display font-bold text-lg">{stream.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{stream.description}</p>
            <p className="text-xs text-muted-foreground mt-2">Hosted by {stream.chef_name}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Live Cooking</h1>
        {profile?.account_type === "uploader" && (
          <Button onClick={() => setShowCreate(!showCreate)} className="gradient-primary text-primary-foreground">
            <Plus className="h-4 w-4 mr-2" /> Go Live
          </Button>
        )}
      </div>

      {showCreate && (
        <Card className="glass-card animate-fade-up">
          <CardContent className="p-4 space-y-3">
            <Input placeholder="Stream title" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="What will you be cooking?" value={description} onChange={e => setDescription(e.target.value)} />
            <Button onClick={createStream} disabled={!title} className="gradient-primary text-primary-foreground">Schedule Stream</Button>
          </CardContent>
        </Card>
      )}

      {liveStreams.length > 0 && (
        <div>
          <h2 className="text-lg font-display font-bold mb-3 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" /> Live Now
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {liveStreams.map(stream => (
              <Card key={stream.id} className="glass-card hover:shadow-glow transition-shadow cursor-pointer group" onClick={() => setWatching(stream.id)}>
                <div className="aspect-video rounded-t-lg bg-espresso relative overflow-hidden flex items-center justify-center">
                  <Radio className="w-12 h-12 text-cream/30 group-hover:text-primary transition-colors" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-destructive/90">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                    <span className="text-[10px] font-bold text-primary-foreground">LIVE</span>
                  </div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-espresso/60 backdrop-blur-sm">
                    <Eye className="w-3 h-3 text-cream" />
                    <span className="text-[10px] text-cream">{stream.viewer_count}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center"><Play className="w-6 h-6 text-primary-foreground ml-1" /></div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-bold">{stream.title}</h3>
                  <p className="text-sm text-muted-foreground">{stream.chef_name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {scheduledStreams.length > 0 && (
        <div>
          <h2 className="text-lg font-display font-bold mb-3 flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" /> Upcoming</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {scheduledStreams.map(stream => (
              <Card key={stream.id} className="glass-card">
                <CardContent className="p-4">
                  <h3 className="font-display font-bold">{stream.title}</h3>
                  <p className="text-sm text-muted-foreground">{stream.chef_name}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    📅 {stream.scheduled_at ? new Date(stream.scheduled_at).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "TBD"}
                  </p>
                  <Button variant="outline" className="mt-3 rounded-full text-xs" onClick={() => toast.success("Reminder set!")}>
                    <Bell className="h-3 w-3 mr-1" /> Remind Me
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
