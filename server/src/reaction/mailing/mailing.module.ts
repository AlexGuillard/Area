import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  providers: [MailingService],
})
export class MailingModule {}
