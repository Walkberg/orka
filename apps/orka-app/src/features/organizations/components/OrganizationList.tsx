import React from 'react';
import { useApplicationOrganizations } from '../providers/ApplicationOrganizationsProvider';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@walkberg-ui';
import { Organization } from '@orka-react';

const OrganizationList: React.FC = () => {
  const { organizations, loading } = useApplicationOrganizations();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Loading organizations...</p>
      </div>
    );
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">No organizations found.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>A list of your organizations.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Created Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org: Organization) => (
            <TableRow key={org.id}>
              <TableCell className="font-medium">{org.name}</TableCell>
              <TableCell>{org.id}</TableCell>
              <TableCell>tets</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrganizationList;
