import { Global, Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MeService } from 'src/me/me.service';

@Global()
@Module({
  imports: [PrismaModule],
  providers: [ServicesService, MeService],
  controllers: [ServicesController],
})
export class ServicesModule {}
