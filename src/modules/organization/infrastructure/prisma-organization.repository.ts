import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IOrganizationRepository } from '../domain/organization.repository';
import { Organization } from '../domain/organization.entity';

@Injectable()
export class PrismaOrganizationRepository implements IOrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    name: string,
    description: string | null,
    applicationId: string,
    createdBy: string,
  ): Promise<Organization> {
    const org = await this.prisma.organization.create({
      data: {
        name,
        description,
        applicationId,
        createdBy,
      },
    });
    return new Organization(
      org.id,
      org.name,
      org.description,
      org.applicationId,
      org.createdBy,
      org.createdAt,
    );
  }

  async findById(id: string): Promise<Organization | null> {
    const org = await this.prisma.organization.findUnique({ where: { id } });
    return org
      ? new Organization(
          org.id,
          org.name,
          org.description,
          org.applicationId,
          org.createdBy,
          org.createdAt,
        )
      : null;
  }

  async findByApplication(applicationId: string): Promise<Organization[]> {
    const orgs = await this.prisma.organization.findMany({
      where: { applicationId },
    });
    return orgs.map(
      (o) =>
        new Organization(
          o.id,
          o.name,
          o.description,
          o.applicationId,
          o.createdBy,
          o.createdAt,
        ),
    );
  }

  async update(
    id: string,
    data: Partial<Pick<Organization, 'name' | 'description'>>,
  ): Promise<Organization> {
    const org = await this.prisma.organization.update({ where: { id }, data });
    return new Organization(
      org.id,
      org.name,
      org.description,
      org.applicationId,
      org.createdBy,
      org.createdAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.organization.delete({ where: { id } });
  }

  async addMember(orgId: string, userId: string): Promise<void> {
    await this.prisma.organizationMember.create({
      data: { organizationId: orgId, userId },
    });
  }

  async removeMember(orgId: string, userId: string): Promise<void> {
    await this.prisma.organizationMember.deleteMany({
      where: { organizationId: orgId, userId },
    });
  }

  async isMember(orgId: string, userId: string): Promise<boolean> {
    const member = await this.prisma.organizationMember.findFirst({
      where: { organizationId: orgId, userId },
    });
    return !!member;
  }
}
