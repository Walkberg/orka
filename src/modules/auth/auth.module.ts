import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AuthController } from './infrastructure/auth.controller';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { LoginUseCase } from './application/usecases/login.usecase';
import { IUserRepository } from './domain/user.repository';
import { BcryptHasherService } from './infrastructure/bcrypt-hasher.service';
import { JwtService } from './infrastructure/jwt-token-verifier.service';
import { HasherService } from './domain/hasher.service';
import { TokenVerifierService } from './domain/token-verifier.service';
import { RegisterUseCase } from './application/usecases/register.usecase';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    LoginUseCase,
    RegisterUseCase,
    PrismaUserRepository,
    {
      provide: IUserRepository,
      useExisting: PrismaUserRepository,
    },
    {
      provide: HasherService,
      useClass: BcryptHasherService,
    },
    {
      provide: TokenVerifierService,
      useClass: JwtService,
    },
  ],
})
export class AuthModule {}
