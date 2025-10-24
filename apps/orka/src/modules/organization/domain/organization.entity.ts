export class Organization {
  constructor(
    public id: string,
    public name: string,
    public description: string | null,
    public applicationId: string,
    public createdBy: string,
    public createdAt: Date,
  ) {}
}
