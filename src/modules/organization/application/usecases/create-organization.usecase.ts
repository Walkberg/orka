import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class CreateOrganizationUseCase {
  constructor(private readonly orgRepo: IOrganizationRepository) {}

  async execute(
    applicationId: string,
    name: string,
    userId: string,
    description?: string,
  ) {
    return this.orgRepo.create(
      name,
      description ?? null,
      applicationId,
      userId,
    );
  }
}
