import { Controller, Get, Query } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
}
