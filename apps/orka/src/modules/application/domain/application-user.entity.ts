type ApplicationId = string;

type UserId = string;

interface ApplicationUserProps {
  id: string;
  applicationId: ApplicationId;
  userId: UserId;
  joinedAt?: Date;
  lastAccessAt?: Date;
}

export class ApplicationUser {
  public constructor(private props: ApplicationUserProps) {}

  static create(params: {
    applicationId: ApplicationId;
    userId: UserId;
    invitedBy?: UserId;
  }): ApplicationUser {
    return new ApplicationUser({
      id: crypto.randomUUID(),
      applicationId: params.applicationId,
      userId: params.userId,
    });
  }

  get id(): string {
    return this.props.id;
  }

  get applicationId(): ApplicationId {
    return this.props.applicationId;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  activate(): void {
    this.props.joinedAt = new Date();
  }

  recordAccess(): void {
    this.props.lastAccessAt = new Date();
  }

  toSnapshot(): ApplicationUserProps {
    return { ...this.props };
  }

  static fromSnapshot(props: ApplicationUserProps): ApplicationUser {
    return new ApplicationUser(props);
  }
}
