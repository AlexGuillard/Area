import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { DiscordGuard } from './discord.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('services')
@Controller('services')
export class DiscordController {
  constructor(
    private readonly appService: DiscordService,
  ) {}

  @Get('discord/login')
  @UseGuards(DiscordGuard)
  async discordAuth() {
    return;
  }
  @Get('discord/callback')
  @UseGuards(DiscordGuard)
  async discordCallback(@Request() req: any, @Res() res: any) {
    this.appService.discordValidate(req, res);
  }
}
