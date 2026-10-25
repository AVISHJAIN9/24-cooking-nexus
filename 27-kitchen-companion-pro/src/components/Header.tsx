import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChefHat, Moon, Sun, MoreVertical, LayoutDashboard, UtensilsCrossed, Heart, FolderHeart, ShoppingBasket, CalendarDays, Apple, ShoppingCart, CheckSquare, Timer, Scale, BookOpen, Import, Share2, Users, Radio, Search, MessageSquare, Bell, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const allFeatures = [
  { path: "/app", label: "Dashboard", icon: LayoutDashboard },
  { path: "/app/recipes", label: "My Recipes", icon: UtensilsCrossed },
  { path: "/app/favorites", label: "Favorites", icon: Heart },
  { path: "/app/collections", label: "Collections", icon: FolderHeart },
  { path: "/app/kitchen", label: "Kitchen Inventory", icon: ShoppingBasket },
  { path: "/app/meal-planner", label: "Meal Planner", icon: CalendarDays },
  { path: "/app/nutrition", label: "Nutrition Tracker", icon: Apple },
  { path: "/app/shopping", label: "Shopping Lists", icon: ShoppingCart },
  { path: "/app/checklists", label: "Checklists", icon: CheckSquare },
  { path: "/app/timer", label: "Kitchen Timer", icon: Timer },
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

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const { user, profile, signOut, isDark, toggleDark } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { label: "Discover", href: "/" },
    { label: "Reels", href: "/reels" },
    { label: "AI Kitchen", href: "/ai-kitchen" },
    { label: "Ghost Chef", href: "/ghost-chef" },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30">
      <div className="container flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center group-hover:scale-105 transition-transform">
            <ChefHat className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Cook<span className="text-gradient-warm">Grid</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleDark} className="text-muted-foreground">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          {/* Three-dot menu for all features */}
          <div className="relative">
            <Button variant="ghost" size="icon" onClick={() => setFeaturesOpen(!featuresOpen)} className="text-muted-foreground">
              <MoreVertical className="w-5 h-5" />
            </Button>
            {featuresOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setFeaturesOpen(false)} />
                <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-xl z-50 max-h-[70vh] overflow-y-auto p-2">
                  <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">All Features</p>
                  {allFeatures.map(item => (
                    <Link key={item.path} to={item.path} onClick={() => setFeaturesOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t border-border mt-2 pt-2">
                    <Link to="/reels" onClick={() => setFeaturesOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary">
                      📱 Reels Feed
                    </Link>
                    <Link to="/ai-kitchen" onClick={() => setFeaturesOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary">
                      🤖 AI Kitchen
                    </Link>
                    <Link to="/ghost-chef" onClick={() => setFeaturesOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary">
                      👻 Ghost Chef
                    </Link>
                  </div>
                  {user && (
                    <div className="border-t border-border mt-2 pt-2">
                      <Link to="/dashboard" onClick={() => setFeaturesOpen(false)} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary">
                        👤 My Profile
                      </Link>
                      <button onClick={() => { setFeaturesOpen(false); handleSignOut(); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-destructive hover:bg-destructive/10 w-full text-left">
                        🚪 Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {user ? (
            <Link to="/app">
              <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">Open App</Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6">Sign In</Button>
            </Link>
          )}

          <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl animate-fade-up">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors" onClick={() => setMobileOpen(false)}>
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/app" className="px-4 py-3 text-sm font-medium text-primary" onClick={() => setMobileOpen(false)}>Open App</Link>
                <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="px-4 py-3 text-sm font-medium text-destructive text-left">Sign Out</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <Button className="mt-3 w-full bg-primary text-primary-foreground rounded-full">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
