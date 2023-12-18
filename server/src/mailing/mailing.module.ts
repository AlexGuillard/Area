import { Module } from '@nestjs/common';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [MailingController],
  providers: [MailingService, ConfigService]
})
export class MailingModule {}
