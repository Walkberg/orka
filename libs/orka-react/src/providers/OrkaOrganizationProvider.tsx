import axios from '../api/client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { useOrka } from './OrkaProvider';
import { Organization, OrganizationNew } from '../api/orka-client';

type OrganizationContextType = {
  organizations: Organization[];
  currentOrganization?: Organization;
  createOrganization: (args: OrganizationNew) => Promise<void>;
  switchOrganization: (organizationId: string) => void;
};

const OrganizationContext = createContext<OrganizationContextType | undefined>(
  undefined
);

export const OrkaOrganizationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentOrganizationId, setCurrentOrganizationId] = useState<
    string | null
  >(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const { orkaClient } = useOrka();

  useEffect(() => {
    const fetchOrganizations = async () => {
      const orgs = await orkaClient.getUserOrganizations();

      console.log('Fetched organizations:', orgs);
      setOrganizations(orgs);
      if (orgs.length > 0) {
        setCurrentOrganizationId(orgs[0].id);
      }
    };
    fetchOrganizations();
  }, [orkaClient]);

  const createOrganization = async (args: OrganizationNew) => {
    const res = await orkaClient.createOrganization(args);
    setOrganizations((prev) => [...prev, res.data]);
  };

  const switchOrganization = (organizationId: string) => {
    setCurrentOrganizationId(organizationId);
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations,
        createOrganization,
        switchOrganization,
        currentOrganization: organizations.find(
          (org) => org.id === currentOrganizationId
        ),
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = () => {
  const ctx = useContext(OrganizationContext);

  if (!ctx) {
    throw new Error('useOrganization must be used within OrkaProvider');
  }

  return ctx;
};
