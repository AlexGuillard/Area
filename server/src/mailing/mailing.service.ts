import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MailingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly prismaService: PrismaService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('GOOGLE_CLIENT_ID'),
      this.configService.get('GOOGLE_CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    const userId = await this.prismaService.user.findFirst({
      where: {
        email: this.configService.get('EMAIL'),
      },
    });

    if (!userId) {
      throw new Error('User not found, or google services not configured');
    }

    const service = await this.prismaService.services.findMany({
      where: { userId: userId.id },
      select: { token: true },
    })

    oauth2Client.setCredentials({
      refresh_token: service[0].token,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log(err);
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('GOOGLE_CLIENT_ID'),
        clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  @OnEvent('order.created')
  public async sendMail(
    subject: string,
    to: string,
    template: string,
    from: string,
    code: string,
  ) {
    await this.setTransport();
    this.mailerService
      .sendMail({
        transporterName: 'gmail',
        to, // list of receivers
        from, // sender address
        subject, // Subject line
        template,
        context: {
          // Data to be sent to template engine..
          code,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
