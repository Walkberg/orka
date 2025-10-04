import { Controller, Post, Body } from '@nestjs/common';
import { LoginUseCase } from '../application/usecases/login.usecase';
import type { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RegisterUseCase } from '../application/usecases/register.usecase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }
}
