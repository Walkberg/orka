import { ApplicationUser } from './application-user.entity';

export abstract class IApplicationUserRepository {
  abstract create(applicationUser: ApplicationUser): Promise<ApplicationUser>;

  abstract findByUserIdAndAppId(
    userId: string,
    appId: string,
  ): Promise<ApplicationUser | null>;

  abstract findByAppId(appId: string): Promise<ApplicationUser[]>;

  abstract findByUserId(userId: string): Promise<ApplicationUser[]>;
}
