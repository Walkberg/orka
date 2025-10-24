import { Injectable } from '@nestjs/common';
import { IApplicationRepository } from '../../domain/application.repository';

@Injectable()
export class UpdateApplicationUseCase {
  constructor(private readonly appRepo: IApplicationRepository) {}

  async execute(applicationId: string, userId: string, name: string) {
    const app = await this.appRepo.findById(applicationId);

    if (!app) {
      throw new Error('Application not found');
    }

    if (app.ownerId !== userId) {
      throw new Error('Unauthorized');
    }

    return this.appRepo.update(applicationId, { name });
  }
}
