import { Module } from '@nestjs/common';
import { GithubAuthController } from './github-auth.controller';
import { GithubStrategy } from 'src/strategy/github.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GithubAuthService } from './github-auth.service';

@Module({
  providers: [GithubStrategy, GithubAuthService],
  controllers: [GithubAuthController],
  imports: [PrismaModule],
})
export class GithubAuthModule {}
