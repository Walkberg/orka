import { Link, useNavigate } from 'react-router-dom';
import { CreateApplication } from '../components/CreateApplication';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
} from '@walkberg-ui';
import {
  ApplicationsProvider,
  useApplications,
} from '../features/applications/providers/ApplicationsProvider';

export const AppListPage = () => {
  return (
    <ApplicationsProvider>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">My Applications</h2>
        </div>
        <ApplicationList />
        <CreateApplicationDialog />
      </div>
    </ApplicationsProvider>
  );
};

const CreateApplicationButton = () => {
  const { setShowCreateModal } = useApplications();
  return (
    <Button onClick={() => setShowCreateModal(true)}>Create Application</Button>
  );
};

const EmptyState = () => {
  const { setShowCreateModal } = useApplications();
  return (
    <Card>
      <CardContent className="text-center py-12">
        <p className="text-gray-500 mb-4">No applications found</p>
        <Button onClick={() => setShowCreateModal(true)}>
          Create your first application
        </Button>
      </CardContent>
    </Card>
  );
};

const ApplicationList = () => {
  const { applications, loading } = useApplications();

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (applications.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {applications.map((app) => (
        <Card
          onClick={() => navigate(`/app/${app.id}/users`)}
          key={app.id}
          className="hover:shadow-md transition-shadow"
        >
          <CardHeader>
            <CardTitle>{app.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">ID: {app.id}</p>
            <div className="mt-4 flex gap-2">
              <Link to={`${app.id}/users`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Manage Users
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const CreateApplicationDialog = () => {
  const {
    showCreateModal,
    setShowCreateModal,
    createApplication: handleCreateApplication,
  } = useApplications();

  if (!showCreateModal) {
    return null;
  }
  return (
    <Dialog>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Create New Application</h3>
          <button
            onClick={() => setShowCreateModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <CreateApplication onCreate={handleCreateApplication} />
      </div>
    </Dialog>
  );
};
