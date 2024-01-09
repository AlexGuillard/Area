import { Global, Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MeService } from 'src/me/me.service';
import { GithubAuthModule } from './github-auth/github-auth.module';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { DiscordModule } from './discord/discord.module';
import { SpotifyAuthModule } from './spotify-auth/spotify-auth.module';

@Global()
@Module({
  imports: [PrismaModule, GithubAuthModule, GoogleAuthModule, DiscordModule, SpotifyAuthModule],
  providers: [ServicesService, MeService],
  controllers: [ServicesController],
})
export class ServicesModule {}
