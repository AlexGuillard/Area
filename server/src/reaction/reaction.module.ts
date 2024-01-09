import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MeService } from '../me/me.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { AboutService } from '../about/about.service';
import { MailingModule } from './mailing/mailing.module';
import { MailingService } from './mailing/mailing.service';
import { ConfigModule } from '@nestjs/config';
import { DiscordModule } from './discord/discord.module';

@Module({
  imports: [HttpModule, PrismaModule, MailingModule, ConfigModule.forRoot(), DiscordModule],
  providers: [ReactionService, MeService, AboutService, MailingService],
  controllers: [ReactionController],
})
export class ReactionModule {}
