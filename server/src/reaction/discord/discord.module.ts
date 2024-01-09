import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { MeService } from 'src/me/me.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DiscordController } from './discord.controller';

@Module({
  providers: [DiscordService],
  imports: [PrismaModule],
  controllers: [DiscordController],
})
export class DiscordModule {}
