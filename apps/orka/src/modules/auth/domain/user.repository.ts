import { User } from './user.entity';

export abstract class IUserRepository {
  abstract findByEmail(email: string): Promise<User | null>;

  abstract save(user: User): Promise<User>;
}
