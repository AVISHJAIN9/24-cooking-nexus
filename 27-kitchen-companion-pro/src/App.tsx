import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ReelsFeed from "./pages/ReelsFeed";
import RecipeDetail from "./pages/RecipeDetail";
import WatchVideo from "./pages/WatchVideo";
import AIKitchen from "./pages/AIKitchen";
import GhostChefComparison from "./pages/GhostChefComparison";
import AppDashboard from "./pages/AppDashboard";
import RecipesPage from "./pages/RecipesPage";
import KitchenPage from "./pages/KitchenPage";
import MealPlannerPage from "./pages/MealPlannerPage";
import ChecklistsPage from "./pages/ChecklistsPage";
import TimerPage from "./pages/TimerPage";
import ConverterPage from "./pages/ConverterPage";
import SocialPage from "./pages/SocialPage";
import AiChatPage from "./pages/AiChatPage";
import PrivacyPage from "./pages/PrivacyPage";
import SettingsPage from "./pages/SettingsPage";
import NutritionTrackerPage from "./pages/NutritionTrackerPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import FavoritesPage from "./pages/FavoritesPage";
import RecipeSharePage from "./pages/RecipeSharePage";
import CookingJournalPage from "./pages/CookingJournalPage";
import LiveStreamPage from "./pages/LiveStreamPage";
import GlobalSearchPage from "./pages/GlobalSearchPage";
import UserProfilePage from "./pages/UserProfilePage";
import RecipeImportPage from "./pages/RecipeImportPage";
import NotificationsPage from "./pages/NotificationsPage";
import RecipeCollectionsPage from "./pages/RecipeCollectionsPage";
import UserDashboard from "./pages/UserDashboard";
import UploaderDashboard from "./pages/UploaderDashboard";

const queryClient = new QueryClient();

const Protected = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute><AppLayout>{children}</AppLayout></ProtectedRoute>
);

const ProtectedPage = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes - only landing and login */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />

            {/* All other routes require login */}
            <Route path="/reels" element={<ProtectedPage><ReelsFeed /></ProtectedPage>} />
            <Route path="/recipe/:id" element={<ProtectedPage><RecipeDetail /></ProtectedPage>} />
            <Route path="/watch/:id" element={<ProtectedPage><WatchVideo /></ProtectedPage>} />
            <Route path="/ai-kitchen" element={<ProtectedPage><AIKitchen /></ProtectedPage>} />
            <Route path="/ghost-chef" element={<ProtectedPage><GhostChefComparison /></ProtectedPage>} />
            <Route path="/profile/:userId" element={<ProtectedPage><UserProfilePage /></ProtectedPage>} />
            <Route path="/dashboard" element={<ProtectedPage><UserDashboard /></ProtectedPage>} />
            <Route path="/uploader" element={<ProtectedPage><UploaderDashboard /></ProtectedPage>} />

            {/* Protected app routes with sidebar layout */}
            <Route path="/app" element={<Protected><AppDashboard /></Protected>} />
            <Route path="/app/recipes" element={<Protected><RecipesPage /></Protected>} />
            <Route path="/app/kitchen" element={<Protected><KitchenPage /></Protected>} />
            <Route path="/app/meal-planner" element={<Protected><MealPlannerPage /></Protected>} />
            <Route path="/app/checklists" element={<Protected><ChecklistsPage /></Protected>} />
            <Route path="/app/timer" element={<Protected><TimerPage /></Protected>} />
            <Route path="/app/converter" element={<Protected><ConverterPage /></Protected>} />
            <Route path="/app/social" element={<Protected><SocialPage /></Protected>} />
            <Route path="/app/ai-chat" element={<Protected><AiChatPage /></Protected>} />
            <Route path="/app/privacy" element={<Protected><PrivacyPage /></Protected>} />
            <Route path="/app/settings" element={<Protected><SettingsPage /></Protected>} />
            <Route path="/app/nutrition" element={<Protected><NutritionTrackerPage /></Protected>} />
            <Route path="/app/shopping" element={<Protected><ShoppingListPage /></Protected>} />
            <Route path="/app/favorites" element={<Protected><FavoritesPage /></Protected>} />
            <Route path="/app/share" element={<Protected><RecipeSharePage /></Protected>} />
            <Route path="/app/journal" element={<Protected><CookingJournalPage /></Protected>} />
            <Route path="/app/live" element={<Protected><LiveStreamPage /></Protected>} />
            <Route path="/app/search" element={<Protected><GlobalSearchPage /></Protected>} />
            <Route path="/app/import" element={<Protected><RecipeImportPage /></Protected>} />
            <Route path="/app/notifications" element={<Protected><NotificationsPage /></Protected>} />
            <Route path="/app/collections" element={<Protected><RecipeCollectionsPage /></Protected>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
