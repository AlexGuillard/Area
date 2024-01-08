import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { AboutModule } from './about/about.module';
import { MeModule } from './me/me.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { ActionModule } from './action/action.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AreaModule } from './area/area.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ReactionModule } from './reaction/reaction.module';
import { TimeModule } from './action/time/time.module';

@Module({
  imports: [
    TimeModule,
    AuthModule,
    PrismaModule,
    AboutModule,
    MeModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServicesModule,
    ActionModule,
    ScheduleModule.forRoot(),
    AreaModule,
    EventEmitterModule.forRoot(),
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
    ReactionModule,
  ],
  controllers: [],
})
export class AppModule {}
