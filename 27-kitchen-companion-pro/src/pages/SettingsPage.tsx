import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, profile, signOut, updateProfile } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [bio, setBio] = useState(profile?.bio || "");

  useEffect(() => {
    if (profile) { setDisplayName(profile.display_name || ""); setBio(profile.bio || ""); }
  }, [profile]);

  const saveProfile = async () => {
    if (user) {
      await updateProfile({ display_name: displayName, bio } as any);
      toast.success("Profile updated!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Settings</h1>
      <Card className="glass-card">
        <CardHeader><CardTitle className="font-display">Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Email</Label><Input value={user?.email || ""} disabled className="opacity-60" /></div>
          <div className="space-y-2"><Label>Display Name</Label><Input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your name" /></div>
          <div className="space-y-2"><Label>Bio</Label><Textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Tell us about yourself..." /></div>
          <Button onClick={saveProfile} className="gradient-primary text-primary-foreground">Save Changes</Button>
        </CardContent>
      </Card>
      <Card className="glass-card border-destructive/30">
        <CardHeader><CardTitle className="font-display text-destructive">Danger Zone</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Sign out or manage your account.</p>
          <Button variant="destructive" onClick={signOut}>Sign Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}
