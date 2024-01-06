import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { ActionModule } from '../action.module';
import { HttpModule } from '@nestjs/axios';
import { ActionService } from '../action.service';
import { MeService } from 'src/me/me.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AboutService } from 'src/about/about.service';

@Module({
  providers: [TimeService, ActionService, MeService, PrismaService, AboutService],
  imports: [ActionModule, HttpModule],
})
export class TimeModule {}
