// Manages user authentication state for the entire app
// "context" in React is a away to store data globally without passing props down throgh every component (props drilling)

import toast from "react-hot-toast";
import api from "../services/api";
import type { User } from "../types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// AuthContext stores:
// 1. The current looged-in user (or null if not looged in)
// 2. login/logout/register functions
// 3. Loading state while checking authentication

// -- Define what the context will provide -----
// This interface describes all the values/funtions AuthContext shares
interface AuthContextType {
  user: User | null; // null if not logged in
  loading: boolean; // True while checking localStorage on mount
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updateUser: Partial<User>) => void; // Update user data locally
}

// create the context with undefined as dfault value
// (the real value is provided by AuthProvider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// -----Authprovider Component -----
// Wrap your app in this to make auth data available everywhere
interface AuthProviderProps {
  children: ReactNode; // Everything nexted inside <AuthProvider>
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // user state - null means not logged-in
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ---- Load user from localStorage on app start ---
  // localStorage persists data across browser session (survive page retrive)
  useEffect(() => {
    const userStr = localStorage.getItem("audiophile-user");
    if (userStr) {
      try {
        const savedUser: User = JSON.parse(userStr);
        setUser(savedUser);
      } catch (error) {
        // if json parse fails (corrupted data), clear it
        localStorage.removeItem("audiophile-user");
      }
    }
    setLoading(false);
  }, []);

  // ----------- LOGIN ---------
  // Return true if login succeeded, false if it failed
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // POST /api/auth/login
      const { data } = await api.post<User>("/auth/login", { email, password });

      // save user to state and localStorage
      setUser(data);
      localStorage.setItem("audiophile-user", JSON.stringify(data));

      toast.success(`Welcome back, ${data.name}! 🎧`);
      return true;
    } catch (error: any) {
      // error.response?.data?.message is the message from our Express server
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
      return false;
    }
  };

  // --- Register ------

  // Return true if registration succeeded, false if it failed
  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { data } = await api.post<User>("/auth/register", {
        name,
        email,
        password,
      });

      setUser(data);
      localStorage.setItem("audiophile-user", JSON.stringify(data));

      toast.success(`Welcome to Audiopile, ${data.name}! 🎉`);
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || "Registration failed";
      toast.error(message);
      return false;
    }
  };
  // --- LOGOUT-
  const logout = (): void => {
    setUser(null);
    localStorage.removeItem("audiophile-user");
    toast.success("Logged out successfully");
  };

  // - UPDATE USER (LOCAL ONLY)-----
  // Used after profile update - refreshes data in context without re-fetching

  const updateUser = (updatedData: Partial<User>): void => {
    if (user) {
      const updated = { ...user, ...updatedData };
      setUser(updated);
      localStorage.setItem("audiophile-user", JSON.stringify(updated));
    }
  };

  // -------- Provide the context values to all children ---
  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// --- CUSTOM HOOK FOR AUTHCONTENT ------
// This hook makes it easy to use AuthContext in any componet
// const {user, login, logout etc} useAuth()
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Safety check - useAuth must be used inside AuthProvider
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
export default AuthContext;
