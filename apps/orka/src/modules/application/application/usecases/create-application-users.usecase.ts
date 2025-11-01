import { Injectable } from '@nestjs/common';
import { IApplicationUserRepository } from '../../domain/application-user.repository';
import { ApplicationUser } from '../../domain/application-user.entity';
import { UserService } from 'src/modules/user/domain/user.service';

type CreateApplicationUserCommand = {
  appId: string;
  lastName: string;
  firstName: string;
  email: string;
  password: string;
};

@Injectable()
export class CreateApplicationUserUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly applicationUserRepository: IApplicationUserRepository,
  ) {}

  async execute(
    command: CreateApplicationUserCommand,
  ): Promise<ApplicationUser> {
    const user = await this.userService.createUser({
      lastName: command.lastName,
      firstName: command.firstName,
      email: command.email,
      password: command.password,
    });

    const applicationUser = ApplicationUser.create({
      applicationId: command.appId,
      userId: user.id,
    });

    return await this.applicationUserRepository.create(applicationUser);
  }
}
