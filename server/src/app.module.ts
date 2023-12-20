import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AboutModule } from './about/about.module';
import { MeModule } from './me/me.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { ActionModule } from './action/action.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AreaModule } from './area/area.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    AboutModule,
    MeModule,
    ConfigModule.forRoot(),
    ServicesModule,
    ActionModule,
    ScheduleModule.forRoot(),
    AreaModule
  ],
})
export class AppModule {}
