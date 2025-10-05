import { Injectable } from '@nestjs/common';
import { IApplicationRepository } from '../../domain/application.repository';

@Injectable()
export class GetApplicationDetailsUseCase {
  constructor(private readonly appRepo: IApplicationRepository) {}

  async execute(appId: string, userId: string) {
    const app = await this.appRepo.findById(appId);

    if (!app) throw new Error('Application not found');

    if (app.ownerId !== userId) {
      throw new Error('Unauthorized');
    }
    return app;
  }
}
