import { Module } from '@nestjs/common';
import { SpotifyAuthService } from './spotify-auth.service';
import { SpotifyAuthController } from './spotify-auth.controller';

@Module({
  providers: [SpotifyAuthService],
  controllers: [SpotifyAuthController]
})
export class SpotifyAuthModule {}
