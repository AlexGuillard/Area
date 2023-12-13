import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
