import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateApplicationUseCase } from '../application/usecases/create-application.usecase';
import { ListMyApplicationsUseCase } from '../application/usecases/list-my-applications.usecase';
import { GetApplicationDetailsUseCase } from '../application/usecases/get-application-details.usecase';
import { UpdateApplicationUseCase } from '../application/usecases/update-application.usecase';
import { DeleteApplicationUseCase } from '../application/usecases/delete-application.usecase';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt-auth.guard';

@Controller('applications')
@UseGuards(JwtAuthGuard) // protège toutes les routes du contrôleur
export class ApplicationController {
  constructor(
    private readonly createApplicationUseCase: CreateApplicationUseCase,
    private readonly listMyApplicationsUseCase: ListMyApplicationsUseCase,
    private readonly getApplicationDetailsUseCase: GetApplicationDetailsUseCase,
    private readonly updateApplicationUseCase: UpdateApplicationUseCase,
    private readonly deleteApplicationUseCase: DeleteApplicationUseCase,
  ) {}

  @Post()
  async create(@Body('name') name: string, @Req() req: any) {
    const userId = req.user.id;

    const app = await this.createApplicationUseCase.execute(name, userId);

    return { message: 'Application created', data: app };
  }

  @Get()
  async list(@Req() req: any) {
    const userId = req.user.id;

    const apps = await this.listMyApplicationsUseCase.execute(userId);

    return { data: apps };
  }

  @Get(':id')
  async getDetails(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const app = await this.getApplicationDetailsUseCase.execute(id, userId);
    return { data: app };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Req() req: any,
  ) {
    const userId = req.user.id;

    const updated = await this.updateApplicationUseCase.execute(
      id,
      userId,
      name,
    );

    return { message: 'Application updated', data: updated };
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;

    await this.deleteApplicationUseCase.execute(id, userId);

    return { message: 'Application deleted' };
  }
}
