import { Module } from '@nestjs/common';

import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './infra/prisma/prisma.module';
import { ApplicationModule } from './modules/application/application.module';

@Module({
  imports: [AuthModule, PrismaModule, ApplicationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
