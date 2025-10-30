import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';
import { Organization } from '../../domain/organization.entity';

@Injectable()
export class GetUserOrganizationsUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(userId: string): Promise<Organization[]> {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.organizationRepository.findByUserId(userId);
  }
}
