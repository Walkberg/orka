import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/jwt-auth.guard';
import { CreateOrganizationUseCase } from '../application/usecases/create-organization.usecase';
import { ListOrganizationsUseCase } from '../application/usecases/list-organizations.usecase';
import { GetOrganizationDetailsUseCase } from '../application/usecases/get-organization-details.usecase';
import { UpdateOrganizationUseCase } from '../application/usecases/update-organization.usecase';
import { DeleteOrganizationUseCase } from '../application/usecases/delete-organization.usecase';
import { JoinOrganizationUseCase } from '../application/usecases/join-organization.usecase';
import { LeaveOrganizationUseCase } from '../application/usecases/leave-organization.usecase';

@UseGuards(JwtAuthGuard)
@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly createOrganizationUseCase: CreateOrganizationUseCase,
    private readonly listOrganizationsUseCase: ListOrganizationsUseCase,
    private readonly getOrganizationDetailsUseCase: GetOrganizationDetailsUseCase,
    private readonly updateOrganizationUseCase: UpdateOrganizationUseCase,
    private readonly deleteOrganizationUseCase: DeleteOrganizationUseCase,
    private readonly joinOrganizationUseCase: JoinOrganizationUseCase,
    private readonly leaveOrganizationUseCase: LeaveOrganizationUseCase,
  ) {}

  @Post()
  async create(
    @Body('applicationId') applicationId: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const organization = await this.createOrganizationUseCase.execute(
      applicationId,
      name,
      userId,
      description,
    );
    return { message: 'Organization created', data: organization };
  }

  @Get('/application/:applicationId')
  async list(@Param('applicationId') applicationId: string) {
    const organizations =
      await this.listOrganizationsUseCase.execute(applicationId);
    return { data: organizations };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const org = await this.getOrganizationDetailsUseCase.execute(id);
    return { data: org };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('description') description: string,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    const updated = await this.updateOrganizationUseCase.execute(id, userId, {
      name,
      description,
    });
    return { message: 'Organization updated', data: updated };
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    await this.deleteOrganizationUseCase.execute(id, userId);
    return { message: 'Organization deleted' };
  }

  @Post(':id/join')
  async join(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const result = await this.joinOrganizationUseCase.execute(id, userId);
    return { message: 'Joined organization', data: result };
  }

  @Post(':id/leave')
  async leave(@Param('id') id: string, @Req() req: any) {
    const userId = req.user.id;
    const result = await this.leaveOrganizationUseCase.execute(id, userId);
    return { message: 'Left organization', data: result };
  }
}
