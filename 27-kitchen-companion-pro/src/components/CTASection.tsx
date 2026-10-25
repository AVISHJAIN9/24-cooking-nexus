import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const CTASection = () => {
  const { user } = useAuth();

  return (
    <section className="py-20 md:py-28 bg-primary/5">
      <div className="container px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">Ready to Start <span className="text-gradient-warm italic">Cooking</span>?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">Join thousands of home chefs sharing their passion through short-form video recipes.</p>
        <div className="flex justify-center gap-4">
          <Link to={user ? "/app" : "/login"}>
            <Button className="bg-primary text-primary-foreground rounded-full px-8 py-6 text-base">
              {user ? "Open App" : "Get Started Free"}
            </Button>
          </Link>
          <Link to="/reels"><Button variant="outline" className="rounded-full px-8 py-6 text-base">Browse Reels</Button></Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
