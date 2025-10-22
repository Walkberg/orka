import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class LeaveOrganizationUseCase {
  constructor(private readonly orgRepo: IOrganizationRepository) {}

  async execute(orgId: string, userId: string) {
    const isMember = await this.orgRepo.isMember(orgId, userId);

    if (!isMember) {
      throw new Error('Not a member');
    }

    await this.orgRepo.removeMember(orgId, userId);

    return { success: true };
  }
}
