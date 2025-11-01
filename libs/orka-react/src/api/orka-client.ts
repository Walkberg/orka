export type LoginArgs = {
  email: string;
  password: string;
};

export type RegisterArgs = {
  email: string;
  password: string;
};

export type AccessTokenResponse = {
  token: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  username?: string;
  firstname: string;
  avatarUrl?: string;
  lastname: string;
};

export type OrganizationNew = {
  name: string;
  description?: string;
};

export type Organization = {
  id: string;
  name: string;
  description?: string;
};

export type CreateUserArgs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface IOrkaClient {
  login(args: LoginArgs): Promise<AccessTokenResponse>;

  register(args: RegisterArgs): Promise<any>;

  getProfile(): Promise<User>;

  updateProfile(data: any): Promise<any>;

  createOrganization(args: OrganizationNew): Promise<any>;

  getOrganizationById(id: string): Promise<any>;

  getUserOrganizations(): Promise<Organization[]>;

  updateOrganization(
    id: string,
    data: { name?: string; description?: string }
  ): Promise<any>;

  getAppUsers(appId: string): Promise<User[]>;

  createAppUser(appId: string, userData: CreateUserArgs): Promise<User>;

  setToken(token: string): void;

  //deleteOrganization(id: string): Promise<void>;

  //joinOrganization(id: string): Promise<any>;

  //leaveOrganization(id: string): Promise<any>;
}
