import { Injectable } from '@nestjs/common';
import { IApplicationRepository } from '../../domain/application.repository';
import { Application } from '../../domain/application.entity';

@Injectable()
export class ListMyApplicationsUseCase {
  constructor(private readonly appRepo: IApplicationRepository) {}

  async execute(userId: string): Promise<Application[]> {
    return this.appRepo.findByUser(userId);
  }
}
