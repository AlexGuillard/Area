import { Module } from '@nestjs/common';
import { GithubAuthController } from './github-auth.controller';
import { GithubStrategy } from 'src/strategy/github.strategy';

@Module({
  providers: [GithubStrategy],
  controllers: [GithubAuthController],
  imports: [],
})
export class GithubAuthModule {}
