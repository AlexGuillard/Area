import { Controller, Get, Request, Res } from '@nestjs/common';
import { DiscordService } from './discord.service';

@Controller('auth')
export class DiscordController {
  constructor(
    private readonly appService: DiscordService,
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
