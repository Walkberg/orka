import { Inject, Injectable } from '@nestjs/common';
import { TokenVerifierService } from '../../domain/token-verifier.service';
import { UserService } from 'src/modules/user/domain/user.service';

interface RegisterCommand {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject()
    private readonly userService: UserService,

    @Inject()
    private readonly tokenVerifierService: TokenVerifierService,
  ) {}

  async execute(command: RegisterCommand) {
    const user = await this.userService.createUser(command);

    const token = await this.tokenVerifierService.generate(user.id);

    return {
      user,
      token,
    };
  }
}
