import { Injectable, ForbiddenException } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class DeleteOrganizationUseCase {
  constructor(private readonly orgRepo: IOrganizationRepository) {}

  async execute(orgId: string, userId: string) {
    const org = await this.orgRepo.findById(orgId);

    if (!org) {
      throw new Error('Organization not found');
    }

    if (org.createdBy !== userId) {
      throw new ForbiddenException('Not allowed');
    }

    await this.orgRepo.delete(orgId);
  }
}
