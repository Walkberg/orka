import { AxiosInstance } from 'axios';
import type {
  IOrkaClient,
  LoginArgs,
  RegisterArgs,
  OrganizationNew,
  CreateUserArgs,
  User,
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
  async getAppUsers(appId: string): Promise<User[]> {
    const { data } = await this.axios.get(`/applications/${appId}/users`);
    // Assuming the API returns an array of users directly or within a 'data' field
    // Adjust if the actual API response structure is different.
    return data.users || data;
  }

  async createAppUser(appId: string, userData: CreateUserArgs): Promise<User> {
    const { data } = await this.axios.post(
      `/applications/${appId}/users`,
      userData
    );
    // Assuming the API returns the created user object directly or within a 'data' field
    // Adjust if the actual API response structure is different.
    return data.user || data;
  }

  setToken(token: string) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  setApplicationId(applicationId: string) {
    this.applicationId = applicationId;
  }

  async login(dto: LoginArgs) {
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

  async register(dto: RegisterArgs) {
    const { data } = await this.axios.post('/auth/register', dto);
    return data;
  }

  async getProfile() {
    const { data } = await this.axios.get('/users/me');
    return data;
  }

  async updateProfile(body: any) {
    const { data } = await this.axios.patch('/users/me', body);
    return data;
  }

  async createOrganization(args: OrganizationNew) {
    const { data } = await this.axios.post('/organizations', {
      applicationId: this.applicationId,
      name: args.name,
      description: args.description,
    });
    return data;
  }

  async getOrganizationById(id: string) {
    const { data } = await this.axios.get(`/organizations/${id}`);
    return data.data;
  }

  async getUserOrganizations() {
    const response = await this.axios.get('/organizations/me');
    return response.data.organizations;
  }

  async updateOrganization(
    id: string,
    data: { name?: string; description?: string }
  ) {
    const response = await this.axios.patch(`/organizations/${id}`, data);
    return response.data;
  }
}
