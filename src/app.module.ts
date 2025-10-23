import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { ApplicationModule } from './modules/application/application.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ApplicationModule,
    OrganizationModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
