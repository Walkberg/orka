import { HasherService } from 'src/modules/auth/domain/hasher.service';
import { IUserRepository } from './user.repository';
import { User } from './user.entity';

type CreateUserArgs = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export class UserService {
  constructor(
    private readonly hasherService: HasherService,
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(userData: CreateUserArgs): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);

    if (existingUser) {
      return existingUser;
    }

    const hashedPassword = await this.hasherService.hash(userData.password);

    const user = User.Create({ ...userData, password: hashedPassword });

    return await this.userRepository.save(user);
  }
}
