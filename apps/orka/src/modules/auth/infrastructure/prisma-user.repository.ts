import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infra/prisma/prisma.service';
import { IUserRepository } from '../domain/user.repository';
import { AuthUser } from '../domain/auth-user.entity';

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<AuthUser | null> {
    const record = await this.prisma.user.findUnique({
      where: { email },
    });
    return record
      ? new AuthUser(
          record.id,
          record.email,
          record.password,
          record.firstName ?? '',
          record.lastName ?? '',
        )
      : null;
  }

  async save(user: AuthUser): Promise<AuthUser> {
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
    return new AuthUser(
      record.id,
      record.email,
      record.password,
      record.firstName ?? '',
      record.lastName ?? '',
    );
  }
}
