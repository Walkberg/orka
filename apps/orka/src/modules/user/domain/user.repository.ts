import { User } from './user.entity';

export abstract class IUserRepository {
  abstract findById(id: string): Promise<User | null>;

  abstract findByEmail(email: string): Promise<User | null>;

  abstract list(): Promise<User[]>;

  abstract save(user: User): Promise<User>;

  abstract update(id: string, data: Partial<User>): Promise<User>;

  abstract delete(id: string): Promise<void>;
}
