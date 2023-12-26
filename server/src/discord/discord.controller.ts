import { Controller, Get, Request, Res } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class DiscordController {
    constructor(
      private readonly appService: DiscordService,
      private prisma: PrismaService,
    ) {}

    @Get('discord/login')
    async discordAuth(@Res() req: any) {
      return this.appService.discordLogin(req);
    }
    @Get('discord/callback')
    async discordCallback(@Request() req: any, @Res() res: any) {
      return this.appService.discordCallback(req, res);
    }
}
