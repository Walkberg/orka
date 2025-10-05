import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';
import { HasherService } from '../../domain/hasher.service';
import { TokenVerifierService } from '../../domain/token-verifier.service';

interface LoginCommand {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly hasherService: HasherService,
    private readonly userRepository: IUserRepository,
    private readonly tokenVerifierService: TokenVerifierService,
  ) {}

  async execute(command: LoginCommand) {
    const user = await this.userRepository.findByEmail(command.email);

    if (user == null) {
      throw new Error('Invalid credentials');
    }

    const valid = await this.hasherService.compare(
      command.password,
      user.password,
    );

    if (!valid) {
      throw new Error('Invalid credentials');
    }

    const token = await this.tokenVerifierService.generate(user.id);

    return { user, token };
  }
}
