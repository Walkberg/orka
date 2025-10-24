import { Injectable, NotFoundException } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class GetOrganizationDetailsUseCase {
  constructor(private readonly orgRepo: IOrganizationRepository) {}

  async execute(orgId: string) {
    const org = await this.orgRepo.findById(orgId);

    if (!org) throw new NotFoundException('Organization not found');

    return org;
  }
}
