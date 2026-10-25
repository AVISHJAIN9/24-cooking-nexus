import { ChefHat } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <ChefHat className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold">CookGrid</span>
        </Link>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link to="/reels" className="hover:text-foreground transition-colors">Reels</Link>
          <Link to="/ai-kitchen" className="hover:text-foreground transition-colors">AI Kitchen</Link>
          <Link to="/ghost-chef" className="hover:text-foreground transition-colors">Ghost Chef</Link>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 CookGrid. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
