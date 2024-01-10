import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [DiscordService],
  imports: [PrismaModule],
})
export class DiscordModule {}
