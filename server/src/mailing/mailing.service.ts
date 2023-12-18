import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';

@Injectable()
export class MailingService {
    constructor (
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService,
    ) {}
}
