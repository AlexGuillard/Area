import { Module } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleStrategy } from 'src/strategy/google.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [GoogleAuthService, GoogleStrategy],
  controllers: [GoogleAuthController],
  imports: [ConfigModule.forRoot()]
})
export class GoogleAuthModule {}
