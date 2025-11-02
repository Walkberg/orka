import React from 'react';
import { ApplicationOrganizationsProvider } from '../features/organizations/providers/ApplicationOrganizationsProvider';
import OrganizationFilter from '../features/organizations/components/OrganizationFilter';
import OrganizationList from '../features/organizations/components/OrganizationList';

export const ApplicationOrganizationsPage: React.FC = () => {
  return (
    <ApplicationOrganizationsProvider>
      <div>
        <h1>Organizations</h1>
        <OrganizationFilter />
        <OrganizationList />
      </div>
    </ApplicationOrganizationsProvider>
  );
};
