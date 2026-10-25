import { useState, createContext, useContext, useEffect, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Profile {
  user_id: string;
  display_name: string;
  avatar_url: string;
  account_type: "viewer" | "uploader";
  bio?: string;
  is_public?: boolean;
}

interface LocalUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: LocalUser | null;
  session: any;
  profile: Profile | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string, accountType: string) => Promise<void>;
  signOut: () => Promise<void>;
  isDark: boolean;
  toggleDark: () => void;
  loading: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};

const USERS_KEY = "cookgrid_users";
const SESSION_KEY = "cookgrid_session";

interface StoredUser {
  id: string;
  email: string;
  password: string;
  display_name: string;
  account_type: string;
}

function getStoredUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); } catch { return []; }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("cookgrid_dark") === "true");
  const [user, setUser] = useState<LocalUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      try {
        const sess = JSON.parse(stored);
        setUser({ id: sess.id, email: sess.email });
        setProfile({
          user_id: sess.id,
          display_name: sess.display_name || sess.email,
          avatar_url: "",
          account_type: (sess.account_type as "viewer" | "uploader") || "viewer",
        });
      } catch {}
    }
    setLoading(false);
  }, []);

  const toggleDark = () => {
    setIsDark(prev => {
      localStorage.setItem("cookgrid_dark", String(!prev));
      return !prev;
    });
  };

  const signIn = useCallback(async (email: string, password: string) => {
    const users = getStoredUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    setUser({ id: found.id, email: found.email });
    setProfile({
      user_id: found.id,
      display_name: found.display_name,
      avatar_url: "",
      account_type: found.account_type as "viewer" | "uploader",
    });
    localStorage.setItem(SESSION_KEY, JSON.stringify(found));
  }, []);

  const signUp = useCallback(async (email: string, password: string, displayName: string, accountType: string) => {
    const users = getStoredUsers();
    if (users.find(u => u.email === email)) throw new Error("An account with this email already exists");
    const newUser: StoredUser = { id: crypto.randomUUID(), email, password, display_name: displayName, account_type: accountType };
    saveStoredUsers([...users, newUser]);
    setUser({ id: newUser.id, email });
    setProfile({ user_id: newUser.id, display_name: displayName, avatar_url: "", account_type: accountType as "viewer" | "uploader" });
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(SESSION_KEY);
    navigate("/");
  }, [navigate]);

  const updateProfile = useCallback(async (updates: Partial<Profile>) => {
    setProfile(prev => prev ? { ...prev, ...updates } : null);
    if (user) {
      const users = getStoredUsers();
      const idx = users.findIndex(u => u.id === user.id);
      if (idx >= 0) {
        if (updates.display_name) users[idx].display_name = updates.display_name;
        if (updates.account_type) users[idx].account_type = updates.account_type;
        saveStoredUsers(users);
        const sess = JSON.parse(localStorage.getItem(SESSION_KEY) || "{}");
        localStorage.setItem(SESSION_KEY, JSON.stringify({ ...sess, ...updates }));
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, session: user ? {} : null, profile, signIn, signUp, signOut, isDark, toggleDark, loading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
