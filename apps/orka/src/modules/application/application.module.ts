import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { PrismaApplicationRepository } from './infrastructure/prisma-application.repository';
import { IApplicationRepository } from './domain/application.repository';
import { CreateApplicationUseCase } from './application/usecases/create-application.usecase';
import { ListMyApplicationsUseCase } from './application/usecases/list-my-applications.usecase';
import { GetApplicationDetailsUseCase } from './application/usecases/get-application-details.usecase';
import { UpdateApplicationUseCase } from './application/usecases/update-application.usecase';
import { DeleteApplicationUseCase } from './application/usecases/delete-application.usecase';
import { ApplicationController } from './infrastructure/application.controller';
import {
  GetUsersUseCase,
  CreateApplicationUserUseCase,
} from './application/usecases';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { IApplicationUserRepository } from './domain/application-user.repository';
import { PrismaApplicationUserRepository } from './infrastructure/prisma-application-user.repository';
import { UserService } from '../user/domain/user.service';
import { ApplicationUsersController } from './infrastructure/application-user.controller';

@Module({
  controllers: [ApplicationController, ApplicationUsersController],
  providers: [
    PrismaService,
    UserService,
    PrismaApplicationRepository,
    CreateApplicationUseCase,
    ListMyApplicationsUseCase,
    GetApplicationDetailsUseCase,
    UpdateApplicationUseCase,
    DeleteApplicationUseCase,
    GetUsersUseCase,
    CreateApplicationUserUseCase,
    { provide: IApplicationRepository, useClass: PrismaApplicationRepository },
    {
      provide: IApplicationUserRepository,
      useClass: PrismaApplicationUserRepository,
    },
  ],
  imports: [AuthModule, UserModule],
})
export class ApplicationModule {}
