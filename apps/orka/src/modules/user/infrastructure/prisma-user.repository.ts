import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user
      ? new User(
          user.id,
          user.email,
          user.firstName,
          user.lastName,
          user.avatarUrl,
          user.createdAt,
          user.updatedAt,
        )
      : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user
      ? new User(
          user.id,
          user.email,
          user.firstName,
          user.lastName,
          user.avatarUrl,
          user.createdAt,
          user.updatedAt,
        )
      : null;
  }

  async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(
      (u) =>
        new User(
          u.id,
          u.email,
          u.firstName,
          u.lastName,
          u.avatarUrl,
          u.createdAt,
          u.updatedAt,
        ),
    );
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return new User(
      user.id,
      user.email,
      user.firstName,
      user.lastName,
      user.avatarUrl,
      user.createdAt,
      user.updatedAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
