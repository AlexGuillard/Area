import { Global, Module } from '@nestjs/common';
import { DiscordController } from './discord.controller';
import { DiscordService } from './discord.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  controllers: [DiscordController],
  providers: [DiscordService],
  imports: [ConfigModule.forRoot(), PrismaModule],
})
export class DiscordModule {}
