import axios from '../api/client';
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import { OrkaAuthProvider } from './OrkaAuthProvider';
import { OrkaOrganizationProvider } from './OrkaOrganizationProvider';

type OrkaStatus = 'loading' | 'ready' | 'error' | 'degraded';

type OrkaContextType = {
  appName: string;
  status: OrkaStatus;
};

const AuthContext = createContext<OrkaContextType | undefined>(undefined);

export const OrkaProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<OrkaStatus>('loading');
  const [appName] = useState('Orka React Example');

  return (
    <AuthContext.Provider
      value={{
        appName,
        status,
      }}
    >
      <OrkaAuthProvider>
        <OrkaOrganizationProvider>{children}</OrkaOrganizationProvider>
      </OrkaAuthProvider>
    </AuthContext.Provider>
  );
};

export const useOrka = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
};
