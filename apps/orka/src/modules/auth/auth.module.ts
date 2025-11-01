import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/auth.controller';
import { PrismaUserRepository as PrismaAuthUserRepository } from './infrastructure/prisma-user.repository';
import { LoginUseCase } from './application/usecases/login.usecase';
import { IUserRepository as IAuthUserRepository } from './domain/user.repository';
import { BcryptHasherService } from './infrastructure/bcrypt-hasher.service';
import { JwtService } from './infrastructure/jwt-token-verifier.service';
import { HasherService } from './domain/hasher.service';
import { TokenVerifierService } from './domain/token-verifier.service';
import { RegisterUseCase } from './application/usecases/register.usecase';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { JwtAuthGuard } from './infrastructure/jwt-auth.guard';
import { UserService } from '../user/domain/user.service';
import { IUserRepository } from '../user/domain/user.repository';
import { PrismaUserRepository } from '../user/infrastructure/prisma-user.repository';

@Module({
  controllers: [AuthController],
  exports: [JwtService, JwtAuthGuard],
  providers: [
    LoginUseCase,
    RegisterUseCase,
    PrismaService,
    PrismaAuthUserRepository,
    BcryptHasherService,
    JwtService,
    JwtAuthGuard,
    UserService,
    {
      provide: IAuthUserRepository,
      useClass: PrismaAuthUserRepository,
    },
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
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
