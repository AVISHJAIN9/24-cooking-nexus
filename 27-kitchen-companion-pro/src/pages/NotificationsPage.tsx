import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Check } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

const NOTIF_KEY = "cookgrid_notifications";

function getStoredNotifs(): Notification[] {
  try { return JSON.parse(localStorage.getItem(NOTIF_KEY) || "[]"); } catch { return []; }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(getStoredNotifs);

  const save = (n: Notification[]) => { setNotifications(n); localStorage.setItem(NOTIF_KEY, JSON.stringify(n)); };
  const markRead = (id: string) => save(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => { save(notifications.map(n => ({ ...n, read: true }))); toast.success("All marked as read"); };

  const enableNotifications = async () => {
    if ("Notification" in window) {
      const perm = await window.Notification.requestPermission();
      if (perm === "granted") toast.success("Push notifications enabled!");
      else toast.error("Notifications blocked by browser");
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Notifications</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={enableNotifications}><Bell className="h-4 w-4 mr-1" /> Enable Push</Button>
          {unreadCount > 0 && <Button variant="outline" size="sm" onClick={markAllRead}><Check className="h-4 w-4 mr-1" /> Mark All Read</Button>}
        </div>
      </div>
      {notifications.length === 0 ? (
        <Card className="glass-card"><CardContent className="p-8 text-center">
          <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No notifications yet</p>
          <p className="text-xs text-muted-foreground mt-1">You'll be notified about likes, follows, and reminders.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-2">
          {notifications.map(notif => (
            <Card key={notif.id} className={`glass-card transition-all cursor-pointer ${!notif.read ? "border-primary/30 shadow-glow" : "opacity-70"}`} onClick={() => markRead(notif.id)}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.read ? "bg-muted" : "bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{notif.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(notif.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
