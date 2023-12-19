import { Controller, Get } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
  @Get('send-mail')
  public sendMail() {
    const subject = 'Test mail';
    const template = 'action';
    const to = 'deibarpablo@gmail.com';
    const from = 'deibarpablo@gmail.com';
    const code = '123456';
    this.mailingService.sendMail(subject, to, template, from, code);
  }
}
