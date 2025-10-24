export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName?: string,
    public readonly lastName?: string,
  ) {}
}
