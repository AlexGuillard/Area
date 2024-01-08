import { Module } from '@nestjs/common';
import { TimeService } from './time.service';
import { HttpModule } from '@nestjs/axios';
import { MeService } from 'src/me/me.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AboutService } from 'src/about/about.service';

@Module({
  providers: [TimeService, MeService, PrismaService, AboutService],
  imports: [HttpModule],
})
export class TimeModule {}
