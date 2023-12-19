import { Global, Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserTokenModule } from 'src/user-token/user-token.module';
import { Prisma } from '.prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  providers: [GoogleAuthService, GoogleStrategy],
  controllers: [GoogleAuthController],
  imports: [UserTokenModule, ConfigModule.forRoot(), PrismaModule]
})
export class GoogleAuthModule {}
