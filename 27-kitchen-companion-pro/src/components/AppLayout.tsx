import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  ChefHat, LayoutDashboard, UtensilsCrossed, ShoppingBasket, CalendarDays,
  CheckSquare, MessageSquare, Users, Settings, LogOut, Shield, Scale, Moon, Sun,
  Apple, ShoppingCart, Heart, Share2, BookOpen, Radio, Search, Import, Bell,
  FolderHeart, Menu, X
} from "lucide-react";

const viewerNavItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/favorites", label: "Favorites", icon: Heart },
  { path: "/app/collections", label: "Collections", icon: FolderHeart },
  { path: "/app/kitchen", label: "Kitchen Inventory", icon: ShoppingBasket },
  { path: "/app/meal-planner", label: "Meal Planner", icon: CalendarDays },
  { path: "/app/nutrition", label: "Nutrition Tracker", icon: Apple },
  { path: "/app/shopping", label: "Shopping Lists", icon: ShoppingCart },
  { path: "/app/checklists", label: "Equipment Checklist", icon: CheckSquare },
  { path: "/app/converter", label: "Unit Converter", icon: Scale },
  { path: "/app/journal", label: "Cooking Journal", icon: BookOpen },
  { path: "/app/social", label: "Social Feed", icon: Users },
  { path: "/app/search", label: "Global Search", icon: Search },
  { path: "/app/ai-chat", label: "AI Assistant", icon: MessageSquare },
  { path: "/app/notifications", label: "Notifications", icon: Bell },
  { path: "/app/privacy", label: "Privacy", icon: Shield },
  { path: "/app/settings", label: "Settings", icon: Settings },
];

const uploaderNavItems = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/recipes", label: "My Recipes", icon: UtensilsCrossed },
  { path: "/app/favorites", label: "Favorites", icon: Heart },
  { path: "/app/collections", label: "Collections", icon: FolderHeart },
  { path: "/app/kitchen", label: "Kitchen Inventory", icon: ShoppingBasket },
  { path: "/app/meal-planner", label: "Meal Planner", icon: CalendarDays },
  { path: "/app/nutrition", label: "Nutrition Tracker", icon: Apple },
  { path: "/app/shopping", label: "Shopping Lists", icon: ShoppingCart },
  { path: "/app/checklists", label: "Equipment Checklist", icon: CheckSquare },
  { path: "/app/converter", label: "Unit Converter", icon: Scale },
  { path: "/app/journal", label: "Cooking Journal", icon: BookOpen },
  { path: "/app/import", label: "Import Recipes", icon: Import },
  { path: "/app/share", label: "Share & Export", icon: Share2 },
  { path: "/app/social", label: "Social Feed", icon: Users },
  { path: "/app/live", label: "Live Streams", icon: Radio },
  { path: "/app/search", label: "Global Search", icon: Search },
  { path: "/app/ai-chat", label: "AI Assistant", icon: MessageSquare },
  { path: "/app/notifications", label: "Notifications", icon: Bell },
  { path: "/app/privacy", label: "Privacy", icon: Shield },
  { path: "/app/settings", label: "Settings", icon: Settings },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { user, profile, signOut, isDark, toggleDark } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isUploader = profile?.account_type === "uploader";
  const navItems = isUploader ? uploaderNavItems : viewerNavItems;

  const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      <div className="p-4 flex items-center gap-3 border-b border-border">
        <Link to="/" className="flex items-center gap-3" onClick={onNavigate}>
          <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center">
            <ChefHat className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-lg">CookGrid</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} onClick={onNavigate}
            className={cn("flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
              pathname === item.path ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            )}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <button onClick={toggleDark} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary w-full transition-all">
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex items-center gap-3 px-3 py-2 mb-2 mt-2">
          <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            {(profile?.display_name || user?.email || "?").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm truncate block">{profile?.display_name || user?.email}</span>
            <span className="text-xs text-muted-foreground capitalize">{profile?.account_type || "viewer"}</span>
          </div>
        </div>
        <button onClick={signOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 w-full transition-all">
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/50 backdrop-blur-xl flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border flex flex-col animate-fade-up">
            <div className="absolute right-3 top-3 z-10">
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground p-1"><X className="h-5 w-5" /></button>
            </div>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card/50">
          <button onClick={() => setMobileOpen(true)} className="text-muted-foreground p-1">
            <Menu className="h-6 w-6" />
          </button>
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <ChefHat className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold">CookGrid</span>
          </Link>
          <div className="flex items-center gap-1">
            <button onClick={toggleDark} className="text-muted-foreground p-2">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
