import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class LeaveOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(orgId: string, userId: string) {
    const isMember = await this.organizationRepository.isMember(orgId, userId);

    if (!isMember) {
      throw new Error('Not a member');
    }

    await this.organizationRepository.removeMember(orgId, userId);

    return { success: true };
  }
}
