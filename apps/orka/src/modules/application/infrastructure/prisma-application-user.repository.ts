import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IApplicationUserRepository } from '../domain/application-user.repository';
import { ApplicationUser } from '@prisma/client';
import { ApplicationUser as DomainApplicationUser } from '../domain/application-user.entity';

@Injectable()
export class PrismaApplicationUserRepository
  implements IApplicationUserRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(data: DomainApplicationUser): Promise<DomainApplicationUser> {
    const createdApplicationUser = await this.prisma.applicationUser.create({
      data: {
        userId: data.userId,
        appId: data.applicationId,
      },
    });
    return convertToDomain(createdApplicationUser);
  }

  async findByUserIdAndAppId(
    userId: string,
    appId: string,
  ): Promise<DomainApplicationUser | null> {
    const applicationUser = await this.prisma.applicationUser.findUnique({
      where: {
        userId_appId: {
          userId,
          appId,
        },
      },
    });
    return applicationUser ? convertToDomain(applicationUser) : null;
  }

  async findByAppId(appId: string): Promise<DomainApplicationUser[]> {
    const applicationUsers = await this.prisma.applicationUser.findMany({
      where: { appId },
    });
    return applicationUsers.map(convertToDomain);
  }

  async findByUserId(userId: string): Promise<DomainApplicationUser[]> {
    const applicationUsers = await this.prisma.applicationUser.findMany({
      where: { userId },
    });
    return applicationUsers.map(convertToDomain);
  }
}

function convertToDomain(db: ApplicationUser): DomainApplicationUser {
  return new DomainApplicationUser({
    id: db.id,
    applicationId: db.appId,
    userId: db.userId,
    joinedAt: db.joinedAt,
    lastAccessAt: new Date(),
  });
}
