import { Controller, Get, Headers, Param } from '@nestjs/common';
import { ReactionService } from './reaction.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('reactions')
@Controller('reactions')
export class ReactionController {
  constructor(private authService: ReactionService) {}

  @Get()
  getReactions(@Headers('token') token: string) {
    return this.authService.getReactions(token);
  }
  @Get(':nameReaction')
  getReactionInfo(@Headers('token') token: string, @Param('nameReaction') nameReaction: string) {
    return this.authService.getReactionInfo(token, nameReaction);
  }
}
