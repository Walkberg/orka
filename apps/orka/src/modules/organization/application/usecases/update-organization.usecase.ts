import { Injectable, ForbiddenException } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class UpdateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(
    orgId: string,
    userId: string,
    data: { name?: string; description?: string },
  ) {
    const organization = await this.organizationRepository.findById(orgId);

    if (!organization) {
      throw new Error('Organization not found');
    }

    if (organization.createdBy !== userId) {
      throw new ForbiddenException('Not allowed');
    }

    return this.organizationRepository.update(orgId, data);
  }
}
