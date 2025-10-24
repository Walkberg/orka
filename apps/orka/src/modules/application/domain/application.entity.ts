export class Application {
  constructor(
    public readonly id: string,
    public name: string,
    public readonly ownerId: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
