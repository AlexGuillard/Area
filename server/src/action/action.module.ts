import { Global, Module } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MeService } from '../me/me.service';
import { AboutService } from '../about/about.service';
import { DiscordModule } from './discord/discord.module';

@Global()
@Module({
  imports: [PrismaModule, DiscordModule],
  providers: [ActionService, MeService, AboutService],
  controllers: [ActionController],
  exports: [ActionService],
})
export class ActionModule {}
