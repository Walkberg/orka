import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(userId: string, requesterId: string): Promise<void> {
    if (userId !== requesterId) {
      throw new Error('Unauthorized');
    }

    await this.userRepo.delete(userId);
  }
}
