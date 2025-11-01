import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { User as PrismaUser } from '@prisma/client';
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user ? convertDbToCore(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? convertDbToCore(user) : null;
  }

  async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(convertDbToCore);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: convertUpdateCoreToDb(data),
    });
    return convertDbToCore(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async save(data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.create({
      data: convertCreateCoreToDb(data),
    });
    return convertDbToCore(user);
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return users.map(convertDbToCore);
  }
}

function convertDbToCore(user: PrismaUser): User {
  return new User(
    user.id,
    user.email,
    user.password,
    user.firstName,
    user.lastName,
    user.avatarUrl,
    user.createdAt,
    user.updatedAt,
  );
}

function convertUpdateCoreToDb(user: Partial<User>): Partial<PrismaUser> {
  return {
    id: user.id,
    email: user.email ?? '',
    lastName: user.lastname,
    firstName: user.firstname,
    password: user.password ?? undefined,
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function convertCreateCoreToDb(
  user: Partial<User>,
): Partial<PrismaUser> & { email: string; password: string } {
  return {
    id: user.id,
    email: user.email ?? '',
    lastName: user.lastname,
    firstName: user.firstname,
    password: user.password ?? 'undefined',
    avatarUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
