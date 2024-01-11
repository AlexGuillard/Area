import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  providers: [SpotifyService, PrismaService],
  controllers: [],
  imports: [PrismaModule],
})
export class SpotifyModule {}
