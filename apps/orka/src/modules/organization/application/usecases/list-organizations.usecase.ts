import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class ListOrganizationsUseCase {
  constructor(private readonly orgRepo: IOrganizationRepository) {}

  async execute(applicationId: string) {
    return this.orgRepo.findByApplication(applicationId);
  }
}
