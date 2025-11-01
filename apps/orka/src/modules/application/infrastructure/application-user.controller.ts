import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from '../../user/application/dto/create-user.dto';
import { CreateApplicationUserUseCase } from '../application/usecases/create-application-users.usecase';
import { GetUsersUseCase } from '../application/usecases/get-application-users.usecase';
import { ApplicationUserDto } from '../application/dto/application-user.dto';
import { ApplicationUser } from '../domain/application-user.entity';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('applications/:appId/users')
export class ApplicationUsersController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateApplicationUserUseCase,
  ) {}

  @Get()
  async getUsers(@Param('appId') appId: string): Promise<ApplicationUserDto[]> {
    const applciationUsers = await this.getUsersUseCase.execute({
      applicationId: appId,
    });

    return applciationUsers.map(convertToDto);
  }

  @Post()
  async createUser(
    @Param('appId') appId: string,
    @Body() userData: CreateUserDto,
  ): Promise<ApplicationUserDto> {
    const applicationUser = await this.createUserUseCase.execute({
      appId,
      ...userData,
    });

    return convertToDto(applicationUser);
  }
}

export function convertToDto(
  applicationUser: ApplicationUser,
): ApplicationUserDto {
  return {
    appId: applicationUser.applicationId,
    userId: applicationUser.userId,
  };
}
