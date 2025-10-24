import { Application } from './application.entity';

export abstract class IApplicationRepository {
  abstract create(name: string, ownerId: string): Promise<Application>;

  abstract findById(id: string): Promise<Application | null>;

  abstract findByUser(userId: string): Promise<Application[]>;

  abstract update(id: string, data: Partial<Application>): Promise<Application>;

  abstract delete(id: string): Promise<void>;
}
