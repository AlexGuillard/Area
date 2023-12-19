import { Module } from '@nestjs/common';
import { UserTokenService } from './user-token.service';
import { UserTokenController } from './user-token.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UserTokenService],
  controllers: [UserTokenController],
  imports: [PrismaModule],
  exports: [UserTokenService],
})
export class UserTokenModule {}
