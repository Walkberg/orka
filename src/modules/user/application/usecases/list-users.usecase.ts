import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

@Injectable()
export class ListUsersUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepo.list();
  }
}
