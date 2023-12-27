import { Module } from '@nestjs/common';
import { GithubAuthController } from './github-auth.controller';
import { GithubStrategy } from 'src/strategy/github.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [GithubStrategy],
  controllers: [GithubAuthController],
  imports: [PrismaModule],
})
export class GithubAuthModule {}
