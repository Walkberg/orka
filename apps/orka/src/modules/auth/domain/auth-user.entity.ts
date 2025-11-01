import { User } from 'src/modules/user/domain/user.entity';

export class AuthUser {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {}

  public static Create(args: UserCreateProps) {
    return new AuthUser(
      'null',
      args.email,
      args.password,
      args.firstName ?? '',
      args.lastName ?? '',
    );
  }

  public static CreateFromUser(args: User) {
    return new AuthUser(
      args.id,
      args.email,
      args.password,
      args.firstname ?? '',
      args.lastname ?? '',
    );
  }
}

type UserCreateProps = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
