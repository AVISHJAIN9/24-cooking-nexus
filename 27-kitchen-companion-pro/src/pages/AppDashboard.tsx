import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { UtensilsCrossed, ShoppingBasket, CalendarDays, CheckSquare, MessageSquare, Users, Apple, ShoppingCart, Heart, BookOpen } from "lucide-react";

export default function DashboardPage() {
  const { user, profile } = useAuth();

  const stats = [
    { label: "My Recipes", value: JSON.parse(localStorage.getItem("cookgrid_user_recipes") || "[]").length, icon: UtensilsCrossed, color: "text-primary", href: "/app/recipes" },
    { label: "Favorites", value: JSON.parse(localStorage.getItem("cookgrid_favorites") || "[]").length, icon: Heart, color: "text-destructive", href: "/app/favorites" },
    { label: "Inventory Items", value: JSON.parse(localStorage.getItem("cookgrid_kitchen_items") || "[]").length, icon: ShoppingBasket, color: "text-accent", href: "/app/kitchen" },
    { label: "Meal Plans", value: JSON.parse(localStorage.getItem("cookgrid_meal_plans") || "[]").length, icon: CalendarDays, color: "text-warning", href: "/app/meal-planner" },
    { label: "Checklists", value: JSON.parse(localStorage.getItem("cookgrid_checklists") || "[]").length, icon: CheckSquare, color: "text-success", href: "/app/checklists" },
    { label: "Shopping Lists", value: JSON.parse(localStorage.getItem("cookgrid_shopping_lists") || "[]").length, icon: ShoppingCart, color: "text-herb", href: "/app/shopping" },
  ];

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {profile?.display_name || user?.email?.split("@")[0]}</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map(stat => (
          <Link key={stat.label} to={stat.href}>
            <Card className="glass-card hover:shadow-glow transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2"><stat.icon className={`h-5 w-5 ${stat.color}`} /></div>
                <p className="text-2xl font-display font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="glass-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-display font-bold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: "Add a recipe", href: "/app/recipes", icon: UtensilsCrossed },
                { label: "Track nutrition", href: "/app/nutrition", icon: Apple },
                { label: "Shopping list", href: "/app/shopping", icon: ShoppingCart },
                { label: "Favorites", href: "/app/favorites", icon: Heart },
                { label: "Cooking journal", href: "/app/journal", icon: BookOpen },
                { label: "Share recipes", href: "/app/share", icon: MessageSquare },
                { label: "Plan meals", href: "/app/meal-planner", icon: CalendarDays },
                { label: "Chat with AI", href: "/app/ai-chat", icon: MessageSquare },
              ].map(action => (
                <Link key={action.label} to={action.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                  <action.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{action.label}</span>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-display font-bold mb-4">Getting Started</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>✨ Add your favorite recipes to your personal cookbook</p>
              <p>📦 Track your kitchen inventory and expiry dates</p>
              <p>📅 Plan your meals for the week</p>
              <p>✅ Create shopping lists and cooking checklists</p>
              <p>⏱️ Use kitchen timers while cooking</p>
              <p>🤖 Ask the AI assistant for cooking help</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
