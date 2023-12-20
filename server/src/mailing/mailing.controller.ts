import { Controller, Get, Query } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
  @Get('send-mail')
  @ApiBody({
    type: String,
    required: true,
  })
  public sendMail(
    @Query('subject') subject: string,
    @Query('to') to: string,
    @Query('template') template: string,
    @Query('from') from: string,
  ) {
    const code = '123456';
    this.mailingService.sendMail(subject, to, template, from, code);
  }
}
