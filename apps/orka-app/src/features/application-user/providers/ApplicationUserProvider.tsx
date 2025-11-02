import {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useOrka } from '@orka-react';
import {
  CreateApplicationUserRequest,
  ApplicationUser,
} from '@orka-react/api/orka-client';

export type UserSortBy = 'email' | 'lastname' | 'default';

export type CommandActionType = 'create-user' | 'go-dashboard' | 'search-user';

export interface ApplicationUserContextType {
  applicationUsers: ApplicationUser[];
  loading: boolean;
  searchTerm: string;
  sortBy: UserSortBy;
  isCreateModalOpen: boolean;
  isCommandPaletteOpen: boolean;
  newUserFormData: CreateApplicationUserRequest;
  showCreateModal: (show: boolean) => void;
  showCommandPalette: (show: boolean) => void;
  setNewUserFormData: (data: CreateApplicationUserRequest) => void;
  createUser: () => Promise<void>;
  updateUserForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateSearch: (search: string) => void;
  updateSortBy: (value: UserSortBy) => void;
  selectCommand: (command: CommandActionType) => void;
  loadUsers: () => Promise<void>;
}

export const ApplicationUserContext = createContext<
  ApplicationUserContextType | undefined
>(undefined);

export const useApplicationUser = () => {
  const context = useContext(ApplicationUserContext);
  if (context === undefined) {
    throw new Error(
      'useApplicationUser must be used within a ApplicationUserProvider'
    );
  }
  return context;
};

export function ApplicationUserProvider({ children }: { children: ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const { orkaClient } = useOrka();
  const navigate = useNavigate();

  const [applicationUsers, setApplicationUsers] = useState<ApplicationUser[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<UserSortBy>('default');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [newUserFormData, setNewUserFormData] =
    useState<CreateApplicationUserRequest>({
      appId: id ?? '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });

  // Effect for keyboard shortcut to open command palette
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault(); // Prevent default browser behavior
        setShowCommandPalette((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'e') {
        event.preventDefault(); // Prevent default browser behavior
        setShowCreateModal(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const loadUsers = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const fetchedUsers = await orkaClient.getAppUsers(id);
      setApplicationUsers(fetchedUsers || []);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }, [id, orkaClient]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleCreateUser = async () => {
    if (!id) return;
    try {
      await orkaClient.createAppUser({ ...newUserFormData });
      setShowCreateModal(false);
      setNewUserFormData({
        appId: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      loadUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewUserFormData((prev: CreateApplicationUserRequest) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (saerch: string) => {
    setSearchTerm(saerch);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as UserSortBy);
  };

  const handleCommandSelect = useCallback(
    (command: string) => {
      switch (command) {
        case 'create-user':
          setShowCreateModal(true);
          setShowCommandPalette(false);
          break;
        case 'go-dashboard':
          navigate('/app');
          setShowCommandPalette(false);
          break;
        case 'search-user':
          document.getElementById('user-search-input')?.focus();
          setShowCommandPalette(false);
          break;
        default:
          setShowCommandPalette(false);
      }
    },
    [navigate, id, setShowCreateModal, setShowCommandPalette]
  );

  const contextValue: ApplicationUserContextType = {
    applicationUsers,
    loading,
    searchTerm,
    sortBy,
    isCreateModalOpen: showCreateModal,
    isCommandPaletteOpen: showCommandPalette,
    newUserFormData,
    showCreateModal: setShowCreateModal,
    showCommandPalette: setShowCommandPalette,
    setNewUserFormData,
    createUser: handleCreateUser,
    updateUserForm: handleInputChange,
    updateSearch: handleSearchChange,
    updateSortBy: handleSortChange,
    selectCommand: handleCommandSelect,
    loadUsers,
  };

  return (
    <ApplicationUserContext.Provider value={contextValue}>
      {children}
    </ApplicationUserContext.Provider>
  );
}
