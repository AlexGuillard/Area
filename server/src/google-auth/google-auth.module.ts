import { Global, Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  providers: [GoogleAuthService, GoogleStrategy],
  controllers: [GoogleAuthController],
  imports: [ConfigModule.forRoot(), PrismaModule],
})
export class GoogleAuthModule {}
