import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { User, ChefHat } from "lucide-react";
import Header from "@/components/Header";

export default function UserProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { user, profile } = useAuth();

  const isOwnProfile = user?.id === userId;
  const displayProfile = isOwnProfile ? profile : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container px-4 md:px-8 pb-12 max-w-3xl">
        <Card className="glass-card overflow-hidden">
          <div className="h-32 gradient-primary" />
          <CardContent className="p-6 -mt-12">
            <div className="flex items-end gap-4 mb-4">
              <div className="w-24 h-24 rounded-full bg-card border-4 border-card flex items-center justify-center">
                <div className="w-full h-full rounded-full gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  {(displayProfile?.display_name || "?").charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-display font-bold">{displayProfile?.display_name || "User"}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              {displayProfile?.account_type === "uploader" ? <><ChefHat className="h-4 w-4" /> Content Creator</> : <><User className="h-4 w-4" /> Home Chef</>}
            </p>
            <div className="flex gap-6 mt-4">
              <div className="text-center"><p className="text-xl font-display font-bold">0</p><p className="text-xs text-muted-foreground">Followers</p></div>
              <div className="text-center"><p className="text-xl font-display font-bold">0</p><p className="text-xs text-muted-foreground">Following</p></div>
              <div className="text-center"><p className="text-xl font-display font-bold">0</p><p className="text-xs text-muted-foreground">Recipes</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
