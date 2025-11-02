export type Token = string;

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
};

export type AccessTokenResponse = {
  token: Token;
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

export type ApplicationUser = {
  id: string;
  userId: string;
  applicationId: string;
  user: User;
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

export type OrganizationUpdate = {
  id: string;
  name?: string;
  description?: string;
};

export type CreateApplicationUserRequest = {
  appId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Application = {
  id: string;
  name: string;
};

export type ApplicationNew = {
  name: string;
};

export type ApplicationOrganizationFiltering = {
  applicationId: string;
};

export interface IOrkaClient {
  setToken(token: string): void;

  login(args: LoginRequest): Promise<AccessTokenResponse>;

  register(args: RegisterRequest): Promise<User>;

  getProfile(): Promise<User>;

  updateProfile(data: any): Promise<User>;

  createOrganization(args: OrganizationNew): Promise<Organization>;

  getOrganizationById(id: string): Promise<Organization>;

  getUserOrganizations(): Promise<Organization[]>;

  getApplicationOrganizations(
    req: ApplicationOrganizationFiltering
  ): Promise<Organization[]>;

  updateOrganization(req: OrganizationUpdate): Promise<Organization>;

  getAppUsers(appId: string): Promise<ApplicationUser[]>;

  createAppUser(req: CreateApplicationUserRequest): Promise<ApplicationUser>;

  getUserApplications(): Promise<Application[]>;

  createApplications(args: ApplicationNew): Promise<Application>;

  //deleteOrganization(id: string): Promise<void>;

  //joinOrganization(id: string): Promise<any>;

  //leaveOrganization(id: string): Promise<any>;
}
