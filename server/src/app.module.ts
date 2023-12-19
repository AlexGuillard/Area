import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AboutModule } from './about/about.module';
import { MeModule } from './me/me.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    AboutModule,
    MeModule,
    GoogleAuthModule,
    ConfigModule.forRoot(),
    ServicesModule,
  ],
})
export class AppModule {}
