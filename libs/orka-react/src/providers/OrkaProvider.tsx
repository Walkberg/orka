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
import { IOrkaClient } from '../api/orka-client';
import { OrkaClientImpl } from '../api/orka-client.impls';

type OrkaStatus = 'loading' | 'ready' | 'error' | 'degraded';

type OrkaContextType = {
  appName: string;
  status: OrkaStatus;
  orkaClient: IOrkaClient;
};

const AuthContext = createContext<OrkaContextType | undefined>(undefined);

export const OrkaProvider = ({
  children,
  publishableKey,
}: {
  children: ReactNode;
  publishableKey: string;
}) => {
  const [status, setStatus] = useState<OrkaStatus>('loading');
  const [appName] = useState('Orka React Example');
  const [orkaClient] = useState<IOrkaClient>(
    new OrkaClientImpl(publishableKey)
  );

  return (
    <AuthContext.Provider
      value={{
        appName,
        status,
        orkaClient,
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
