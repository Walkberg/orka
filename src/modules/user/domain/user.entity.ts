export class User {
  constructor(
    public id: string,
    public email: string,
    public firstname: string | null,
    public lastname: string | null,
    public avatarUrl: string | null,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
