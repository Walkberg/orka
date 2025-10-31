import { Injectable } from '@nestjs/common';
import { IOrganizationRepository } from '../../domain/organization.repository';

@Injectable()
export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: IOrganizationRepository,
  ) {}

  async execute(
    applicationId: string,
    name: string,
    userId: string,
    description?: string,
  ) {
    const organization = await this.organizationRepository.create(
      name,
      description ?? null,
      applicationId,
      userId,
    );

    await this.organizationRepository.addMember(organization.id, userId);

    return organization;
  }
}
