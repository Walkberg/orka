import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { IUserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({
      where: { email },
    });
    return record
      ? new User(
          record.id,
          record.email,
          record.password,
          record.firstName ?? undefined,
          record.lastName ?? undefined,
        )
      : null;
  }

  async save(user: User): Promise<User> {
    const record = await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      },
      create: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      },
    });
    return new User(
      record.id,
      record.email,
      record.password,
      record.firstName ?? undefined,
      record.lastName ?? undefined,
    );
  }
}
