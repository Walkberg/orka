import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Application, useOrka } from '@orka-react'; // Assuming this is the correct import path

export interface ApplicationsContextType {
  applications: Application[];
  loading: boolean;
  showCreateModal: boolean;
  setShowCreateModal: (show: boolean) => void;
  createApplication: (name: string) => Promise<void>;
}

const ApplicationsContext = createContext<ApplicationsContextType | undefined>(
  undefined
);

export function ApplicationsProvider({ children }: { children: ReactNode }) {
  const { orkaClient } = useOrka();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const apps = await orkaClient.getUserApplications();
      setApplications(apps);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApplication = async (name: string) => {
    try {
      await orkaClient.createApplications({ name });
      setShowCreateModal(false);
      loadApplications();
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const contextValue: ApplicationsContextType = {
    applications,
    loading,
    showCreateModal,
    setShowCreateModal,
    createApplication: handleCreateApplication,
  };

  return (
    <ApplicationsContext.Provider value={contextValue}>
      {children}
    </ApplicationsContext.Provider>
  );
}

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error(
      'useApplications must be used within a ApplicationsProvider'
    );
  }
  return context;
};
