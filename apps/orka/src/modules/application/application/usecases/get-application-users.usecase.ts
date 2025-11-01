import { Injectable } from '@nestjs/common';

import { IApplicationUserRepository } from '../../domain/application-user.repository';
import { ApplicationUser } from '../../domain/application-user.entity';

type GetUserByApplicationCommand = {
  applicationId: string;
};

@Injectable()
export class GetUsersUseCase {
  constructor(
    private readonly applicationUserRepository: IApplicationUserRepository,
  ) {}

  async execute({
    applicationId: appId,
  }: GetUserByApplicationCommand): Promise<ApplicationUser[]> {
    const applicationUsers =
      await this.applicationUserRepository.findByAppId(appId);

    return applicationUsers;
  }
}
