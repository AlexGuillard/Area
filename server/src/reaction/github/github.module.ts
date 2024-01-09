import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [GithubService],
  imports: [PrismaModule],
})
export class GithubModule {}
