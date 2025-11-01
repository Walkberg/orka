import { AuthUser } from './auth-user.entity';

export abstract class IUserRepository {
  abstract findByEmail(email: string): Promise<AuthUser | null>;

  abstract save(user: AuthUser): Promise<AuthUser>;
}
