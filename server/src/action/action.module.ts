import { Global, Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MeService } from '../me/me.service';
import { AboutService } from '../about/about.service';
import { GithubModule } from './github/github.module';

@Global()
@Module({
  imports: [PrismaModule, GithubModule],
  providers: [ActionService, MeService, AboutService],
  controllers: [ActionController],
  exports: [ActionService],
})
export class ActionModule {}
