import { Global, Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { HttpModule } from '@nestjs/axios';
import { MeModule } from 'src/me/me.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MeService } from 'src/me/me.service';

@Global()
@Module({
  imports: [HttpModule, PrismaModule],
  providers: [ActionService, MeService],
  controllers: [ActionController]
})
export class ActionModule {}
