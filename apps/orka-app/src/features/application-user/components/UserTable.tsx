import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
} from '@walkberg-ui';
import { useApplicationUser } from '../providers/ApplicationUserProvider';

export const UserTable: React.FC = () => {
  const { applicationUsers, loading, searchTerm, sortBy, showCreateModal } =
    useApplicationUser();

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

  // Sort users based on sortBy
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortBy === 'email') {
      return a.user.email.localeCompare(b.user.email);
    } else if (sortBy === 'lastname') {
      return a.user.lastname.localeCompare(b.user.lastname);
    }
    return 0; // Default sort
  });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>Loading users...</CardContent>
      </Card>
    );
  }

  if (sortedUsers.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <p className="text-gray-500 mb-4">
            No users found for this application.
          </p>
          <Button onClick={() => showCreateModal(true)}>Creat User</Button>
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
};
