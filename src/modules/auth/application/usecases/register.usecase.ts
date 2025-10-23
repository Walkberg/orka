import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/user.repository';
import { HasherService } from '../../domain/hasher.service';
import { TokenVerifierService } from '../../domain/token-verifier.service';

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
    private readonly userRepo: IUserRepository,

    @Inject()
    private readonly hasherService: HasherService,

    @Inject()
    private readonly tokenVerifierService: TokenVerifierService,
  ) {}

  async execute(command: RegisterCommand) {
    const existingUser = await this.userRepo.findByEmail(command.email);

    if (existingUser != null) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await this.hasherService.hash(command.password);

    const user = await this.userRepo.save({
      id: 'null',
      email: command.email,
      password: hashedPassword,
      firstName: command.firstName,
      lastName: command.lastName,
    });

    const token = await this.tokenVerifierService.generate(user.id);

    return {
      user,
      token,
    };
  }
}
