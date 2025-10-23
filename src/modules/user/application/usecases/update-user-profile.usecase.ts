import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';
import { User } from '../../domain/user.entity';

@Injectable()
export class UpdateUserProfileUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(
    userId: string,
    data: { lastname?: string; firstname?: string; avatarUrl?: string },
  ): Promise<User> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const updated = await this.userRepo.update(userId, data);

    return updated;
  }
}
