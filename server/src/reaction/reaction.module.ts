import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MeService } from '../me/me.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { AboutService } from '../about/about.service';
import { MailingModule } from 'src/mailing/mailing.module';
import { MailingService } from 'src/mailing/mailing.service';

@Module({
  imports: [HttpModule, PrismaModule, MailingModule],
  providers: [ReactionService, MeService, AboutService, MailingService],
  controllers: [ReactionController],
})
export class ReactionModule {}
