import { Organization } from './organization.entity';

export abstract class IOrganizationRepository {
  abstract create(
    name: string,
    description: string | null,
    applicationId: string,
    createdBy: string,
  ): Promise<Organization>;

  abstract findById(id: string): Promise<Organization | null>;

  abstract findByApplication(applicationId: string): Promise<Organization[]>;

  abstract findByUserId(userId: string): Promise<Organization[]>;

  abstract update(
    id: string,
    data: Partial<Pick<Organization, 'name' | 'description'>>,
  ): Promise<Organization>;

  abstract delete(id: string): Promise<void>;

  abstract addMember(orgId: string, userId: string): Promise<void>;

  abstract removeMember(orgId: string, userId: string): Promise<void>;

  abstract isMember(orgId: string, userId: string): Promise<boolean>;
}
