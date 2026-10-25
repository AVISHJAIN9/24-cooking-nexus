import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [accountType, setAccountType] = useState("viewer");
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate("/app", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password, displayName, accountType);
        toast.success("Account created!");
      } else {
        await signIn(email, password);
        toast.success("Welcome back!");
      }
      navigate("/app");
    } catch (err: any) {
      toast.error(err?.message || "Authentication failed");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold">{isSignUp ? "Join CookGrid" : "Welcome Back"}</h1>
          <p className="text-sm text-muted-foreground mt-1">{isSignUp ? "Create your chef account" : "Sign in to continue"}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="text-sm font-medium mb-1 block">Display Name</label>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" placeholder="Chef Gordon" required />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Account Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ value: "viewer", label: "👀 Viewer", desc: "Watch & interact" }, { value: "uploader", label: "🎬 Uploader", desc: "Upload videos & earn" }].map(t => (
                    <button key={t.value} type="button" onClick={() => setAccountType(t.value)}
                      className={`p-3 rounded-xl border text-left transition-colors ${accountType === t.value ? "border-primary bg-primary/5" : "border-input hover:border-primary/50"}`}>
                      <p className="text-sm font-medium">{t.label}</p>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" placeholder="chef@example.com" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-background border border-input text-sm" placeholder="••••••••" required />
          </div>
          <Button type="submit" className="w-full bg-primary text-primary-foreground rounded-full py-6 text-base font-semibold">
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary font-semibold hover:underline">
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
