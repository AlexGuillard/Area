import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SpotifyService, PrismaService],
  controllers: [],
})
export class SpotifyModule {}
