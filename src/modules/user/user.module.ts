import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { IUserRepository } from './domain/user.repository';
import { GetUserProfileUseCase } from './application/usecases/get-user-profile.usecase';
import { UpdateUserProfileUseCase } from './application/usecases/update-user-profile.usecase';
import { ListUsersUseCase } from './application/usecases/list-users.usecase';
import { GetUserByIdUseCase } from './application/usecases/get-user-by-id.usecase';
import { DeleteUserUseCase } from './application/usecases/delete-user.usecase';
import { UserController } from './infrastructure/user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    PrismaUserRepository,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    GetUserProfileUseCase,
    UpdateUserProfileUseCase,
    ListUsersUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
