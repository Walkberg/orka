import { Injectable } from '@nestjs/common';
import { IApplicationRepository } from '../../domain/application.repository';
import { Application } from '../../domain/application.entity';

@Injectable()
export class CreateApplicationUseCase {
  constructor(private readonly appRepo: IApplicationRepository) {}

  async execute(name: string, ownerId: string): Promise<Application> {
    if (!name) throw new Error('Name is required');

    return this.appRepo.create(name, ownerId);
  }
}
