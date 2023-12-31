import { Global, Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { MeService } from '../me/me.service';
import { AboutService } from '../about/about.service';

@Global()
@Module({
  imports: [HttpModule, PrismaModule],
  providers: [AreaService, MeService, AboutService],
  controllers: [AreaController],
})
export class AreaModule {}
