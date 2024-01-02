import { Global, Module } from '@nestjs/common';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../prisma/prisma.module';
import { DiscordStrategy } from '../strategy/discord.strategy';

@Global()
@Module({
  controllers: [DiscordController],
  providers: [DiscordService, DiscordStrategy],
  imports: [ConfigModule.forRoot(), PrismaModule],
})
export class DiscordModule {}
