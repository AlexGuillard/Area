import { Controller } from '@nestjs/common';
import { MailingService } from './mailing.service';

@Controller('mailing')
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
}
