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
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [ApplicationController],
  providers: [
    PrismaService,
    PrismaApplicationRepository,
    CreateApplicationUseCase,
    ListMyApplicationsUseCase,
    GetApplicationDetailsUseCase,
    UpdateApplicationUseCase,
    DeleteApplicationUseCase,
    { provide: IApplicationRepository, useClass: PrismaApplicationRepository },
  ],
  imports: [AuthModule],
})
export class ApplicationModule {}
