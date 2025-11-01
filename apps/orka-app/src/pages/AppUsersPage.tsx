import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useOrka } from '@orka-react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@walkberg-ui';
import {
  CreateUserRequest,
  ApplicationUser,
} from '@orka-react/api/orka-client';

export function AppUsersPage() {
  const { id } = useParams<{ id: string }>();
  const { orkaClient } = useOrka();

  const [applicationUsers, setApplicationUsers] = useState<ApplicationUser[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'email' | 'lastname' | 'default'>(
    'default'
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState<CreateUserRequest>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    loadUsers();
  }, [id]);

  const loadUsers = async () => {
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
  };

  const handleCreateUser = async () => {
    if (!id) return;
    try {
      await orkaClient.createAppUser(id, newUserFormData);
      setShowCreateModal(false);
      setNewUserFormData({
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
    setNewUserFormData((prev: CreateUserRequest) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value as 'email' | 'lastname');
  };

  const filteredUsers = applicationUsers.filter(
    (applicationUser) =>
      applicationUser.user.email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      applicationUser.user.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      applicationUser.user.lastname
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'email') {
      return a.user.email.localeCompare(b.user.email);
    } else if (sortBy === 'lastname') {
      return a.user.lastname.localeCompare(b.user.lastname);
    }
    return 0;
  });

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold">Users for Application: {id}</h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-64"
          />
          <Select value={'email'} onValueChange={handleSortChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="lastname">Last Created</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>Create User</Button>
      </div>

      {sortedUsers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No users found for this application.
            </p>
            <Button onClick={() => setShowCreateModal(true)}>
              Create your first user
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedUsers.map((applicationUser) => (
                  <TableRow key={applicationUser.id}>
                    <TableCell>{applicationUser.user.firstname}</TableCell>
                    <TableCell>{applicationUser.user.lastname}</TableCell>
                    <TableCell>{applicationUser.user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
            <DialogDescription>
              Enter the details below to create a new user for this application.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="firstName" className="text-right">
                First Name
              </label>
              <Input
                id="firstName"
                name="firstName"
                value={newUserFormData.firstName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="lastName" className="text-right">
                Last Name
              </label>
              <Input
                id="lastName"
                name="lastName"
                value={newUserFormData.lastName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                name="email"
                value={newUserFormData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <label htmlFor="password" className="text-right">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={newUserFormData.password}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
