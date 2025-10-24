import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

import { OrganizationController } from './infrastructure/organization.controller';

import { PrismaOrganizationRepository } from './infrastructure/prisma-organization.repository';
import { IOrganizationRepository } from './domain/organization.repository';

import { CreateOrganizationUseCase } from './application/usecases/create-organization.usecase';
import { ListOrganizationsUseCase } from './application/usecases/list-organizations.usecase';
import { GetOrganizationDetailsUseCase } from './application/usecases/get-organization-details.usecase';
import { UpdateOrganizationUseCase } from './application/usecases/update-organization.usecase';
import { DeleteOrganizationUseCase } from './application/usecases/delete-organization.usecase';
import { JoinOrganizationUseCase } from './application/usecases/join-organization.usecase';
import { LeaveOrganizationUseCase } from './application/usecases/leave-organization.usecase';

@Module({
  imports: [AuthModule],
  controllers: [OrganizationController],
  providers: [
    PrismaService,
    PrismaOrganizationRepository,

    CreateOrganizationUseCase,
    ListOrganizationsUseCase,
    GetOrganizationDetailsUseCase,
    UpdateOrganizationUseCase,
    DeleteOrganizationUseCase,
    JoinOrganizationUseCase,
    LeaveOrganizationUseCase,

    {
      provide: IOrganizationRepository,
      useClass: PrismaOrganizationRepository,
    },
  ],
  exports: [IOrganizationRepository],
})
export class OrganizationModule {}
