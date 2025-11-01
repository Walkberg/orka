export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public firstname: string | null,
    public lastname: string | null,
    public avatarUrl: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  public static Create(args: UserCreateProps) {
    return new User(
      'null',
      args.email,
      args.password,
      args.firstName ?? null,
      args.lastName ?? null,
      null,
      new Date(),
      new Date(),
    );
  }
}

type UserCreateProps = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};
