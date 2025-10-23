import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt-auth.guard';
import { GetUserProfileUseCase } from '../application/usecases/get-user-profile.usecase';
import { UpdateUserProfileUseCase } from '../application/usecases/update-user-profile.usecase';
import { ListUsersUseCase } from '../application/usecases/list-users.usecase';
import { GetUserByIdUseCase } from '../application/usecases/get-user-by-id.usecase';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    private readonly getUserProfile: GetUserProfileUseCase,
    private readonly updateUserProfile: UpdateUserProfileUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get('me')
  async getProfile(@Req() req: any) {
    return this.getUserProfile.execute(req.user.id);
  }

  @Patch('me')
  async updateProfile(@Req() req: any, @Body() body: any) {
    return this.updateUserProfile.execute(req.user.id, body);
  }

  @Get()
  async list() {
    return this.listUsers.execute();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.getUserById.execute(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    return this.deleteUser.execute(id, req.user.id);
  }
}
