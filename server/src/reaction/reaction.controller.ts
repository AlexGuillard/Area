import { Controller, Get, Param } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reactions')
@Controller(':token/')
export class ReactionController {
  constructor(private authService: ReactionService) {}

  @Get('reactions')
  getReactions(@Param('token') token: string) {
    return this.authService.getReactions(token);
  }
  @Get('reactions/:nameReaction')
  getReactionInfo(@Param('token') token: string, @Param('nameReaction') nameReaction: string) {
    return this.authService.getReactionInfo(token, nameReaction);
  }
}
