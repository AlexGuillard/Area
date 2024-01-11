import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    providers: [SpotifyService],
})
export class SpotifyModule {}
