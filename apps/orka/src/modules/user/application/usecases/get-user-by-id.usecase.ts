import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string): Promise<User> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
