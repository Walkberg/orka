import { useParams } from 'react-router-dom';
import { UserListHeader } from '../components/UserListHeader';
import { UserTable } from '../components/UserTable';
import { CreateUserModal } from '../components/CreateUserModal';
import { CommandPalette } from '../components/CommandPalette';
import { ApplicationUserProvider } from '../providers/ApplicationUserProvider';

export function AppUsersPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <ApplicationUserProvider>
      <div className="space-y-6 p-6">
        <h2 className="text-2xl font-bold">Users for Application: {id}</h2>
        <UserListHeader />
        <UserTable />
        <CreateUserModal />
        <CommandPalette />
      </div>
    </ApplicationUserProvider>
  );
}
