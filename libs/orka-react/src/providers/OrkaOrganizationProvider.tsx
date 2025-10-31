import axios from '../api/client';
import { createContext, useContext, useState, type ReactNode } from 'react';

type Organization = {
  id: string;
  name: string;
  description?: string;
};

interface CreateOrganizationType {
  name: string;
  description?: string;
}

type OrganizationContextType = {
  organizations: Organization[];
  currentOrganization?: Organization;
  createOrganization: (args: CreateOrganizationType) => Promise<void>;
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

  const createOrganization = async (args: CreateOrganizationType) => {
    const res = await axios.post('/organizations', args);
    setOrganizations((prev) => [...prev, res.data]);
  };

  const switchOrganization = (organizationId: string) => {
    setCurrentOrganizationId(organizationId);
  };

  return (
    <OrganizationContext.Provider
      value={{ organizations, createOrganization, switchOrganization }}
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
