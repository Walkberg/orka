import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IApplicationRepository } from '../domain/application.repository';
import { Application } from '../domain/application.entity';

@Injectable()
export class PrismaApplicationRepository implements IApplicationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string, ownerId: string): Promise<Application> {
    const app = await this.prisma.application.create({
      data: { name, ownerId, apiKey: '' },
    });
    return new Application(
      app.id,
      app.name,
      app.ownerId,
      app.createdAt,
      app.updatedAt,
    );
  }

  async findById(id: string): Promise<Application | null> {
    const app = await this.prisma.application.findUnique({ where: { id } });
    return app
      ? new Application(
          app.id,
          app.name,
          app.ownerId,
          app.createdAt,
          app.updatedAt,
        )
      : null;
  }

  async findByUser(userId: string): Promise<Application[]> {
    const apps = await this.prisma.application.findMany({
      where: {
        OR: [{ ownerId: userId }, { users: { some: { userId } } }],
      },
    });
    return apps.map(
      (a) => new Application(a.id, a.name, a.ownerId, a.createdAt, a.updatedAt),
    );
  }

  async update(id: string, data: Partial<Application>): Promise<Application> {
    const app = await this.prisma.application.update({ where: { id }, data });
    return new Application(
      app.id,
      app.name,
      app.ownerId,
      app.createdAt,
      app.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.application.delete({ where: { id } });
  }
}
