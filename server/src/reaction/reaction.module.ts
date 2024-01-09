import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MeService } from '../me/me.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { AboutService } from '../about/about.service';
import { MailingModule } from './mailing/mailing.module';
import { ConfigModule } from '@nestjs/config';
import { GithubModule } from './github/github.module';

@Module({
  imports: [HttpModule, PrismaModule, MailingModule, ConfigModule.forRoot(), GithubModule],
  providers: [ReactionService, MeService, AboutService],
  controllers: [ReactionController],
})
export class ReactionModule {}
