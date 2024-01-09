import { Module } from '@nestjs/common';
import { SpotifyAuthService } from './spotify-auth.service';
import { SpotifyAuthController } from './spotify-auth.controller';
import { SpotifyOauthStrategy } from 'src/strategy/spotify.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [SpotifyAuthService, SpotifyOauthStrategy],
  controllers: [SpotifyAuthController],
  imports: [PrismaModule],
})
export class SpotifyAuthModule {}

