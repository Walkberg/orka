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
import { UserService } from './domain/user.service';
import { HasherService } from '../auth/domain/hasher.service';
import { BcryptHasherService } from '../auth/infrastructure/bcrypt-hasher.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    PrismaUserRepository,
    UserService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: HasherService,
      useClass: BcryptHasherService,
    },
    GetUserProfileUseCase,
    UpdateUserProfileUseCase,
    ListUsersUseCase,
    GetUserByIdUseCase,
    DeleteUserUseCase,
  ],
  exports: [UserService],
})
export class UserModule {}
