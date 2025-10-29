import axios from '../api/client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (args: LoginType) => Promise<void>;
  logout: () => void;
  isSignedIn: boolean;
  signup: (args: SignupType) => Promise<void>;
};

interface LoginType {
  email: string;
  password: string;
}

interface SignupType {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const OrkaAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (args: LoginType) => {
    const res = await axios.post('/auth/login', args);

    const { accessToken } = res.data;

    localStorage.setItem('token', accessToken);

    setToken(accessToken);
  };

  const signup = async (args: SignupType) => {
    //todo('implement signup');
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
        isSignedIn: !!user,
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
