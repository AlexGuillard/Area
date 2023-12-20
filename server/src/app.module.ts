import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AboutModule } from './about/about.module';
import { MeModule } from './me/me.module';
import { ConfigModule } from '@nestjs/config';
import { GoogleAuthModule } from './google-auth/google-auth.module';
import { ServicesModule } from './services/services.module';
import { MailingModule } from './mailing/mailing.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    AboutModule,
    MeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoogleAuthModule,
    ServicesModule,
    MailingModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
})

export class AppModule {}
