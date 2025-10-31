import { useOrganization } from '../providers/OrkaOrganizationProvider';

export const OrganizationList = () => {
  const { organizations } = useOrganization();

  return <div>Organization List</div>;
};
