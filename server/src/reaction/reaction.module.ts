import { Module } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ReactionController } from './reaction.controller';
import { MeService } from '../me/me.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { AboutService } from '../about/about.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [ReactionService, MeService, AboutService],
  controllers: [ReactionController]
})
export class ReactionModule {}
