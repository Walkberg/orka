import axios from "@/api/client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isSignedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const OrkaProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/users/me");
      setUser(res.data);
    } catch {
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    const res = await axios.post("/auth/login", { email, password });

    const { accessToken } = res.data;

    localStorage.setItem("token", accessToken);

    setToken(accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isSignedIn: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
};
