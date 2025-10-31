export type LoginArgs = {
  email: string;
  password: string;
};

export type RegisterArgs = {
  email: string;
  password: string;
};

export type AccessTokenResponse = {
  accessToken: string;
};

export type OrganizationNew = {
  applicationId: string;
  name: string;
  description?: string;
};

export interface IOrkaClient {
  login(args: LoginArgs): Promise<AccessTokenResponse>;

  register(args: RegisterArgs): Promise<any>;

  getProfile(): Promise<any>;

  updateProfile(data: any): Promise<any>;

  createOrganization(args: OrganizationNew): Promise<any>;

  getOrganizationById(id: string): Promise<any>;

  updateOrganization(
    id: string,
    data: { name?: string; description?: string }
  ): Promise<any>;

  //deleteOrganization(id: string): Promise<void>;

  //joinOrganization(id: string): Promise<any>;

  //leaveOrganization(id: string): Promise<any>;
}
