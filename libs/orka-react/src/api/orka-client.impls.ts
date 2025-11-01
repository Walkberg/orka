import { AxiosInstance } from 'axios';
import type {
  IOrkaClient,
  LoginRequest,
  RegisterRequest,
  OrganizationNew,
  CreateApplicationUserRequest,
  User,
  ApplicationUser,
  Application,
  ApplicationNew,
  OrganizationUpdate,
  Organization,
} from './orka-client';
import axios from './client';

export class OrkaClientImpl implements IOrkaClient {
  private axios: AxiosInstance;
  private applicationId: string;

  constructor(applicationId: string, accessToken?: string) {
    this.axios = axios;
    this.applicationId = applicationId;

    if (accessToken) {
      this.setToken(accessToken);
    }
  }

  async getAppUsers(appId: string): Promise<ApplicationUser[]> {
    const { data } = await this.axios.get<ApplicationUsersResponseDto>(
      `/applications/${appId}/users`
    );

    return data.map((appUser) => ({
      id: appUser.userId,
      userId: appUser.userId,
      applicationId: appUser.appId,
      user: {
        lastname: 'test',
        firstname: 'test',
        email: 'test',
        id: 'tets',
      },
    }));
  }

  async createAppUser(
    req: CreateApplicationUserRequest
  ): Promise<ApplicationUser> {
    const { data } = await this.axios.post(
      `/applications/${req.appId}/users`,
      req
    );

    return data.user || data;
  }

  setToken(token: string) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  setApplicationId(applicationId: string) {
    this.applicationId = applicationId;
  }

  async login(dto: LoginRequest) {
    const { data } = await this.axios.post('/auth/login', dto);

    if (data.token) {
      this.setToken(data.token);
    }

    return {
      user: {
        ...data.user,
        firstname: data.user.firstName,
        lastname: data.user.lastName,
      },
      token: data.token,
    };
  }

  async register(dto: RegisterRequest): Promise<User> {
    const { data } = await this.axios.post('/auth/register', dto);
    return data;
  }

  async getProfile(): Promise<User> {
    const { data } = await this.axios.get('/users/me');
    return data;
  }

  async updateProfile(body: any): Promise<User> {
    const { data } = await this.axios.patch('/users/me', body);
    return data;
  }

  async createOrganization(args: OrganizationNew): Promise<Organization> {
    const { data } = await this.axios.post('/organizations', {
      applicationId: this.applicationId,
      name: args.name,
      description: args.description,
    });
    return data;
  }

  async getOrganizationById(id: string): Promise<Organization> {
    const { data } = await this.axios.get(`/organizations/${id}`);
    return data.data;
  }

  async getUserOrganizations(): Promise<Organization[]> {
    const response = await this.axios.get('/organizations/me');
    return response.data.organizations;
  }

  async updateOrganization(req: OrganizationUpdate): Promise<Organization> {
    const response = await this.axios.patch(`/organizations/${req.id}`, req);
    return response.data;
  }

  async getUserApplications(): Promise<Application[]> {
    const { data } = await this.axios.get<GetApplicationsResponseDto>(
      '/applications'
    );

    return data.data.map((app) => ({ id: app.id, name: app.name }));
  }

  async createApplications(args: ApplicationNew): Promise<Application> {
    const { data } = await this.axios.post<CreateApplicationsResponseDto>(
      '/applications',
      {
        name: args.name,
      }
    );

    return data;
  }
}

export type ApplicationUsersResponseDto = { userId: string; appId: string }[];

export type ApplicationResponse = { id: string; name: string };

export type GetApplicationsResponseDto = { data: ApplicationResponse[] };

export type CreateApplicationsResponseDto = ApplicationResponse;

export type UserDto = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type LoginResponseDto = {
  user: UserDto;
  token: string;
};

export type RegisterResponseDto = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type UserProfileResponseDto = UserDto;

export type UpdateUserProfileResponseDto = UserDto;

export type ListUsersResponseDto = { data: UserDto[] };

export type GetUserByIdResponseDto = { data: UserDto };

export type DeleteUserResponseDto = { message: string };

export type OrganizationDto = {
  id: string;
  name: string;
  description?: string;
  applicationId: string;
};

export type CreateOrganizationResponseDto = {
  message: string;
  data: OrganizationDto;
};

export type ListOrganizationsResponseDto = { data: OrganizationDto[] };

export type GetUserOrganizationsResponseDto = {
  organizations: OrganizationDto[];
};

export type GetOrganizationDetailsResponseDto = { data: OrganizationDto };

export type UpdateOrganizationResponseDto = {
  message: string;
  data: OrganizationDto;
};

export type DeleteOrganizationResponseDto = { message: string };

export type JoinOrganizationResponseDto = { message: string; data: any };

export type LeaveOrganizationResponseDto = { message: string; data: any };

export type CreateApplicationResponseDto = {
  message: string;
  data: ApplicationResponse;
};

export type GetApplicationDetailsResponseDto = { data: ApplicationResponse };

export type UpdateApplicationResponseDto = {
  message: string;
  data: ApplicationResponse;
};
export type DeleteApplicationResponseDto = { message: string };

export type ApplicationUserResponseDto = { userId: string; appId: string };

export type CreateApplicationUserResponseDto = {
  message: string;
  user: ApplicationUser;
};
