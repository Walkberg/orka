import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { useParams } from 'react-router-dom';
import { useOrka } from '@orka-react';
import { Organization, OrganizationNew } from '@orka-react/api/orka-client';

export type OrganizationSortBy = 'name' | 'createdAt' | 'default';

export type OrganizationCreatedCallback = (organization: Organization) => void;

interface ApplicationOrganizationsContextType {
  organizations: Organization[];
  loading: boolean;
  searchTerm: string;
  sortBy: OrganizationSortBy;
  updateSearch: (search: string) => void;
  updateSortBy: (value: OrganizationSortBy) => void;
  createOrganization: (
    organizationNew: OrganizationNew,
    cb: OrganizationCreatedCallback
  ) => Promise<void>;
}

const ApplicationOrganizationsContext = createContext<
  ApplicationOrganizationsContextType | undefined
>(undefined);

export function ApplicationOrganizationsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { id: applicationId } = useParams<{ id: string }>();
  const { orkaClient } = useOrka();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<OrganizationSortBy>('default');

  useEffect(() => {
    loadOrganizations();
  }, [applicationId]);

  const loadOrganizations = async () => {
    if (!applicationId) return;

    setLoading(true);
    try {
      const fetchedOrgs = await orkaClient.getApplicationOrganizations({
        applicationId,
      });
      setOrganizations(fetchedOrgs || []);
    } catch (error) {
      console.error('Error loading organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrganization = async (
    organizationNew: OrganizationNew,
    onOrganizationCreated: (organization: Organization) => void
  ) => {
    if (!applicationId) return;

    try {
      const organization = await orkaClient.createOrganization(organizationNew);
      onOrganizationCreated(organization);
      loadOrganizations();
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  };

  const updateSearch = (search: string) => {
    setSearchTerm(search);
  };

  const updateSortBy = (value: OrganizationSortBy) => {
    setSortBy(value);
  };

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org.description &&
        org.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'createdAt') {
      return a.name.localeCompare(b.name);
      //return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return 0;
  });

  const contextValue: ApplicationOrganizationsContextType = {
    organizations: sortedOrganizations,
    loading,
    searchTerm,
    sortBy,
    updateSearch,
    updateSortBy,
    createOrganization: handleCreateOrganization,
  };

  return (
    <ApplicationOrganizationsContext.Provider value={contextValue}>
      {children}
    </ApplicationOrganizationsContext.Provider>
  );
}

export const useApplicationOrganizations = () => {
  const context = useContext(ApplicationOrganizationsContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationOrganizations must be used within a ApplicationOrganizationsProvider'
    );
  }
  return context;
};
