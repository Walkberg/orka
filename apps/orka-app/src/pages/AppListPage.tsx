import { useState, useEffect } from 'react';
import { Application, useOrka } from '@orka-react';
import { CreateApplication } from '../components/CreateApplication';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@walkberg-ui';
import { Link, useNavigate } from 'react-router-dom';

export const AppListPage = () => {
  const { orkaClient } = useOrka();
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const applications = await orkaClient.getUserApplications();
      setApplications(applications);
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
      loadApplications(); // Refresh the list
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  if (loading) {
    return <div>Loading applications...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Applications</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          Create Application
        </Button>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">No applications found</p>
            <Button onClick={() => setShowCreateModal(true)}>
              Create your first application
            </Button>
          </CardContent>
        </Card>
      ) : (
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
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
        </div>
      )}
    </div>
  );
};
