import axios from '../api/client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { useOrka } from './OrkaProvider';
import { LoginRequest, RegisterRequest, User } from '../api/orka-client';

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (args: LoginRequest) => Promise<void>;
  logout: () => void;
  isSignedIn: boolean;
  signup: (args: RegisterRequest) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const OrkaAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  const { orkaClient } = useOrka();

  useEffect(() => {
    if (token) {
      orkaClient.setToken(token);
      console.log('Fetching profile with token:', token);
      orkaClient.getProfile().then((profile) => {
        setUser(profile);
      });
    }
  }, [token]);

  const login = async (args: LoginRequest) => {
    const { token, user } = await orkaClient.login(args);

    localStorage.setItem('token', token);

    setToken(token);
    setUser(user);
  };

  const signup = async (args: RegisterRequest) => {
    await orkaClient.register(args);
  };

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isSignedIn: !!token,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
};
