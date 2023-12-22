import { Controller, Get, Param } from '@nestjs/common';
import { ReactionService } from './reaction.service';

@Controller(':token/')
export class ReactionController {
  constructor(private authService: ReactionService) {}

  @Get('reactions')
  getReactions(@Param('token') token: string) {
    return this.authService.getReactions(token);
  }
}
