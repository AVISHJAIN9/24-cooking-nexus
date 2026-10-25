import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function PrivacyPage() {
  const [profilePublic, setProfilePublic] = useState(true);
  const [showEmail, setShowEmail] = useState(false);
  const [activityVisible, setActivityVisible] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
      <h1 className="text-2xl font-display font-bold">Privacy Controls</h1>
      <Card className="glass-card">
        <CardHeader><CardTitle className="font-display">Profile Visibility</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="profile-public">Public profile</Label>
            <Switch id="profile-public" checked={profilePublic} onCheckedChange={setProfilePublic} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-email">Show email to others</Label>
            <Switch id="show-email" checked={showEmail} onCheckedChange={setShowEmail} />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="activity">Activity visible to others</Label>
            <Switch id="activity" checked={activityVisible} onCheckedChange={setActivityVisible} />
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card">
        <CardHeader><CardTitle className="font-display">Data & Analytics</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Usage analytics</Label>
              <p className="text-xs text-muted-foreground">Help us improve by sharing anonymous usage data</p>
            </div>
            <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card border-destructive/30">
        <CardHeader><CardTitle className="font-display text-destructive">Data Management</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Download or delete your data. These actions may be irreversible.</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-secondary text-foreground text-sm hover:bg-secondary/80 transition-colors">Download My Data</button>
            <button className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm hover:bg-destructive/20 transition-colors">Delete All Data</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
